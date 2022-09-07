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

import express from 'express';
import morgan from 'morgan';
import { v4 } from 'uuid';
import NodeCache from 'node-cache';
import bodyParser from 'body-parser';
import cors from 'cors';
import http from 'http';
import https from 'https';
import { readFileSync } from 'fs';

import { Rendezvous } from './rendezvous';
import { maxBytes, ttlSeconds, port } from './config';

const app = express();
app.use(cors({ exposedHeaders: ['ETag', 'Location'] }));
app.use(morgan('common'));
app.set('env', 'production');
app.set('x-powered-by', false);
app.set('etag', false);

// treat everything as raw
app.use(bodyParser.raw({
    type: '*/*',
    inflate: true,
    limit: maxBytes,
}));

const rvs = new NodeCache({
    checkperiod: 60,
    useClones: false,
});

app.post('/', (req, res) => {
    let id: string | undefined;
    while (!id || id in rvs) {
        id = v4();
    }
    const rv = new Rendezvous(id, ttlSeconds, maxBytes, req);
    rvs.set(id, rv, rv.ttlSeconds);

    rv.setHeaders(res);

    res.setHeader('Location', id);
    res.setHeader('X-Max-Bytes', maxBytes);

    return res.sendStatus(201);
});

app.put('/:id', (req, res) => {
    const { id } = req.params;
    const rv = rvs.get<Rendezvous>(id);

    if (!rv) {
        return res.sendStatus(404);
    }

    if (rv.expired()) {
        rvs.del(id);
        return res.sendStatus(404);
    }

    const ifMatch = req.headers['if-match'];

    if (ifMatch && ifMatch !== rv.etag) {
        rv.setHeaders(res);
        return res.sendStatus(412);
    }

    rv.update(req);
    rv.setHeaders(res);

    return res.sendStatus(202);
});

app.get('/:id', (req, res) => {
    const { id } = req.params;
    const rv = rvs.get<Rendezvous>(id);

    if (!rv) {
        return res.sendStatus(404);
    }

    if (rv.expired()) {
        rvs.del(id);
        return res.sendStatus(404);
    }

    rv.setHeaders(res);

    if (req.headers['if-none-match'] === rv.etag) {
        return res.sendStatus(304);
    }

    return rv.sendData(res);
});

app.delete('/:id', (req, res) => {
    const { id } = req.params;
    if (!rvs.has(id)) {
        return res.sendStatus(404);
    }
    rvs.del(id);
    return res.sendStatus(204);
});

if (process.env.DEV_SSL === 'yes') {
    const httpsServer = https.createServer({
        key: readFileSync('./devssl/key.pem'),
        cert: readFileSync('./devssl/cert.pem'),
    }, app);
    httpsServer.listen(port, () => {
        console.log(`Starting rendezvous server at https://0.0.0.0:${port} with self-signed certificate`);
    });
} else {
    const httpServer = http.createServer(app);
    httpServer.listen(port, () => {
        console.log(`Starting rendezvous server at http://0.0.0.0:${port}`);
    });
}
