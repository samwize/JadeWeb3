import Arweave from 'arweave';
import { ref } from 'vue';

const arweave = Arweave.init({});

export const address = ref(null)

export async function getWalletAddress() {
    let addr = await arweave.wallets.getAddress();
    console.log("Arweave address:", addr);
    address.value = addr;
    return Promise.resolve(addr);
}
export async function getBalanceAR(addr) {
    arweave.wallets.getBalance(addr).then((balance) => {
        let winston = balance;
        let ar = arweave.ar.winstonToAr(balance);
        console.log("Balance (winston):", winston);
        console.log("Balance (AR)", ar);
        return Promise.resolve(ar);
    });    
}

export async function testTransaction() {
    // The transaction
    let buf = Arweave.utils.stringToBuffer('Some data');
    let transaction = await arweave.createTransaction({
        data: buf
    });
  
    // Tags
    transaction.addTag('DataType', 'entry');
    transaction.addTag('Algo', 'RSA');
    transaction.addTag('Keys', 'x,y,z');
    transaction.addTag('Wallets', 'x1,y1,z1');
    console.log(transaction);
  
    // Sign it
    // await arweave.transactions.sign(transaction);
  
    // // Upload
    // let uploader = await arweave.transactions.getUploader(transaction);
    // while (!uploader.isComplete) {
    //   await uploader.uploadChunk();
    //   console.log(`${uploader.pctComplete}% complete, ${uploader.uploadedChunks}/${uploader.totalChunks}`);
    // }
}
  