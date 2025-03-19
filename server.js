import { createSecureServer } from 'http2';
import { handler } from './build/handler.js';
import { config } from 'dotenv'
import fs from 'fs';
import { createServer } from 'http';

config();

const options = {
    // key: fs.readFileSync(process.env.CERT_KEY),
    // cert: fs.readFileSync(process.env.CERT)
};

const server = createServer(options, handler);

server.addListener('request', (res) => {
    console.log(res);
});

server.listen(3333, () => {
    console.log('Server running on ::1:3333');
});
