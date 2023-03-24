# MetaMask Onchain SVG NFT Tickets Workshop

This workshop starts with a [React](https://beta.reactjs.org) / [NextJS](https://nextjs.org) mono repo and walks attendees through building out a Web3 dApp that utilizes [MetaMask SDK](https://metamask.io/sdk), [Truffle](https://trufflesuite.com), and [Ganache](https://trufflesuite.com/ganache) and give you a very well rounded start to using our tools in conjunction with each other and start building in Web3.  

## Decisions We Have Made

We have gone with a mono repo so that we can have separation of our **blockchain** and **web** projects respectfully. Smart contracts in one directory and our React / NextJS frontend in another directory with the ability to have their own package dependencies, but all existing in the same workspace.  

We have chosen [Turbo](https://turbo.build), an incremental bundler/build system optimized for JavaScript and TypeScript mono repos.

We use NextJS a popular React framework very popular for building web3 projects so that those with traditional web development experience will feel more at home with our setup. NextJS is not a client only framework so it will always do an initial render on the server side. This is something that requires a slightly different approach when integrating MetaMask as it works by injecting on the window object. 

Since NextJS can be a bit more complicated than a standard React application, we have chosen this route to try to bring as much value as possible. Also knowing that a lot of developers are starting to choose NextJS for Web2 and Web3 applications. In this workshop we create a `MetaMaskProvider` which is not standard or out of the box with MetaMask SDK and something you will surely run into building in Web3 with MetaMask. We thought it was very valuable to show off at least one approach on how to do this so that you can keep your wallet state in sync with your web dApp. WE achieve this globally inn our application utilizing React Context API.

This workshop also utilizes [TypeScript](https://www.typescriptlang.org/docs/handbook/intro.html) and [TypeChain](https://github.com/dethcrypto/TypeChain) (TypeScript bindings for Ethereum smart contracts) to ensure that we can extend JavaScript and overall improve the developer experience. These choices enable developers to add type safety. Moreover, TypeScript itself provides various other features, like interfaces, type aliases, abstract classes, function overloading, tuple, generics, etc.  

We have purposefully made choices to reduce the number of overall dependencies outside of configuration for this type of project. We do some things like state management and deployment of contracts in a more manual fashion as to teach you the basics rather than lean on other platforms to do this for you. After taking this workshop yu should have a pretty solid understanding of what it takes to build and deploy a basic dApp to a testnet like Ethereum's Goerli or Polygon's Mumbai.

## Prerequisites:
- NodeJS 18.1 & NPM 9.5.0
- Code Editor
- Git / GitHub account 
- [MetaMask Extension](https://metamask.io/download) Installed
- Knowledge of JavaScript, TypeScript, and React (is a plus but not required)
- Truffle and Ganache installed

Before getting started ensure you are on NodeJS 18 and that you have Truffle and Ganache installed globally with NPM:

```bash
npm i truffle ganache -g
```

## Getting Started

Clone the workshop repo on your machine and checkout the `start` branch:

```bash
git clone https://github.com/MetaMask/onchain-svg-nft-tickets && 
cd onchain-svg-nft-tickets && 
git checkout start && npm i
```

With our repo cloned and dependencies installed, we have a solid framework to build with. 

## Run Our NextJS Project

Let's ensure our frontend NextJS project runs in dev mode. 

In a new terminal window run:

```bash
cd apps/web && npm run dev
```

If all is working, you should see the text: "Lets Build in Web3". 
Exit out of `next dev`

```bash
cd ../..
```

The next time we run our dApp, we'll use our turbo scripts from the root.

## Reviewing our Blockchain App

Rather than spend hours creating a Smart contract for our NFT Tickets, we have provided that in the `start` branch.
If you are following along to this outside of a workshop, just make sure you have an understanding of what these files do:

- `ETHTickets.sol`
   - This is our NFT Tickets smart contract
   - Our challenge is to improve upon this in anyway that you can and share with the group so we can all learn together.
- `HexStrings.sol`
  - `toHexString` Converts a `uint256` to its ASCII `string` hexadecimal representation with fixed length.
  - Base64 util allows you to transform bytes32 data into its Base64 string representation. Send JSON Metadata through a Base64 Data URI using an ERC721:
- `1_initial_migration.js`

## Building and Running our Project

We have several npm scripts to help us build and run our project locally.
Let's get our local blockchain environment up and running. 

Build our contracts and generate the types that we can use in our NextJS app.

From the root of the project run:

```bash
npm run build
```

Run a local instance of Truffle and Ganache to generate accounts, and private keys for us to test our dApp.

Run the following command:

```bash
npm run local
```

The output from this command will give us some private keys, and we can take one of those private keys and import it into our MetaMask using the following network information:

- Network Name: Localhost 9545
- New RPC URL: http://localhost:9545
- Chain ID: 1337
- Currency Symbol: ETH
- Block explorer URL: we can leave this blank

For our Front-end we can open one more terminal window and run (from the root this time):

```bash
npm run dev
```

**Important**
We need to pay attention to the output of this command, and anytime we rerun this command, we will need to get the `contract address` and copy it into the `apps/web/lib/config` file. Let's do that now...

All of the work, from this point, will be done in our `apps/web` directory. All dependencies we will rely on have already been installed:

## Connecting Users to MetaMask

Create a directory in `apps/web/components/` named `styledComponents`  
> _for styling our components and styles we can reuse throughout our application_

Create a file named `navigation.js` inside that `styledComponents` directory, and add code:

```js
import styled from 'styled-components';

export const NavigationView = styled.div`
  padding: 1em;
  border-bottom: 1px solid #333;
  background-color: #1D1E22;;
  color: #FFF;
`;

export const Logo = styled.div`
  display: block;
  display: inline-block;
  line-height: 36px;
  height: 36px;
  background: linear-gradient(to right, #2bf9f9, #e757fa);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
`

export const Balance = styled.div`
  display: inline-block;
  margin-left: 1em;
`

export const RightNav = styled.div`
  color: #ddd;
  margin-left: auto;
  line-height: 36px;
  height: 36px;
  width: ${props => (props.widthPixel += "px") || "100%"};
`
```

Create: `general.js` inside the `styledComponents` directory with the following code:

```js
import styled from 'styled-components';

export const FlexContainer = styled.div`
  display: flex;
  align-self: flex-end;
  flex-direction: row;
  min-width: calc(100vw -2em);
  gap: ${props => props.gap || 0}em;
  row-gap: ${props => props.gap || 0}em;
`;

export const FlexItem = styled.div`
  width: ${props => props.widthPercent || 50}%;
`;

export const Button = styled.button`
  border-radius: 6px;

  box-shadow: 0 0 6px 0 rgba(157, 96, 212, 0.5);
  border: solid 1px transparent;
  background-image: linear-gradient(to right, #2bf9f9, #e757fa);
  background-origin: border-box;
  background-clip: content-box, border-box;

  background: linear-gradient(to right, #2bf9f9, #e757fa);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;

  color: #FFF;
  font-size: ${props => props.textSize || 16}px;
  text-transform: uppercase;
  padding: 1em 0.75em;
  display: inline-block;
  margin: 0 1em 0 0;
  cursor: pointer;
  cursor: hand;
  user-select: none;

  &:hover {
    background-color: #244982;
  }
  
  &:disabled {
    background-color: #244982;
    color: #7697C8;
    cursor: not-allowed;
  }
`
```

Add a `Navigation.tsx` file in the `apps/web/components` directory with the following code:

```typescript
import Link from "next/link";

import { Button, FlexContainer, FlexItem, } from "./styledComponents/general";
import { NavigationView, Balance, RightNav, Logo } from "./styledComponents/navigation";
import { SiEthereum } from 'react-icons/si';

export default function Navigation() {

  return (
    <NavigationView>
      <FlexContainer>
        <FlexItem widthPercent={50}>
          <Logo>
            <SiEthereum /> ETH Atlantis
          </Logo>
        </FlexItem>
        <FlexItem widthPercent={50}>
          <RightNav widthPixel={300}>
            <span>MM CONNECT BUTTON</span>
          </RightNav>
        </FlexItem>
      </FlexContainer>
    </NavigationView>
  );
}
```

With our navigation in place, let's update our `pages/index.tsx` using the following code:

```typescript
import type { NextPage } from "next";
import Head from 'next/head';

import Navigation from '../components/Navigation'

const Mint: NextPage = () => {

  return (
    <div className="mint-tickets">
      <Head>
        <title>ETH Atlantis 2022</title>
        <meta property="og:title" content="The largest underwater Ethereum event in history" key="title" />
      </Head>

      <Navigation />
    </div>
  );
};

export default Mint;
```

This `imports` our `Navigation` and adds the component in the area we had reserved for it.

We should see our navigation in the top right corner. We need to replace the text that says "MM CONNECT BUTTON".  
But first, we need to set up two React hooks to listen and provide context for our connected user. 

Create a new directory in the web app under `apps/web/hooks` and add the two following files.

Create a file named `useMetaMask.tsx` with the following code:

```typescript
import React, { type PropsWithChildren } from "react";

type ConnectAction = { type: "connect"; wallet: string; balance: string };
type DisconnectAction = { type: "disconnect" };
type PageLoadedAction = {
  type: "pageLoaded";
  isMetaMaskInstalled: boolean;
  wallet: string | null;
  balance: string | null;
};
type LoadingAction = { type: "loading" };
type IdleAction = { type: "idle" };

type Action =
  | ConnectAction
  | DisconnectAction
  | PageLoadedAction
  | LoadingAction
  | IdleAction;

type Dispatch = (action: Action) => void;

type Status = "loading" | "idle" | "pageNotLoaded";

type State = {
  wallet: string | null;
  isMetaMaskInstalled: boolean;
  status: Status;
  balance: string | null;
};

const initialState: State = {
  wallet: null,
  isMetaMaskInstalled: false,
  status: "loading",
  balance: null,
} as const;

function metamaskReducer(state: State, action: Action): State {
  switch (action.type) {
    case "connect": {
      const { wallet, balance } = action;
      const newState = { ...state, wallet, balance, status: "idle" } as State;
      const info = JSON.stringify(newState);
      window.localStorage.setItem("metamaskState", info);

      return newState;
    }
    case "disconnect": {
      window.localStorage.removeItem("metamaskState");
      if (typeof window.ethereum !== undefined) {
        window.ethereum.removeAllListeners(["accountsChanged"]);
      }
      return { ...state, wallet: null, balance: null };
    }
    case "pageLoaded": {
      const { isMetaMaskInstalled, balance, wallet } = action;
      return { ...state, isMetaMaskInstalled, status: "idle", wallet, balance };
    }
    case "loading": {
      return { ...state, status: "loading" };
    }
    case "idle": {
      return { ...state, status: "idle" };
    }

    default: {
      throw new Error("Unhandled action type");
    }
  }
}

const MetaMaskContext = React.createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);

function MetaMaskProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = React.useReducer(metamaskReducer, initialState);
  const value = { state, dispatch };

  return (
    <MetaMaskContext.Provider value={value}>
      {children}
    </MetaMaskContext.Provider>
  );
}

function useMetaMask() {
  const context = React.useContext(MetaMaskContext);
  if (context === undefined) {
    throw new Error("useMetaMask must be used within a MetaMaskProvider");
  }
  return context;
}

export { MetaMaskProvider, useMetaMask };
```

These files respectively listen for changes in the user's connection to MetaMask and set up a context provider for sharing the wallet state to the components in our app.  

We have used the traditional reducer pattern that handles all of our state for the MetaMask wallet that we need to keep in sync with our dApp. We have actions for connecting, disconnecting, pageLoad (so that we know when we have access to MetaMask or not), loading, idle, and networkSwitched. We also utilize local storage in order to simulate disconnecting from our dApp for UX purposes. Without a disconnect experience you may have to manually do that and refresh the page and we feel that presents a bad UX pattern.

This brings us to our `useListen` hook that works in conjunction with our `useMetamask` or `MetaMaskProvider` provider. It checks for accounts, balances, or chains/networks that have changed in the wallet and dispatches the proper action in our reducer. Let's create that hook now.

Create a file named `useListen.tsx` with the following code:

```typescript
import { useMetaMask } from "./useMetaMask";

export const useListen = () => {
  const { dispatch } = useMetaMask();

  return () => {
    window.ethereum.on("accountsChanged", async (newAccounts: string[]) => {
      if (newAccounts.length > 0) {
        // upon receiving a new wallet, we'll request again the balance to synchronize the UI.
        const newBalance = await window.ethereum!.request({
          method: "eth_getBalance",
          params: [newAccounts[0], "latest"],
        });

        dispatch({
          type: "connect",
          wallet: newAccounts[0],
          balance: newBalance,
        });
      } else {
        // if the length is 0, then the user has disconnected from the wallet UI
        dispatch({ type: "disconnect" });
      }
    });
  };
};
```

With those files in place, we'll wire up our connect and disconnect as well as display basic balance information from our connected user.  

Let's go back to our `Navigation.tsx` file, and replace with the following code:

```typescript
import Link from "next/link";
import { useListen } from "../hooks/useListen";
import { useMetaMask } from "../hooks/useMetaMask";

import { Button, FlexContainer, FlexItem, } from "./styledComponents/general";
import { NavigationView, Balance, RightNav, Logo } from "./styledComponents/navigation";
import { SiEthereum } from 'react-icons/si';

export default function Navigation() {
  const {
    dispatch,
    state: { status, isMetaMaskInstalled, wallet, balance },
  } = useMetaMask();
  const listen = useListen();

  const showInstallMetaMask =
    status !== "pageNotLoaded" && !isMetaMaskInstalled;
  const showConnectButton =
    status !== "pageNotLoaded" && isMetaMaskInstalled && !wallet;

  const isConnected = status !== "pageNotLoaded" && typeof wallet === "string";

  const handleConnect = async () => {
    dispatch({ type: "loading" });
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    if (accounts.length > 0) {
      const balance = await window.ethereum!.request({
        method: "eth_getBalance",
        params: [accounts[0], "latest"],
      });
      dispatch({ type: "connect", wallet: accounts[0], balance });

      // we can register an event listener for changes to the user's wallet
      listen();
    }
  };

  const handleDisconnect = () => {
    dispatch({ type: "disconnect" });
  };

  const formatAddress = (addr: string) => {
    return `${addr.substr(0, 6)}...${addr.substr(-4)}`
  }

  return (
    <NavigationView>
      <FlexContainer>
        <FlexItem widthPercent={50}>
          <Logo>
            <SiEthereum /> ETH Atlantis
          </Logo>
        </FlexItem>
        <FlexItem widthPercent={50}>
          <RightNav widthPixel={wallet && balance ? 300 : 119}>
            {showConnectButton && (
              <Button textSize={10} onClick={handleConnect}>
                {status === "loading" ? "loading..." : "Connect Wallet"}
              </Button>
            )}
            {showInstallMetaMask && (
              <Link href="https://metamask.io/" target="_blank">
                Install MetaMask
              </Link>
            )}
            {wallet && balance && (
              <>
                {isConnected && <Button textSize={10} onClick={handleDisconnect}>Disconnect</Button>}
                <a
                  className="text_link tooltip-bottom"
                  href={`https://etherscan.io/address/${wallet}`} target="_blank"
                  data-tooltip="Open in Etherscan"
                >
                  {formatAddress(wallet)}
                </a>
                <Balance>
                  {(parseInt(balance) / 1000000000000000000).toFixed(2)}{" "}ETH
                </Balance>
              </>
            )}
          </RightNav>
        </FlexItem>
      </FlexContainer>
    </NavigationView>
  );
}
```

At this point, we would still get an error if we run the frontend, because we have not wrapped the app with a provider.
let's go to the `apps/web/pages/_app.tsx` and replace it with the following code:

```typescript
import 'normalize.css'
import '../styles/globals.scss'

import type { AppProps } from "next/app";
import { Layout } from "../components/Layout";
import { MetaMaskProvider } from "../hooks/useMetaMask";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MetaMaskProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </MetaMaskProvider>
  );
}

export default MyApp;
```

We need to make two more changes, one to our `apps/web/components/Layout.tsx` as this code will determine `isMetaMaskInstalled` if the Ethereum provider exists or if it is `undefined` and dispatch the proper actions to our context's reducers. 

In the `Layout.tsx` file update the code to the following: 

```typescript
import { PropsWithChildren, useEffect } from "react";
import { useListen } from "../hooks/useListen";
import { useMetaMask } from "../hooks/useMetaMask";
import { instantiateSdk } from "../lib/MetaMaskSdk";

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  const { dispatch } = useMetaMask();
  const listen = useListen();

  useEffect(() => {
    if (typeof window !== undefined) {
      // start by checking if window.ethereum is present, indicating a wallet extension
      const ethereumProviderInjected = typeof window.ethereum !== "undefined";
      // this could be other wallets so we can verify if we are dealing with metamask
      // using the boolean constructor to be explicit and not let this be used as a falsy value (optional)
      const isMetaMaskInstalled =
        ethereumProviderInjected && Boolean(window.ethereum.isMetaMask);

      const local = window.localStorage.getItem("metamaskState");

      // if user was previously connected, start listening to MM
      if (local) {
        listen();
      }

      // local could be null if not present in LocalStorage
      const { wallet, balance } = local
        ? JSON.parse(local)
        : // backup if local storage is empty
          { wallet: null, balance: null };

      instantiateSdk();
      dispatch({ type: "pageLoaded", isMetaMaskInstalled, wallet, balance });
    }
  }, []);

  return (
    <div className="app-container">
      {children}
    </div>
  );
};
```

Finally, we need to add a new file to the `apps/web/lib` directory called `MetaMaskSdk.ts`.

Once you have created that file, add the following code:

```typescript
import MetaMaskSDK from "@metamask/sdk";

export const instantiateSdk = () => {
  if (typeof window === undefined) {
    return null;
  }

  new MetaMaskSDK();
};
```

This will solve our warnings in our editor that we previously saw for `window` being undefined.

Now our connect, display, and disconnect functionality should work. 

Let's test our dApp. We should now get the option to install if we don't have the MetaMask extension, connect if we do, display balance if we are connected, and disconnect if we wish.

## Add Tickets and Minting

Since our app is based on showing the type of tickets available and allowing the user to mint those tickets, we will be adding components directly to the `apps/web/pages/index.ts` page.

First, add an array of objects that represent the types of tickets we want to allow users to mint (GA vs VIP), Event Name, and Price in ETH using both the basic and hex version of this price. 

_* Why both? We want to display the value as well have the hex value to send to our contract._

On the `index.tx` page import the `ethers` library (for interacting with Ethereum) and `Tickets` Component just above the `Navigation` import:

```typescript
import { ethers } from "ethers";

import Tickets from "../components/tickets/Tickets";
import Navigation from '../components/Navigation';
```

Next, just under the Mint component declaration add the following code:

```typescript
  // Get ETH as a small number ("0.01" => "10000000000000000")
  const bigNumberify = (amt: string) => ethers.utils.parseEther(amt);

  const ethGa = "0.01";
  const ethVip = "0.02";
  const ethGaHex = bigNumberify(ethGa)._hex;
  const ethVipHex = bigNumberify(ethVip)._hex;
  const tickets = [
    {
      type: "ga",
      event: "ETH Atlantis",
      description: "General Admission Ticket",
      price: ethGa,
      priceHexValue: ethGaHex, // '0x2386f26fc10000' *eserialize.com
    },
    {
      type: "vip",
      event: "ETH Atlantis",
      description: "VIP Ticket",
      price: ethVip,
      priceHexValue: ethVipHex, // '0x470de4df820000' *eserialize.com
    },
  ];
```

Finally, we will add the actual `<Ticket/>` component and pass this `tickets` array to it, just underneath the `<Navigation/>` component, add the following code: 

```typescript
      <Tickets tickets={tickets} />
```

Now we will create a directory named `tickets` inside `apps/web/components` and add a file named `Tickets.tsx` with the following code:

```typescript
import { useState } from "react";

import { SiEthereum } from 'react-icons/si';

import { Button, FlexContainer, FlexItem, } from "../styledComponents/general";
import { HeadingText, TicketsView, TicketType, TicketTypeText, StyledAlert } from "../styledComponents/tickets";

interface Ticket {
  type: string;
  event: string;
  description: string;
  price: string;
  priceHexValue: string;
}
interface TicketsProps {
  tickets: Ticket[];
}

const TicketTypes: React.FC<Ticket> = ({
  type, event, description, price, priceHexValue,
}) => {

  const [isMinting, setIsMinting] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <FlexItem>
      <TicketType>
        <TicketTypeText>{description}</TicketTypeText>
        <p>{event}</p>
        <Button disabled={isMinting}>
          <SiEthereum /> {isMinting ? 'Minting...' : 'Mint'} Ticket
        </Button>
        {
          error && (
            <StyledAlert onClick={() => setError(false)}>
              <span>
                <strong>Error:</strong> {errorMessage}
              </span>
            </StyledAlert>
          )
        }
      </TicketType>
    </FlexItem>
  );
};

const Tickets = ({ tickets }: TicketsProps) => {
  return (
    <TicketsView>
      <HeadingText>Ticket Types</HeadingText>
      <FlexContainer gap={1}>
        {tickets.map((ticket) => (
          <TicketTypes key={ticket.type} {...ticket} />
        ))}
      </FlexContainer>
    </TicketsView>
  );
};

export default Tickets;
```

With this in place, we need to add the styled components for the `Tickets` page.

In the `apps/web/components/styledComponents` directory, create a page called `tickets.js` and add the following code:

```js
import styled from 'styled-components';

export const TicketsView = styled.div`
  padding: 1em;
`;

export const TicketType = styled.div`
  border-radius: 10px;
  height: 220px;
  padding: 0.01em 1em;
  background-color: #110010;
  color: #BDCFE2;
  user-select: none;
  -webkit-box-shadow: 3px 7px 33px -14px rgba(17,63,112,1);
  -moz-box-shadow: 3px 7px 33px -14px rgba(17,63,112,1);
  box-shadow: 3px 7px 33px -14px rgba(17,63,112,1);
`;

export const HeadingText = styled.h1`
  color: #ccc;
`

export const TicketTypeText = styled.h2`
  color: #93cae5;
`

export const StyledAlert = styled.div`
  border-radius: 5px;
  padding: 0.5em;
  font-size: 10px;
  height: 40px;
  width: 100%;
  word-break: break-word;
  margin: 0.5em 0;
  background-color: #244982;
  strong {
    color: #E2761B;
  }
`
```

With all of this in place, if we run our dApp we should see our ticket types with minting buttons (even though they do not work yet).

## Adding Minting Functionality to TicketType Component

We need to add some additional code to our `Tickets.tsx` page, allowing us to interact with our smart contract.

When we are done with this next section, we should be able to call our contract's `mintNFT` function and determine if our minting function works.

In the `Tickets.tsx` page, we need to add a few imports, lets replace them:

```typescript
import { useState } from "react";
import { useRouter } from "next/router";
import { useMetaMask } from "../../hooks/useMetaMask";
import { ETHTickets__factory } from "blockchain";
import { ethers } from "ethers";
import { config } from "../../lib/config";

import { SiEthereum } from 'react-icons/si';

import { Button, FlexContainer, FlexItem, } from "../styledComponents/general";
import { HeadingText, TicketsView, TicketType, TicketTypeText, StyledAlert } from "../styledComponents/tickets";
```

These imports will give us access to our connected wallet state, the NextJS router so the we can force a page refresh (only after a successful mint), access to our smart contract through the `ETHTickets__factory` created by our build which utilizes typechain, the ethers library to get provider and signer for interacting with the blockchain via our contracts methods and the config file that knows the contract address.

Next, we need to destructure our wallet state returned by a call to the `useMetaMask()` hook, as well define a router with a call to the NextJS `useRouter()` hook

Starting on line 28 of the `Tickets.tsx` file inside our `TicketsType` component update that code with the following:

```typescript
  const { state: { wallet }, } = useMetaMask();
  const router = useRouter();
  const [isMinting, setIsMinting] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
```

We need to add a function called `mintTicket()`

Directly below the code just added and just above the return statement in the `TicketsType` component, add the following code:

```typescript
const mintTicket = async () => {
    setIsMinting(true);

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // In ethers.js, providers allow you to query data from the blockchain. 
    // They represent the way you connect to the blockchain. 
    // With them you can only call view methods on contracts and get data from those contract.
    // Signers are authenticated providers connected to the current address in MetaMask.
    const signer = provider.getSigner();

    const factory = new ETHTickets__factory(signer);
    const nftTickets = factory.attach(config.contractAddress);

    nftTickets
      .mintNFT({
        from: wallet!,
        value: priceHexValue,
      })
      .then(async (tx: any) => {
        console.log('minting accepted')
        await tx.wait(1);
        console.log(`Minting complete, mined: ${tx}`);
        setIsMinting(false);
        router.reload()
      })
      .catch((error: any) => {
        console.log(error);
        setError(true);
        setErrorMessage(error?.message);
        setIsMinting(false);
      })
  };

  const cantMint = !Boolean(wallet) && !isMinting
```

This creates an async call on our `nftTickets` factory calling the `mintNFT` function and then either runs the `then` async function or catches the error. If we have a success, the `then` function will log the transaction after awaiting it, and then `setIsMinting` to false using a setter of our React state.

Finally, we will update the button inside the `TicketsType` component's JSX and add a call to the `mintTicket()` function:

```typescript
        <Button disabled={cantMint} onClick={mintTicket}>
          <SiEthereum /> {isMinting ? 'Minting...' : 'Mint'} Ticket
        </Button>
```

At this point, if we are connected to the dApp with a MetaMask wallet that has some ETH in it, we can test those buttons out. Ensure you have your developer tools in your browser is open to the console so we can see those logs once we mint. (comment out the `router.reload()` statement to ensure we can see the console messages and uncomment once we are sure it is working).

We should see:
```bash
minting accepted
Tickets.tsx?cd6d:55 Minting complete, mined: 0x......
```

With the minting now working we are ready to make our last set of changes to display the connected wallet's minted NFTs.

## Add TicketsOwned Component to Minting Page

First we need to add the styles we will need to display our minted NFTs in a grid at the bottom of the page.  

Create a new file in the `apps/web/components/styledComponents` directory named `ticketsOwned.js` and add the following code:

```js
import styled from "styled-components";

export const GridContainer = styled.div`
  padding: 0.5em;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(${props => props.columns || 2}, ${props => props.columnWidth}px);
  grid-template-rows: repeat(${props => props.itemWidth || "300"}px);
`;

export const SvgItem = styled.div`
  width: 300px;
  padding: ${props => props.pad || 0}px;
`;
```

In the `apps/web/pages/index.tsx` file we need to add one final component named `<TicketsOwned />`. 

Create a file named `TicketsOwned.tsx` inside the `apps/web/components/tickets` directory. 

This code that we add will be everything we need in order to fetch and display our connected users tickets to our event. Each NFT they have minted already will show up here. This is an interesting feature in our Smart Contract that ensures that if they have already minted an NFT through this Smart Contract with the same wallet address they will have a complete view of all of their tickets.

In `TicketsOwned.tsx`, add the following code:

```typescript
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import Image from "next/image";

import { ETHTickets__factory } from "blockchain";
import { config } from "../../lib/config";
import { useMetaMask } from "../../hooks/useMetaMask";

import { GridContainer, Grid, SvgItem } from "../styledComponents/ticketsOwned";

type NftData = {
  name: string,
  description: string,
  attributes: { trait_type: any, value: any }[],
  owner: string,
  image: string
};

type TicketFormatted = {
  tokenId: string
  svgImage: string
  ticketType:
  { trait_type: any, value: any }
};

const TicketsOwned = () => {
  const [ticketCollection, setTicketCollection] = useState<TicketFormatted[]>([]);
  const { state: { wallet: address }, } = useMetaMask();

  useEffect(() => {
    if (typeof window !== "undefined" && address !== null) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const factory = new ETHTickets__factory(signer);
      const nftTickets = factory.attach(config.contractAddress);

      const ticketsRetrieved: TicketFormatted[] = [];

      nftTickets.walletOfOwner(address).then((ownedTickets) => {
        const promises = ownedTickets.map(async (t) => {
          const currentTokenId = t.toString();
          const currentTicket = await nftTickets.tokenURI(currentTokenId);

          const base64ToString = window.atob(
            currentTicket.replace("data:application/json;base64,", "")
          );
          const nftData: NftData = JSON.parse(base64ToString);

          ticketsRetrieved.push({
            tokenId: currentTokenId,
            svgImage: nftData.image,
            ticketType: nftData.attributes.find(
              (t) => t.trait_type === "Ticket Type"
            ),
          } as TicketFormatted);
        });
        Promise.all(promises).then(() => setTicketCollection(ticketsRetrieved));
      });
    }
  }, [address]);

  let listOfTickets = ticketCollection.map((ticket) => (
    <SvgItem pad={4} key={`ticket${ticket.tokenId}`}>
      <Image
        width={300}
        height={300}
        src={ticket.svgImage}
        alt={`Ticket# ${ticket.tokenId}`}
      />
    </SvgItem>
  ));

  return (
    <GridContainer>
      <Grid columns={3} itemWidth={300} columnWidth={308}>{listOfTickets}</Grid>
    </GridContainer>
  );
};

export default TicketsOwned;
```

At this point, each time you mint a new ticket, you should see them displayed as SVG at the bottom of the screen in a grid format. These are the exact NFTs your users will be minting and we are getting the SVG images directly from the deployed smart contract using the `generateNftSvgByTokenId()` method in our contract which takes a tokenId and builds and returns the SVG just as it is stored onchain.

This concludes the instructional portion of the workshop, we would love you to continue working on this project and adding your own features, iterating on the UI, adding better error handling, create tests and even deploy to a testnet. The MetaMask DevRel team and Eric Bishard at [@httpJunkie](https://twitter.com/httpjunkie) can be contacted on Twitter or Telegram.

## Taking The Project to the Next Level

If you'd like to iterate on your smart contracts, we recommend interacting with and testing them via the development console. The [Truffle Quickstart ](https://trufflesuite.com/docs/truffle/quickstart) gives an overview of standard actions you might take when developing smart contracts.

If you want to interact with mainnet contracts locally, we recommend setting up a separate ganache instance to fork mainnet locally https://github.com/trufflesuite/ganache#readme

Once you're ready to deploy your contracts to a testnet or live to mainnet, you can do so with your MetaMask wallet and [Truffle Dashboard](https://trufflesuite.com/docs/truffle/how-to/use-the-truffle-dashboard)

To configure Truffle Dashboard in any project just run:

```bash
truffle dashboard
```