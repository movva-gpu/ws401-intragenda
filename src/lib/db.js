import { env } from "$env/dynamic/private";
import { createConnection } from "mariadb";

/** @type {import('mariadb').Connection?} */
export var db = null;

export async function connect() {
    db = await createConnection(
        `mariadb://${env.MARIADB_USER}:${env.MARIADB_PASSWORD}@127.0.0.1:3306/${env.MARIADB_DATABASE}?serverVersion=10.4.34-MariaDB&charset=utf8mb4`
    );
}

export async function createSchemas() {
    await db.query(`CREATE TABLE IF NOT EXISTS users (
        id INT PRIMARY KEY AUTO_INCREMENT,
        username VARCHAR(16) NOT NULL,
        password VARCHAR(32) NOT NULL,
        email VARCHAR(255) NOT NULL,
        roles VARCHAR(45) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);
    `);
    await db.query(`CREATE TABLE IF NOT EXISTS homeworks (
        id INT PRIMARY KEY AUTO_INCREMENT,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        user_id INT NOT NULL,
        due_date TIMESTAMP NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);
    `);
    await db.query(`CREATE TABLE IF NOT EXISTS user_follow_homeworks (
        id INT PRIMARY KEY AUTO_INCREMENT,
        user_id INT NOT NULL,
        homework_id INT NOT NULL,
        done BOOLEAN NOT NULL DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);
    `);
}
