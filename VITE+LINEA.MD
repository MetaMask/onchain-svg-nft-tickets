# ViteJS + React, MetaMask SDK and Linea Testnet

This branch of the Onchain SVG NFT workshop repo is a workshop that will walk you through an existing Mono Repo that has a blockchain project located in `/apps/blockchain` which utilizes Truffle to deploy a Solidity Smart Contract that will allow us to mint Onchain SVG Tickets to a fictitious event named ETH Atlantis (not and official ETH Global Event).  

Next we have a client application built with ViteJS + React w/ TypeScript located in `apps/web` that utilizes MetaMask SDK to connect our React application to either MetaMask Browser extension (if installed) or a MetaMask Mobile wallet if a MetaMask browser extension is not found. We show you how to conditionally render UI to connect, switch chains and display wallet information from MetaMask Browser Extension or MetaMask Mobile. As well, we have provided a MetaMask Context Provider and a `useMetaMask` hook to help you manage MetaMask wallet state in the scenario of connecting to either MetaMask Extension or Mobile.

Once this repos is cloned and you have switched to the `vite-linea-sdk` branch using Git. This README will walk you through how to get your project built, your contracts deployed, configure a specific chain in which to deploy your contract to and how to run the client application.

Once running we should be able to Mint new tickets, respond to changes from the wallet like switching of accounts, chain, or updated balance. Finally once the user has minted ticket(s) the minting page will also display those SVG tickets that are stored on the Ethereum blockchain on the minting page so that a user connected with a wallet that has previously purchased tickets can see all NFT tickets that they own.

### Step #01: 

Clone the project and switch to the proper branch:

```bash
git clone https://github.com/MetaMask/onchain-svg-nft-tickets && git checkout vite-linea-sdk
```

Install dependencies from root of project:

```bash
npm i
```

Create an Infura account and setup an [Infura](https://www.infura.io) account and create an API Key 

- Network: "Web3 API"
- Name: Choose any name you like

Once the account is created you will want to copy the API key by browsing to the Infura dashboard, selecting the project and clicking on the copy icon to the right of your API Key.

Create Environment Variable file inside the `apps/web` root:

- Rename the file at `apps/web/.env.example` to `.env`
- At this point the `.env` file are no longer tracked by Git

```bash
# Use hexadecimal network id 
#   localhost: '0x539'
#   Linea: '0xe704'
#   Goerli: '0x5' 
#   Mumbai: '0x13881'
VITE_PUBLIC_NETWORK_ID=[LINEA-HEX-CHAIN-ID-GOES-HERE]

# Get API Key from Infura dashboard:
VITE_PUBLIC_INFURA_PROJECT_ID=[API-KEY-GOES-HERE]
```

Create Environment Variable file inside the `apps/blockchain` root:

- Rename the file at `apps/blockchain/.env.example` to `.env`
- At this point the `.env` file are no longer tracked by Git

clone project and run `npm i && npm run build`
to generate contract-abis `truffle compile`
Deploy contract on Linea: `npm run deploy:mumbai --workspace blockchain`
Run frontend against deployed contract: `npm run dev:testnet`