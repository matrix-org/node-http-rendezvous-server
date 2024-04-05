/*
Copyright 2022 The Matrix.org Foundation C.I.C.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import express from "express";
import morgan from "morgan";
import { v4 } from "uuid";
import NodeCache from "node-cache";
import bodyParser from "body-parser";
import cors from "cors";
import http from "http";
import https from "https";
import { readFileSync } from "fs";
import { parse as parseContentType } from "content-type";

import { Rendezvous } from "./rendezvous";
import { maxBytes, ttlSeconds, port, trustProxy } from "./config";

const app = express();
app.use(morgan("common"));
app.set("env", "production");
app.set("x-powered-by", false);
app.set("etag", false);
app.set("trust proxy", trustProxy);

// treat everything as raw
app.use(bodyParser.raw({
    type: "*/*",
    inflate: true,
    limit: maxBytes,
}));

app.get("/health", (req, res) => res.status(200).send("OK"));

const rvs = new NodeCache({
    checkperiod: 60,
    useClones: false,
});

app.options("/", cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["X-Requested-With", "Content-Type", "Authorization"], // https://spec.matrix.org/v1.10/client-server-api/#web-browser-clients
    exposedHeaders: ["ETag"],
}));

function notFound(res: express.Response): express.Response {
    return res.status(404).json({ "errcode": "M_NOT_FOUND", "error": "Rendezvous not found" });
}

function withContentType(req: express.Request, res: express.Response) {
    return (fn: (contentType: string) => express.Response): express.Response => {
        const contentType = req.get("content-type");
        if (!contentType) {
            return res.status(400).json({ "errcode": "M_MISSING_PARAM", "error": "Missing Content-Type header" });
        }
        try {
            parseContentType(contentType);
        } catch (e) {
            return res.status(400).json({ "errcode": "M_INVALID_PARAM", "error": "Invalid Content-Type header" });
        }
        return fn(contentType);
    };
}
app.post("/", (req, res) => {
    withContentType(req, res)((contentType) => {

        let id: string | undefined;
        while (!id || id in rvs) {
            id = v4();
        }
        const rv = new Rendezvous(id, ttlSeconds, maxBytes, req.body, contentType);
        rvs.set(id, rv, rv.ttlSeconds);

        rv.setHeaders(res);

        const url = `${req.protocol}://${req.hostname}/${id}`;

        return res.status(201).json({ url });
    });
});

app.options("/:id", cors({
    origin: "*",
    methods: ["GET", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["If-Match", "If-None-Match"],
    exposedHeaders: ["ETag"],
}));

app.put("/:id", (req, res) => {
    withContentType(req, res)((contentType) => {
        const { id } = req.params;
        const rv = rvs.get<Rendezvous>(id);

        if (!rv) {
            return notFound(res);
        }

        if (rv.expired()) {
            rvs.del(id);
            return notFound(res);
        }

        const ifMatch = req.headers["if-match"];
        if (!ifMatch) {
            return res.status(400).json({ "errcode": "M_MISSING_PARAM", "error": "Missing If-Match header" });
        } else if (ifMatch !== rv.etag) {
            rv.setHeaders(res);
            return res.send(412).json({ "errcode": "M_CONCURRENT_WRITE", "error": "Rendezvous has been modified" });
        }

        rv.update(req.body, contentType);
        rv.setHeaders(res);

        return res.sendStatus(202);
    });
});

app.get("/:id", (req, res) => {
    const { id } = req.params;
    const rv = rvs.get<Rendezvous>(id);

    if (!rv) {
        return notFound(res);
    }

    if (rv.expired()) {
        rvs.del(id);
        return notFound(res);
    }

    rv.setHeaders(res);

    if (req.headers["if-none-match"] === rv.etag) {
        return res.sendStatus(304);
    }

    return rv.sendData(res);
});

app.delete("/:id", (req, res) => {
    const { id } = req.params;
    if (!rvs.has(id)) {
        return notFound(res);
    }
    rvs.del(id);
    return res.sendStatus(204);
});

if (process.env.DEV_SSL === "yes") {
    const httpsServer = https.createServer({
        key: readFileSync("./devssl/key.pem"),
        cert: readFileSync("./devssl/cert.pem"),
    }, app);
    httpsServer.listen(port, () => {
        console.log(`Starting rendezvous server at https://0.0.0.0:${port} with self-signed certificate${trustProxy ? " behind trusted proxy" : ""}`);
    });
} else {
    const httpServer = http.createServer(app);
    httpServer.listen(port, () => {
        console.log(`Starting rendezvous server at http://0.0.0.0:${port}${trustProxy ? " behind trusted proxy" : ""}`);
    });
}
