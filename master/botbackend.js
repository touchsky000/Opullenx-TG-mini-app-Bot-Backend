module.exports = () => {
  const TGBot = require("node-telegram-bot-api");
  const BotController = require("../controller/bot.controller");
  const DatabaseController = require("../controller/database.controller");
  const token = "7938288165:AAF8s_x-EombuU2v3eBu_QHlinEFRpIaxIg";
  const bot = new TGBot(token, {
    polling: true,
    request: {
      agentOptions: {
        keepAlive: true,
        family: 4,
      },
    },
  });

  const BotMenu = [
    { command: "start", description: "Welcome" },
    { command: "help", description: " Help" },
  ];

  const options = {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "✈  PLAY CLICK  ✈",
            web_app: {
              url: "https://openxu-tg-minigame-test.vercel.app",
            },
          },
        ],
      ],
    },
  };

  bot.setMyCommands(BotMenu);
  bot.onText(/\/start/, (msg) => {
    const userID = msg.from.id;
    chatId = msg.chat.id;
    const welcomeMessage =
      " 🖐 What can this bot do? 🖐 Start your exciting journey to financial opulence 💰.\n\n- How To Play\n🚀 Place your bet and press the Start button to play the game!\n\n💰 When Baby Moo jumps, the multiplier increases your bet amount.\n\n💥 But be careful, because Baby Moo can crash at any moment, and if it does, you'll lose your bet ‼️\n\n🦛 Have fun changing your Baby Moo’s skin and dress it up 😍\n\n✅ Join Us\nTG Channel: @OpulenceXFin\nMail: admin@opulencex.io\n\n🧑 Visit Our Platform\nhttps://opulencex.io/\n";
    bot.sendMessage(chatId, welcomeMessage, options);
  });

  bot.onText(/\/help/, (msg) => {
    bot.sendMessage(msg.chat.id, "may I help", options);
  });

  bot.on("message", async (msg) => {
    const userId = msg.from.id;

    const text = msg.text ? msg.text.trim() : "";
    const friendId = text.substring(7);
    const avatarUrl = await BotController.getProfileAvatar(userId, token);
    const username = msg.from.username;
    const firstName = msg.from.first_name;
    const lastName = msg.from.last_name;

    let MyRealName;
    if (lastName === undefined && firstName !== undefined)
      MyRealName = firstName;
    if (lastName !== undefined && firstName === undefined)
      MyRealName = lastName;
    if (lastName !== undefined && firstName !== undefined)
      MyRealName = firstName + " " + lastName;

    
    if (userId && friendId && userId != friendId) {
      await BotController.saveFriendInfo(userId, friendId);
      console.log(userId, friendId);

      const isExistedMyId = await DatabaseController.existTgUser(userId);
      if (!isExistedMyId) {
        await DatabaseController.saveNewUser(
          username,
          userId,
          MyRealName,
          avatarUrl
        );
      }
    }
  });
};
