/**
 * slack-player-announcer.js
 * 
 * @author masaue
 */

import { WebClient } from '@slack/web-api';

import PlayerAnnouncer from '../../../lib/agricola-js/src/main/agricola/announcer/player-announcer';



export default class SlackDirectAnnouncer extends PlayerAnnouncer {
  
  constructor(playerID, rtm) {
    super(playerID);
    this._playerID = playerID;
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
    if (!/CPU0[1-4]/.test(this.playerID)) {
      try {
        const reply = await this._rtm.sendMessage(message, this._channel)
        console.log('Message sent successfully', reply.ts);
      }
      catch (error) {
        console.log('An error occurred', error);
      }
    }
  }
  
  
  
  async _channel() {
    const web = new WebClient(process.env.BOT_TOKEN);
    try {
      const im = await web.im.open({ user: this._playerID });
      return im.channel.id;
    }
    catch (error) {
      console.log('An error occurred', error);
      return '';
    }
  }
  
}
