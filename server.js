#!/usr/bin/env bun
import { createSecureServer, createServer } from 'http2';
import { handler } from './build/handler.js';
import { config } from 'dotenv'
import * as fs from 'fs';

config();

const options = {
    key: fs.readFileSync(process.env.CERT_KEY),
    cert: fs.readFileSync(process.env.CERT)
};

const server = createSecureServer(options, handler);

server.listen(3333, () => {
    console.log('Server running on ::1:3333');
});
