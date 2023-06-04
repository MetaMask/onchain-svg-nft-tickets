## Linea Build Steps:

clone project and run `npm i && npm run build`
to generate contract-abis `truffle compile`
Deploy contract on Linea: `npm run deploy:mumbai --workspace blockchain`
Run frontend against deployed contract: `npm run dev:testnet`