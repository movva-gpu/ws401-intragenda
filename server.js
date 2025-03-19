import { createSecureServer } from 'http2';
import { handler } from './build/handler.js';
import { config } from 'dotenv'
import fs from 'fs';

config();

const options = {
    key: fs.readFileSync(process.env.CERT_KEY),
    cert: fs.readFileSync(process.env.CERT)
};

const server = createSecureServer(options, handler);

server.addListener('request', (res) => {
    console.log(res);
});

server.listen(3333, () => {
    console.log('Server running on ::1:3333');
});
