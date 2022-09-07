import express from 'express';
import morgan from 'morgan';
import { v4 } from 'uuid';
import NodeCache from 'node-cache';
import bodyParser from 'body-parser';
import cors from 'cors';
import http from 'http';
import https from 'https';
import { readFileSync } from 'fs';

import { Channel } from './channel';
import { maxBytes, ttlSeconds, port } from './config';

const app = express();
app.use(cors({ exposedHeaders: ['ETag'] }));
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

const channels = new NodeCache({
    checkperiod: 60,
    useClones: false,
});

app.post('/', (req, res) => {
    let id: string | undefined;
    while (!id || id in channels) {
        id = v4();
    }
    const channel = new Channel(id, ttlSeconds, maxBytes, req);
    channels.set(id, channel, channel.ttlSeconds);

    channel.setHeaders(res);

    return res.status(200).json(channel.json());
});

app.put('/:id', (req, res) => {
    const { id } = req.params;
    const channel = channels.get<Channel>(id);

    if (!channel) {
        return res.sendStatus(404);
    }

    if (channel.expired()) {
        channels.del(id);
        return res.sendStatus(404);
    }

    const ifMatch = req.headers['if-match'];

    if (ifMatch && ifMatch !== channel.etag) {
        channel.setHeaders(res);
        return res.sendStatus(412);
    }

    channel.update(req);
    channel.setHeaders(res);

    return res.sendStatus(202);
});

app.get('/:id', (req, res) => {
    const { id } = req.params;
    const channel = channels.get<Channel>(id);

    if (!channel) {
        return res.sendStatus(404);
    }

    if (channel.expired()) {
        channels.del(id);
        return res.sendStatus(404);
    }

    channel.setHeaders(res);

    if (req.headers['if-none-match'] === channel.etag) {
        return res.sendStatus(304);
    }

    return channel.sendData(res);
});

app.delete('/:id', (req, res) => {
    const { id } = req.params;
    if (!channels.has(id)) {
        return res.sendStatus(404);
    }
    channels.del(id);
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
