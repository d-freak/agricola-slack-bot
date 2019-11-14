/**
 * main.js
 * 
 * @author masaue
 */

import "core-js/stable";

import Bot from './bot';



(async () => {
  const bot = new Bot();
  await bot.start();
})();
