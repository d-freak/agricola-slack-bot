#!/bin/zsh

npm i
git submodule update --init
npm run build
sudo docker build . -t agricola-slack-bot
