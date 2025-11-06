# Dockerfile Nuxt 3
ARG NODE_VERSION=18.14.2
ARG REGISTRY_URL=cubiconia-registrydock.btqclk.easypanel.host
ARG PORT=3000

FROM ${REGISTRY_URL}/node:${NODE_VERSION}-slim as base

ENV NODE_ENV=production
WORKDIR /src

RUN apt-get update && apt-get install -y --no-install-recommends tini \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

FROM base as build

COPY package.json ./
RUN npm install --legacy-peer-deps --production=false

COPY . .
RUN npm run build

FROM base

ENV PORT=${PORT}

COPY --from=build /src/.output /src/.output

ENTRYPOINT ["/usr/bin/tini", "--"]
CMD ["node", ".output/server/index.mjs"]
