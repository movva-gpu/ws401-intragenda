import { env } from "$env/dynamic/private";
import { config } from "dotenv";
import { createConnection } from "mariadb";

/** @type {import('mariadb').Connection?} */
export var db = null;

export async function connect() {
    let current_env = env;
    if (!('MARIADB_DATABASE' in current_env)) {
        if (!('MARIADB_DATABASE' in process.env)) config();
        current_env = process.env;
    }

    db = await createConnection(
        `mariadb://${current_env.MARIADB_USER}:${current_env.MARIADB_PASSWORD}@127.0.0.1:3306/${current_env.MARIADB_DATABASE}?serverVersion=10.4.34-MariaDB&charset=utf8mb4`
    );
    console.info('info: Connected to database successfully');
}

export async function createSchemas() {
    if (!db) await connect()

    await db.query(`CREATE TABLE IF NOT EXISTS formations (
        id   INT         PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(45) NOT NULL
    );`);
    await db.query(`CREATE TABLE IF NOT EXISTS subjects (
        id           INT         PRIMARY KEY AUTO_INCREMENT,
        name         VARCHAR(72) NOT NULL,
        formation_id INT         NOT NULL
    );`);
    await db.query(`CREATE TABLE IF NOT EXISTS users (
        id            INT          PRIMARY KEY AUTO_INCREMENT,
        full_name     VARCHAR(64)  NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        email         VARCHAR(255) NOT NULL UNIQUE,
        role          VARCHAR(10)  NOT NULL,
        formation_id  INT          NOT NULL,
        created_at    TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP
    );`);
    await db.query(`CREATE TABLE IF NOT EXISTS connected_users (
        token     VARCHAR(40) PRIMARY KEY,
        user_id   INT         NOT NULL,
        expires   TIMESTAMP   NOT NULL DEFAULT (CURRENT_TIMESTAMP + INTERVAL 1 WEEK),
        created_at TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP
    );`);
    await db.query(`CREATE TABLE IF NOT EXISTS homeworks (
        id          INT          PRIMARY KEY AUTO_INCREMENT,
        title       VARCHAR(255) NOT NULL,
        description TEXT         NOT NULL,
        user_id     INT          NOT NULL,
        subject_id  INT          NOT NULL,
        due_date    TIMESTAMP    NOT NULL,
        updated_at  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
        created_at  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP
    );`);
    await db.query(`CREATE TABLE IF NOT EXISTS user_follow_homeworks (
        id          INT       PRIMARY KEY AUTO_INCREMENT,
        user_id     INT       NOT NULL,
        homework_id INT       NOT NULL,
        done        BOOLEAN   NOT NULL DEFAULT FALSE,
        created_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    );`);
    const formations = await db.query(`SELECT * FROM formations`);
    if (formations.length === 0) {
        await db.query(`INSERT INTO formations (id, name) VALUES
            (1, 'BUT MMI S1'),
            (2, 'BUT MMI S2'),
            (3, 'BUT MMI S3 DEV FI'),
            (4, 'BUT MMI S3 DEV FC'),
            (5, 'BUT MMI S3 CREA FC'),
            (6, 'BUT MMI S3 COMM FC'),
            (7, 'BUT MMI S4 DEV FI'),
            (8, 'BUT MMI S4 DEV FC'),
            (9, 'BUT MMI S4 CREA FC'),
            (10, 'BUT MMI S4 COMM FC'),
            (11, 'BUT MMI S5 DEV FI'),
            (12, 'BUT MMI S5 DEV FC'),
            (13, 'BUT MMI S5 CREA FC'),
            (14, 'BUT MMI S5 COMM FC'),
            (15, 'BUT MMI S6 DEV FI'),
            (16, 'BUT MMI S6 DEV FC'),
            (17, 'BUT MMI S6 CREA FC'),
            (18, 'BUT MMI S6 COMM FC') ON DUPLICATE KEY UPDATE id=id;
        `);
        await db.query(`INSERT INTO subjects (name, formation_id) VALUES
            ('R101 - Anglais', 1),
            ('R102 - Anglais renforcé', 1),
            ('R103 - Ergonomie et accessibilité', 1),
            ('R104 - Culture numérique', 1),
            ('R105 - Stratégie de communication et marketing', 1),
            ('R106 - Expression, communication et rhétorique', 1),
            ('R107 - Écriture multimédia et narration', 1),
            ('R108 - Production graphique', 1),
            ('R109 - Culture artistique', 1),
            ('R110 - Production audio et vidéo', 1),
            ('R111 - Intégration web', 1),
            ('R112 - Développement web', 1),
            ('R113 - Hébergement', 1),
            ('R114 - Représentation et traitement de l''information', 1),
            ('R115 - Gestion de projet', 1),
            ('R116 - Économie, gestion et droit du numérique', 1),
            ('R117 - Projet Personnel et Professionnel (PPP)', 1),
            ('R201 - Anglais', 2),
            ('R202 - Anglais renforcé', 2),
            ('R203 - Ergonomie et accessibilité', 2),
            ('R204 - Culture numérique', 2),
            ('R205 - Stratégie de communication et marketing', 2),
            ('R206 - Expression, communication et rhétorique', 2),
            ('R207 - Écriture multimédia et narration', 2),
            ('R208 - Production graphique', 2),
            ('R209 - Culture artistique', 2),
            ('R210 - Production audio et vidéo', 2),
            ('R211 - Intégration web', 2),
            ('R212 - Développement web', 2),
            ('R213 - Hébergement', 2),
            ('R214 - Représentation et traitement de l''information', 2),
            ('R215 - Gestion de projet', 2),
            ('R216 - Économie, gestion et droit du numérique', 2),
            ('R217 - Projet Personnel et Professionnel (PPP)', 2),
            ('R301 - Anglais - S3 CREA', 5),
            ('R302 - Anglais Renforcé ou LV2 - S3 CREA', 5),
            ('R303 - Design d’expérience - S3 CREA', 5),
            ('R304 - Culture numérique - S3 CREA', 5),
            ('R305 - Stratégies de communication et marketing - S3 CREA', 5),
            ('R306 - Référencement - S3 CREA', 5),
            ('R307 - Expression, communication et rhétorique - S3 CREA', 5),
            ('R308 - Écriture multimédia et narration - S3 CREA', 5),
            ('R309 - Création et design interactif (UI) - S3 CREA', 5),
            ('R310 - Culture artistique - S3 CREA', 5),
            ('R311 - Audiovisuel et Motion design - S3 CREA', 5),
            ('R312 - Développement Front et intégration - S3 CREA', 5),
            ('R313 - Gestion de contenus avancée - S3 CREA', 5),
            ('R314 - Déploiement de services - S3 CREA', 5),
            ('R315 - Représentation et traitement de l’information - S3 CREA', 5),
            ('R316 - Gestion de projet - S3 CREA', 5),
            ('R317 - Economie, gestion et droit du numérique - S3 CREA', 5),
            ('R318 - Projet Personnel et Professionnel - S3 CREA', 5),
            ('R401 - Anglais - S4 CREA', 9),
            ('R402 - Economie, gestion et Droit du numérique - S4 CREA', 9),
            ('R403 - Design d’expérience - S4 CREA', 9),
            ('R404 - Expression, communication - S4 CREA', 9),
            ('R405 - Gestion de contenus spécialisée - S4 CREA', 9),
            ('R406 - Culture artistique - S4 CREA', 9),
            ('R407 - Audiovisuel - Motion design - S4 CREA', 9),
            ('R408 - Ecriture multimédia et narration - S4 CREA', 9),
            ('R501 - Anglais - S5 CREA', 13),
            ('R502 - Management et Assurance qualité - S5 CREA', 13),
            ('R503 - Entrepreneuriat - S5 CREA', 13),
            ('R504 - Projet Personnel et Professionnel - S5 CREA', 13),
            ('R505 - Définir une direction artistique - S5 CREA', 13),
            ('R506 - Création numérique - S5 CREA', 13),
            ('R507 - Ecriture Multimédia et narration - S5 CREA', 13),
            ('R601 - Entrepreneuriat - S6 CREA', 17),
            ('R602 - Création numérique interactive - S6 CREA', 17),
            ('R301 - Anglais - S3 COMM', 6),
            ('R302 - Anglais Renforcé ou LV2 - S3 COMM', 6),
            ('R303 - Design d’expérience - S3 COMM', 6),
            ('R304 - Culture numérique - S3 COMM', 6),
            ('R305 - Stratégies de communication et marketing - S3 COMM', 6),
            ('R306 - Référencement - S3 COMM', 6),
            ('R307 - Expression, communication et rhétorique - S3 COMM', 6),
            ('R308 - Écriture multimédia et narration - S3 COMM', 6),
            ('R309 - Création et design interactif (UI) - S3 COMM', 6),
            ('R310 - Culture artistique - S3 COMM', 6),
            ('R311 - Audiovisuel et Motion design - S3 COMM', 6),
            ('R312 - Développement Front et intégration - S3 COMM', 6),
            ('R313 - Gestion de contenus avancée - S3 COMM', 6),
            ('R314 - Déploiement de services - S3 COMM', 6),
            ('R315 - Représentation et traitement de l’information - S3 COMM', 6),
            ('R316 - Gestion de projet - S3 COMM', 6),
            ('R317 - Economie, gestion et droit du numérique - S3 COMM', 6),
            ('R318 - Projet Personnel et Professionnel - S3 COMM', 6),
            ('R401 - Anglais - S4 COMM', 10),
            ('R402 - Economie, gestion et Droit du numérique - S4 COMM', 10),
            ('R403 - Design d’expérience - S4 COMM', 10),
            ('R404 - Expression, communication - S4 COMM', 10),
            ('R405 - Stratégie de Com / Webmarketing - S4 COMM', 10),
            ('R406 - Storytelling (communication narrative) - S4 COMM', 10),
            ('R407 - Gestion de contenus spécialisée - S4 COMM', 10),
            ('R501 - Anglais - S5 COMM', 14),
            ('R502 - Management et Assurance qualité - S5 COMM', 14),
            ('R503 - Entrepreneuriat - S5 COMM', 14),
            ('R504 - Projet Personnel et Professionnel - S5 COMM', 14),
            ('R505 - Stratégie de communication - S5 COMM', 14),
            ('R506 - Webmarketing - S5 COMM', 14),
            ('R507 - Design d’expérience - S5 COMM', 14),
            ('R601 - Entrepreneuriat', 18),
            ('R602 - Design d’expérience', 18),
            ('R603 - Stratégie de communication pluri-média', 18),
            ('R303 - Design d’expérience - S3 DEV FI', 3),
            ('R303 - Design d’expérience - S3 DEV FC', 4),
            ('R301 - Anglais - S3 DEV FI', 3),
            ('R301 - Anglais - S3 DEV FC', 4),
            ('R302 - Anglais Renforcé ou LV2 - S3 DEV FI', 3),
            ('R302 - Anglais Renforcé ou LV2 - S3 DEV FC', 4),
            ('R304 - Culture numérique - S3 DEV FI', 3),
            ('R304 - Culture numérique - S3 DEV FC', 4),
            ('R305 - Stratégies de communication et marketing - S3 DEV FI', 3),
            ('R305 - Stratégies de communication et marketing - S3 DEV FC', 4),
            ('R306 - Référencement - S3 DEV FI', 3),
            ('R306 - Référencement - S3 DEV FC', 4),
            ('R307 - Expression, communication et rhétorique - S3 DEV FI', 3),
            ('R307 - Expression, communication et rhétorique - S3 DEV FC', 4),
            ('R308 - Écriture multimédia et narration - S3 DEV FI', 3),
            ('R308 - Écriture multimédia et narration - S3 DEV FC', 4),
            ('R309 - Création et design interactif (UI) - S3 DEV FI', 3),
            ('R309 - Création et design interactif (UI) - S3 DEV FC', 4),
            ('R310 - Culture artistique - S3 DEV FI', 3),
            ('R310 - Culture artistique - S3 DEV FC', 4),
            ('R311 - Audiovisuel et Motion design - S3 DEV FI', 3),
            ('R311 - Audiovisuel et Motion design - S3 DEV FC', 4),
            ('R312 - Développement Front et intégration - S3 DEV FI', 3),
            ('R312 - Développement Front et intégration - S3 DEV FC', 4),
            ('R313 - Développement Back - S3 DEV FI', 3),
            ('R313 - Développement Back - S3 DEV FC', 4),
            ('R314 - Déploiement de services - S3 DEV FI', 3),
            ('R314 - Déploiement de services - S3 DEV FC', 4),
            ('R315 - Représentation et traitement de l’information - S3 DEV FI', 3),
            ('R315 - Représentation et traitement de l’information - S3 DEV FC', 4),
            ('R316 - Gestion de projet - S3 DEV FI', 3),
            ('R316 - Gestion de projet - S3 DEV FC', 4),
            ('R317 - Economie, gestion et droit du numérique - S3 DEV FI', 3),
            ('R317 - Economie, gestion et droit du numérique - S3 DEV FC', 4),
            ('R318 - Projet Personnel et Professionnel - S3 DEV FI', 3),
            ('R318 - Projet Personnel et Professionnel - S3 DEV FC', 4),
            ('R401 - Anglais - S4 DEV FI', 7),
            ('R401 - Anglais - S4 DEV FC', 8),
            ('R402 - Economie, gestion et Droit du numérique - S4 DEV FI', 7),
            ('R402 - Economie, gestion et Droit du numérique - S4 DEV FC', 8),
            ('R403 - Design d’expérience - S4 DEV FI', 7),
            ('R403 - Design d’expérience - S4 DEV FC', 8),
            ('R404 - Expression, communication - S4 DEV FI', 7),
            ('R404 - Expression, communication - S4 DEV FC', 8),
            ('R405 - Création et design interactif - S4 DEV FI', 7),
            ('R405 - Création et design interactif - S4 DEV FC', 8),
            ('R406 - Développement front - S4 DEV FI', 7),
            ('R406 - Développement front - S4 DEV FC', 8),
            ('R407 - Développement back - S4 DEV FI', 7),
            ('R407 - Développement back - S4 DEV FC', 8),
            ('R408 - Déploiement de services - S4 DEV FI', 7),
            ('R408 - Déploiement de services - S4 DEV FC', 8),
            ('R501 - Anglais - S5 DEV FI', 11),
            ('R501 - Anglais - S5 DEV FC', 12),
            ('R502 - Management et Assurance qualité - S5 DEV FI', 11),
            ('R502 - Management et Assurance qualité - S5 DEV FC', 12),
            ('R503 - Entrepreneuriat - S5 DEV FI', 11),
            ('R503 - Entrepreneuriat - S5 DEV FC', 12),
            ('R504 - Projet Personnel et Professionnel - S5 DEV FI', 11),
            ('R504 - Projet Personnel et Professionnel - S5 DEV FC', 12),
            ('R505 - Développement front avancé - S5 DEV FI', 11),
            ('R505 - Développement front avancé - S5 DEV FC', 12),
            ('R506 - Développement back avancé - S5 DEV FI', 11),
            ('R506 - Développement back avancé - S5 DEV FC', 12),
            ('R507 - Dispositifs interactifs - S5 DEV FI', 11),
            ('R507 - Dispositifs interactifs - S5 DEV FC', 12),
            ('R508 - Hébergement et cybersécurité - S5 DEV FI', 11),
            ('R508 - Hébergement et cybersécurité - S5 DEV FC', 12),
            ('R601 - Entrepreneuriat - S6 DEV FI', 15),
            ('R601 - Entrepreneuriat - S6 DEV FC', 16),
            ('R602 - Développement Web et dispositif interactif - S6 DEV FI', 15),
            ('R602 - Développement Web et dispositif interactif - S6 DEV FC', 16) ON DUPLICATE KEY UPDATE id=id;
        `);
    }
   console.info('info: Created database schemas successfully');
}
