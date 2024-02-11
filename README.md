
# EVM Wallet Farming

Project created using EVM Web2 Kit. This app will create EVM Wallets and check their balance and save the data to a "result" folder in JSON Format and inform user through telegram if a wallet is found with balance.




## Getting Started

```javascript
git clone https://github.com/onweb3/evm-wallet-farming.git .
cd evm-wallet-farming
npm install
npm run start
```

## Telegram Chat
Create a bot api token and paste it inside checkChatID.js
then run this
```
cd evm-wallet-farming
node checkChatID.js
```
after that copy the Chat ID and use it inside index.js