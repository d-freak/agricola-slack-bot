/**
 * bot.js
 * 
 * @author masaue
 */

import { RTMClient } from '@slack/rtm-api';
import dotenv from 'dotenv';



export default class Bot {
  
  constructor() {
    dotenv.config();
    this._rtm = new RTMClient(process.env.BOT_TOKEN);
    this._rtm.on('message', async (event) => {
      try {
        const reply = await this._rtm.sendMessage(`hi, <@${event.user}>`, event.channel)
        console.log('Message sent successfully', reply.ts);
      } catch (error) {
        console.log('An error occurred', error);
      }
    });
  }
  
  start() {
    this._rtm.start();
  }
  
}
