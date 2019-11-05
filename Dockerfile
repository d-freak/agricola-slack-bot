FROM library/node:12.13.0-alpine
ENV WORK_DIRECTORY='agricola-slack-bot/'

COPY .env package-lock.json package.json ${WORK_DIRECTORY}

WORKDIR ${WORK_DIRECTORY}

RUN npm install --production

COPY src/ src/

CMD npm run start
