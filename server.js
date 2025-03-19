import { createSecureServer } from 'http2';
import { handler } from './build/handler.js';
import { config } from 'dotenv'
import fs from 'fs';
import { exit } from 'process';

config();

const options = {
    key: fs.readFileSync(process.env.CERT_KEY),
    cert: fs.readFileSync(process.env.CERT)
};

const server = createSecureServer(options, handler);
const port = 3333;

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
