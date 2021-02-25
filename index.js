const { platform, router } = require('bottender/router');

const lineApp = require("./src/lineapp");

async function LineAction(context) {
  if (context.event.isText) {
    const searchInput = context.event.text;
    const message = await lineApp.searchMusic(searchInput);
    await lineApp.replyMessage(context.event.replyToken, message);
  }
}

async function MessengerAction(context) {
  await context.sendButtonTemplate('This is a messenger-specific message!', [
    {
      type: 'postback',
      title: 'Hello',
      payload: 'Hello',
    },
    {
      type: 'postback',
      title: 'World',
      payload: 'World',
    },
  ]);
}

module.exports = async function App(context) {
  console.log(`Platform: ${context.platform}`);

  return router([
    platform('line', LineAction),
    platform('messenger', MessengerAction),
  ]);
};
