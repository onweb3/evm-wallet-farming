const TelegramBot = require('node-telegram-bot-api');

// Set up your Telegram bot token
const botToken = 'your telegram bot token';

// Create a new instance of TelegramBot
const bot = new TelegramBot(botToken, { polling: false });

// Listen for messages
bot.on('message', (msg) => {
  // Log the message object to find the chat ID
  console.log(msg);
});

// Error handling
bot.on('polling_error', (error) => {
  console.error(error);
});

// Start listening
bot.startPolling();