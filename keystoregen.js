require('dotenv').config()
const fs = require('fs')
const Wallet = require('ethereumjs-wallet').default;
const { walletPassword, keystoreDir } = process.env;

const genRanHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
const key = Buffer.from(genRanHex(64), 'hex');
const wallet = Wallet.fromPrivateKey(key);

async function generate() {
  const address = `Address: 0x${wallet.getAddress().toString('hex')}`
  const keystore = `Keystore: ${await wallet.toV3String(walletPassword)}`

  const content = `${address}\n${keystore}`
  fs.writeFile(keystoreDir, content, err => {
    if (err) {
      console.error(err)
      throw new Error('Write Failed')
    }
  })
}

(async () => {
  try {
    console.info('Generating keystore...');
    await generate();
    console.info('Finished generating keystore');
  } catch (err) {
    console.error(err);
    console.error('Failed keystore generation');
  }
})();
