const { RTMClient } = require('@slack/rtm-api');
require('dotenv').config();
const token = process.env.BOT_TOKEN;
const rtm = new RTMClient(token);

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
