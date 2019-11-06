/**
 * main.js
 * 
 * @author masaue
 */

import Bot from './bot';



(async () => {
  const bot = new Bot();
  await bot.start();
})();
