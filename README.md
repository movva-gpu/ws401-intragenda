# WS401 - Développer pour le Web

## Prérequis

- [Node.js](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/) ou [pnpm](https://pnpm.io/) ou [bun](https://bun.sh/)
- [Git](https://git-scm.com/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

```bash
$ node -v
v23.9.0
$ npm -v
11.2.0
$ git -v
git version 2.49.0
$ docker -v
Docker version 28.0.1, build 068a01ea94
$ docker-compose -v # ou docker compose -v
Docker Compose version 2.34.0
```

## Développement

### Installation

```bash
$ git clone https://github.com/movva-gpu/ws401-intragenda.git # ou git@github.com:movva-gpu/ws401-intragenda.git
$ cd ws401-intragenda
$ npm install # ou yarn install, ou pnpm install, ou bun install
```

### Lancement

```bash
$ docker compose up -d
$ npm run dev # ou yarn dev, ou pnpm dev, ou bun dev
```

Et plus qu'a coder&nbsp;!

## Déploiement

```bash
$ git fetch && git pull
$ npm install # ou yarn install, ou pnpm install, ou bun install
$ npm run build # ou yarn build, ou pnpm build, ou bun run build
$ systemctl enable --now services/ws401.service # ou systemctl restart ws401
```
