import Arweave from 'arweave';
import { Entry } from '/src/store.js'
import { ref } from 'vue';

const arweave = Arweave.init({});

export const address = ref(null);
export const txnStatus = ref("");

export async function connect() {
    return await window.arweaveWallet.connect(
        ["ACCESS_ADDRESS", "ENCRYPT", "DECRYPT"],
        {
            name: "Jade",
            logo: "https://jade2us.com/images/jade-icon-100.png"
        }
    ).then(() => {
        getWalletAddress();
    });
}

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

let encryptOptions = {
    algorithm: "RSA-OAEP",
    hash: "SHA-256"
}

export async function publish(entry) {
    console.log("Publishing..", entry);
    txnStatus.value = "Publishing to Arweave..";
    
    return connect().then(() => {
        return window.arweaveWallet.encrypt(entry.content, encryptOptions)
    }).then(data => {
        // console.log(data);
        // decrypt(data);
        return sendEntryTransaction(data, entry.date, address.value);
    }).then(ok => {
        return Promise.resolve(ok);
    });
}

export async function decrypt(data) {
    window.arweaveWallet.decrypt(data, encryptOptions).then(decryptedData => {
        console.log(decryptedData);
        console.log("Decoded:", decryptedData);
    });
}

export async function sendEntryTransaction(data, entryDate, ownerAddress) {
    // Test without signing and sending
    // setTimeout(() => {
    //     txnStatus.value = "Published successfully!";
    // }, 3000);
    // return Promise.resolve(true);
    
    // Create the transaction and tags
    let transaction = await arweave.createTransaction({
        data: data
    });
    transaction.addTag('Scheme', '0.1'); // Algo RSA, user pub key
    transaction.addTag('DataType', 'entry');
    transaction.addTag('Date', entryDate);
    // transaction.addTag('Algo', 'RSA');
    // transaction.addTag('Keys', 'x,y,z');
    let wallets = [ownerAddress];
    transaction.addTag('Wallets', wallets.join(","));
    console.log(transaction);
    
    // Tags need to decode
    // transaction.get('tags').forEach(tag => {
    //     let key = tag.get('name', {decode: true, string: true});
    //     let value = tag.get('value', {decode: true, string: true});
    //     console.log(`${key} : ${value}`);
    // });

    // Sign it
    await arweave.transactions.sign(transaction);
    console.log(transaction);
    
    // Upload
    let uploader = await arweave.transactions.getUploader(transaction);
    while (!uploader.isComplete) {
        await uploader.uploadChunk();
        console.log(`${uploader.pctComplete}% complete, ${uploader.uploadedChunks}/${uploader.totalChunks}`);
        txnStatus.value = "Published successfully!";

        // Reset
        setTimeout(() => {
            txnStatus.value = null;
        }, 7000);

        return Promise.resolve(true);
    }
}
  