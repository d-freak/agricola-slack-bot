import { RTMClient } from '@slack/rtm-api';
import dotenv from 'dotenv';



dotenv.config();
const rtm = new RTMClient(process.env.BOT_TOKEN);

rtm.on('message', async (event) => {
  try {
    const reply = await rtm.sendMessage(`hi, <@${event.user}>`, event.channel)
    console.log('Message sent successfully', reply.ts);
  } catch (error) {
    console.log('An error occurred', error);
  }
});
  
(async () => {
  await rtm.start();
})();
