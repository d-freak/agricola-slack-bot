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
import SlackDirectAnnouncer from './announcer/slack-direct-announcer';



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
        this._entry(event, new SlackDirectAnnouncer(event.user, this._rtm));
        break;
      case 's':
      case 'start':
        this._command(event, command, paramList[0]);
        break;
      }
    });
  }
  
  start() {
    this._rtm.start();
  }
  
  
  
  _command(event, command, parameter, announcer = undefined) {
    this._controller.onCommand(`${event.user} ${command} ${parameter}`, announcer);
  }
  
  _entry(event, announcer) {
    const web = new WebClient(process.env.BOT_TOKEN);
    (async () => {
      const info = await web.users.info({ user: event.user });
      const name = info.user.profile.display_name;
      this._command(event, 'entry', name, announcer);
    })();
  }
  
}
