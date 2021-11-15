FROM node:lts-alpine3.14

WORKDIR /app

COPY package.json ./package.json
COPY yarn.lock ./yarn.lock
RUN yarn

VOLUME [ "/app" ]

ENTRYPOINT [ "yarn", "run", "build" ]