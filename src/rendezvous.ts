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
import { createHash } from 'crypto';

export class Rendezvous {
    private readonly id: string;
    private readonly expiresAt: Date;
    readonly ttlSeconds: number;
    private readonly maxBytes: number;
    private data?: Buffer;
    private contentType!: string;
    private lastModified!: Date;
    etag!: string;

    constructor(id: string, ttlSeconds: number, maxBytes: number, initialRequest: express.Request) {
        const now = new Date();
        this.id = id;
        this.ttlSeconds = ttlSeconds;
        this.expiresAt = new Date(now.getTime() + ttlSeconds * 1000);
        this.maxBytes = maxBytes;
        this.update(initialRequest);
    }

    update(req: express.Request) {
        this.data = req.body;
        this.contentType = req.get('Content-Type') ?? 'application/octet-stream';
        this.lastModified = new Date();
        const hash = createHash('sha256').update(this.id);
        if (Buffer.isBuffer(this.data)) {
            hash.update(this.data);
        }
        this.etag = hash.digest('base64');
    }

    sendData(res: express.Response): void {
        res.status(200);
        res.setHeader('Content-Type', this.contentType);
        if (Buffer.isBuffer(this.data)) {
            res.send(this.data);
        } else {
            res.send('');
        }
    }

    expired(): boolean {
        return this.expiresAt < new Date();
    }

    setHeaders(res: express.Response): void {
        res.setHeader('ETag', this.etag);
        res.setHeader('Expires', this.expiresAt.toUTCString());
        res.setHeader('Last-Modified', this.lastModified.toUTCString());
    }
}
