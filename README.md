# Back for nursing-home app

## Installation

Get up required docker-containers:

```bash
docker-compose -f docker-compose.dev.yml up -d
```

This run three containers: 

- Redis database
- Mongo database
- Mongo viewer (on localhost:8081)

Install dependencies:

```bash
yarn install or npm install
```

Run on dev mode:

```bash
yarn run dev or npm run dev
```