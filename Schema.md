# Schema

All the data (journal, entry, etc) is stored as transactions on Arweave. The schema will describe the models. Any developer can create apps to read the entries. 

The `data` (of an Arweave transaction) is encrypted with RSA asymmetric cryptography, such that only the user with the wallet (private key) can decrypt. Specifically, the algorithm is RSA-OAEP and the hash is SHA-256.

After decrypting the `data`, you will get a JSON (except v0.1) to various data.

## v0.2

Decrypted Data:

- content: Entry textual content
- photos: Array of photo data in base64

## v0.1

The decrypted data is the entry's content. 

Tags:

- Scheme: 0.1 // The Entry schema version
- DataType: entry // The only data type now is entry
- Date: entry date 
  