/**
 * bot.js
 * 
 * @author masaue
 */

import { RTMClient } from '@slack/rtm-api';
import { WebClient } from '@slack/web-api';
import dotenv from 'dotenv';

import CommandController from '../../lib/agricola-js/src/main/agricola/command-controller'

import SlackChannelAnnouncer from './announcer/slack-channel-announcer';



export default class Bot {
  
  constructor() {
    dotenv.config();
    this._rtm = new RTMClient(process.env.BOT_TOKEN);
    this._controller = new CommandController(new SlackChannelAnnouncer(this._rtm));
    this._rtm.on('message', async (event) => {
      if (event.subtype) {
        // message_changedなどは無視
        return;
      }
      const paramList = event.text.trim().replace(/ {2,}/g, ' ').split(' ');
      const command = paramList.shift().toLowerCase();
      switch (command) {
      case 'entry':
        this._command(event, command);
        break;
      }
    });
  }
  
  start() {
    this._rtm.start();
  }
  
  
  
  _command(event, command) {
    const web = new WebClient(process.env.BOT_TOKEN);
    (async () => {
      const info = await web.users.info({ user: event.user });
      const name = info.user.profile.display_name;
      this._controller.onCommand(`${event.user} ${command} ${name}`);
    })();
  }
  
}
