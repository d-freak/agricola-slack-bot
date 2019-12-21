FROM library/node:12.13.1-alpine

RUN set -x \
    && apk upgrade --update \
    # cleaning
    && rm -rf /var/cache/apk/*

ARG WORK_DIRECTORY='agricola-slack-bot/'
WORKDIR ${WORK_DIRECTORY}

COPY .env package-lock.json package.json ./

RUN set -x \
    && npm i --production \
    # cleaning
    && npm cache verify

COPY dist/ dist/

RUN set -x \
    && chown -R node:node ./
USER node

CMD npm start
