/**
 * bot.js
 * 
 * @author masaue
 */

import { RTMClient } from '@slack/rtm-api';
import { WebClient } from '@slack/web-api';
import dotenv from 'dotenv';

import CommandController from '../../lib/agricola-js/src/main/agricola/command-controller'


export default class Bot {
  
  constructor() {
    this._controller = new CommandController();
    dotenv.config();
    this._rtm = new RTMClient(process.env.BOT_TOKEN);
    this._rtm.on('message', async (event) => {
      const paramList = event.text.trim().replace(/ {2,}/g, ' ').split(' ');
      const command = paramList.shift().toLowerCase();
      switch (command) {
      case 'entry':
        this._command(event, command);
        break;
      }
      /*
      try {
        const reply = await this._rtm.sendMessage(`hi, <@${event.user}>`, event.channel)
        console.log('Message sent successfully', reply.ts);
      } catch (error) {
        console.log('An error occurred', error);
      }
       */
    });
  }
  
  start() {
    this._rtm.start();
  }
  
  
  
  _command(event, command) {
    const web = new WebClient(process.env.BOT_TOKEN);
    (async () => {
      const info = await web.users.info({ user: event.user });
      const name = info.profile.display_name;
      controller.onCommand(`${event.user} ${command} ${name}`);
    })();
  }
  
}
