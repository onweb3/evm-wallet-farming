
const {createWallet , balanceETH} = require("evm-web2-kit");
const fs = require('fs');
const path = require('path');
const TelegramBot = require('node-telegram-bot-api');

rpcUrl = "https://eth.meowrpc.com";
const botToken = 'your telegram bot token';
const bot = new TelegramBot(botToken, { polling: false });
async function createAndCheck() {
createWallet().then(e =>{
    const folderPath = path.join(__dirname, 'results');
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }
    const wallet = e.address;
    const privateKey = e.privateKey;
    const memomo = e.mnemonic;
    balanceETH(wallet , rpcUrl)
    .then(result => {
        if(result > 0){
            const balanceData = { wallet: wallet, privateKey: privateKey, memomo : memomo, ethBalance: result };
            const jsonData = JSON.stringify(balanceData, null, 4);
            const filePath = path.join(folderPath, `success-${wallet}.json`);
            fs.writeFileSync(filePath, jsonData);
            const message = `ETH Balance for ${wallet}: ${balanceData.ethBalance , balanceData.privateKey}`;
            bot.sendMessage('your_chat_id', message);
            //if there is a balance on these wallets. this program will inform user through telegram and save files to a json 
        }else{
            const balanceData = { wallet: wallet, privateKey: privateKey, memomo : memomo, ethBalance: result  };
            const jsonData = JSON.stringify(balanceData, null, 4);
            const filePath = path.join(folderPath, `failure-${wallet}.json`);
            fs.writeFileSync(filePath, jsonData);
           //if there is no balance the program will not notify user
        }

    })
    .catch(error => {
        bot.sendMessage('your_chat_id' , error);
        console.error("Error:", error);
    });
}).catch(error =>{
    bot.sendMessage('your_chat_id' , error);
    console.log(error);
})
}

const intervalId = setInterval(async () => {
    // Call your asynchronous function
    await createAndCheck();
  }, 1000); // Execute every 1 second
