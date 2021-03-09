FROM node:12-stretch

USER node

RUN mkdir /home/node/shelterService
WORKDIR /home/node/shelterService

COPY --chown=node:node yarn.lock package.json ./
RUN yarn

COPY --chown=node:node . .
RUN npm run build

CMD ["node", "dist/index.js"]