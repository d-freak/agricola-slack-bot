/**
 * slack-channel-announcer.js
 * 
 * @author masaue
 */

import { WebClient } from '@slack/web-api';

import FieldAnnouncer from '../../../lib/agricola-js/src/main/agricola/announcer/field-announcer';



export default class SlackChannelAnnouncer extends FieldAnnouncer {
  
  constructor(rtm) {
    super();
    this._rtm = rtm;
    this._channel().then((value) => {
      this._channel = value;
    });
  }
  
  resetMessage() {
  }
  
  async write(message, reset = false) {
    if (reset) {
      this.resetMessage();
    }
    try {
      const reply = await this._rtm.sendMessage(message, this._channel)
      console.log('Message sent successfully', reply.ts);
    }
    catch (error) {
      console.log('An error occurred', error);
    }
  }
  
  
  
  async _channel() {
    const web = new WebClient(process.env.BOT_TOKEN);
    try {
      const list = await web.channels.list();
      return list.channels.find((channel) => {
        return channel.name === process.env.BOT_CHANNEL_NAME;
      }).id;
    }
    catch (error) {
      console.log('An error occurred', error);
      return '';
    }
  }
  
}
