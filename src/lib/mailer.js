import { createTransport } from 'nodemailer';
import { env } from '$env/dynamic/private';
import { config } from 'dotenv';

export let transporter = connectTransporter();
console.info('info: Connected transporter successfully');

function connectTransporter() {
    let current_env = env;
    if (!('MAILER_HOST' in current_env)) {
        if (!('MAILER_HOST' in process.env)) config();
        current_env = process.env;
    }

    const { MAILER_PORT: port, MAILER_HOST: host, MAILER_AUTH: auth } = current_env;

    if (auth && '' !== auth) {
        const [ user, pass ] = auth.split(':');

        return createTransport({ host, port: parseInt(port), secure: false, auth: { user, pass } });
    }

    return createTransport({ host, port: parseInt(port), secure: false });
}

export function sendMail({ from, to, subject, text, html }) {
    return transporter.sendMail({ from, to, subject, text, html });
}
