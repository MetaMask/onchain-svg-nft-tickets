![](https://imgur.com/pM2qGfu.jpg)

# MetaMask Onchain SVG NFT Tickets Workshop

This workshop starts with a [React](https://beta.reactjs.org) / [NextJS](https://nextjs.org) mono repo and walks attendees through building out a Web3 dApp that utilizes [MetaMask SDK](https://metamask.io/sdk), [Truffle](https://trufflesuite.com), and [Ganache](https://trufflesuite.com/ganache) and give you a very well rounded start to using our tools in conjunction with each other and start building in Web3.  

## Decisions We Have Made

We have gone with a mono repo to respectfully separate our **blockchain** and **web** projects. Smart contracts in one directory and our React / NextJS frontend in another, with the ability to have their distinct dependencies (`package.json`), but all existing in one workspace.  

We have chosen [Turbo](https://turbo.build) for an incremental bundler/build system optimized for JavaScript and TypeScript mono repos.

We use NextJS, a popular React framework for building web3 projects, so that those with traditional web development experience will feel more at home with our setup. NextJS is not a client-only framework, so it will always do an initial render on the server side. Therefore, it requires a slightly different approach when integrating MetaMask as it works by injecting on the window object. 

We have decided to use React's Context API to manage the wallet state to bring as much value as possible in this workshop, knowing that many developers are starting to choose NextJS for Web2 and Web3 applications. 

In this workshop, we create a `MetaMaskProvider`, which is not standard or out of the box with MetaMask SDK and something you will undoubtedly need to build with React and MetaMask. We present one approach on how to do this so that you can keep your wallet state in sync with your web dApp using global State.

This workshop also utilizes [TypeScript](https://www.typescriptlang.org/docs/handbook/intro.html) and [TypeChain](https://github.com/dethcrypto/TypeChain) (TypeScript bindings for Ethereum smart contracts) to ensure that we can extend JavaScript and overall improve the developer experience. These choices enable developers to add type safety. Moreover, TypeScript provides various other features, like interfaces, type aliases, abstract classes, function overloading, tuple, generics, etc.  

We have purposefully made choices to reduce the number of overall dependencies outside of configuration for this type of project. We do some things, like state management and deployment of contracts, manually to teach the basics rather than lean on other platforms or libraries. After completing this workshop, you should understand what it takes to build and deploy a basic dApp to a testnet like Ethereum's Goerli or Polygon's Mumbai.

## Prerequisites:
- NodeJS 18.1 & NPM 9.5.0
- Code Editor + GitHub account
- Truffle and Ganache installed
- [MetaMask Extension](https://metamask.io/download) or [MetaMask Flask](https://metamask.io/flask/) Installed
- 0.1 GoerliETH/MATIC (for testnets)
  - Goerli Faucets
    - https://goerlifaucet.com
    - https://goerlifaucet.org
    - https://goerli-faucet.mudit.blog
    - https://faucet.quicknode.com/ethereum/goerli
  - Mumbai Faucets
    - https://faucet.polygon.technology
    - https://mumbaifaucet.com
  - Network Information
    - https://chainlist.org/chain/5
    - https://chainlist.org/chain/80001

Before getting started, ensure you are on NodeJS 18+ and that you have Truffle and Ganache installed globally with NPM:

```bash
npm i truffle ganache -g
```

## Agenda

We have two phases in this workshop.

### Build and Test locally

We will start by building our project from our starting point and running everything from a local instance of a test blockchain using Truffle and Ganache. This method is a recommended way of building and testing your frontend that does not require any test ETH or deployment to a testnet.

### Deploy and Test using a Testnet

Once we have our app working locally, we will talk about how to change our config and environment variables to deploy to a testnet; this will require having either MATIC on Polygon's Mumbai testnet or GoerliETH on Ethereum's Goerli Testnet. The links above should help you drip 💧 that test ETH to your wallet.  

We suggest having about 0.1 testnet ETH or MATIC to deploy and test your application. In theory, you will not need all that, but that's how much one person can quickly get in one day for a workshop. If needed [Eric Bishard](https://twitter.com/httpjunkie) can send you some if you DM me.  

If you plan on deploying to a testnet, visit the ChainList site for [Mumbai](https://chainlist.org/chain/80001) and [Goerli](https://chainlist.org/chain/5) and click "connect wallet" to ensure you have those networks setup in MetaMask

## Getting Started 🎯

Clone the workshop repo on your machine and install project dependencies:

```bash
git clone https://github.com/MetaMask/onchain-svg-nft-tickets && 
cd onchain-svg-nft-tickets && npm i
```

Our GitHub repo's default branch is `start`, which is where you will be after cloning. If needed, you can switch to the `final` branch but remember that there are `.env` files which, if they do not exist, the project will not run. Those files require an Infura account/key and your test wallet's private key. We supply you with `.env.example` files which you can use, just rename them to `.env` and put your information in. When switching branches, you can keep you `.env` file by stashing and unstashing them when you switch branches. Just be sure not to commit `.env` file, as they contain sensitive information.

**DO NOT USE YOUR REGULAR METAMASK WALLET FOR DEV/TESTING*

## Run Our NextJS Project

Let's ensure our frontend NextJS project runs in dev mode. 

In a new terminal window run:

```bash
cd apps/web && npm run dev
```

If all is working, you should see the text: **"Lets Build in Web3"**  

Revert to the root and exit out of: `npm run dev`

```bash
cd ../..
```

The next time we run our dApp, we'll use our turbo scripts from the root.

## Reviewing our Blockchain App

Rather than spend hours creating a Smart contract for our NFT Tickets, we have provided that in the `start` branch.
If you are following along to this outside of a workshop, make sure you have an understanding of what these files do:

- `ETHTickets.sol`
   - This is our NFT Tickets smart contract
   - Our challenge is to improve upon this in any way you can and share it with the group so we can all learn together.
- `HexStrings.sol`
  - `toHexString` Converts a `uint256` to its ASCII `string` hexadecimal representation with fixed length.
  - Base64 util allows you to transform bytes32 data into its Base64 string representation. Send JSON Metadata through a Base64 Data URI using an ERC721:
- `1_initial_migration.js`

## Building and Running our Project

Several npm scripts help us build and run our project locally.
Let's get our local blockchain environment up and running. 

Build our contracts and generate the types we can use in our NextJS app.

From the root of the project run:

```bash
npm run build
```

Run a local instance of Truffle and Ganache to generate accounts and private keys for us to test our dApp.

Run the following command:

```bash
npm run local
```

The output from this command will give us some private keys, and we can take one of those private keys and import it into our MetaMask wallet.  

```
Truffle Develop started at http://127.0.0.1:9545/

blockchain:local: 
blockchain:local: Accounts:
blockchain:local: (0) 0xe8f3396ec6d6eb602707f5e0eec9813c619f9e21
...
blockchain:local: Private Keys:
blockchain:local: (0) 2af620e8c3debd5f31f3205725ee337d493eea305c8e49688429391705346d10
...
```

As well we will add a localhost network using the following network information:

In MetaMask, go to:  

_Settings > Networks > Add Network > Add a network manually_

- Network Name: `Localhost 9545`
- New RPC URL: `http://localhost:9545`
- Chain ID: `1337`
- Currency Symbol: `ETH`
- Block explorer URL: we can leave this blank

Now we should see the account we imported, and we will be on the Localhost 9545 network with 100 ETH for local testing. This test ETH only exists on our local network.

![](https://i.imgur.com/RcWcStZ.jpg)

For our frontend, we can open one more terminal window and run a root-level command:

```bash
npm run dev
```

**Important**
We need to pay attention to the output of this command, and anytime we rerun this command, we will need to get the `contract address` and copy it into the `apps/web/lib/config` file. Let's do that now.

```ts
'0x539': {
    name: 'Localhost 9545',
    contractAddress: "0x485950f7A14140F5561320229CdD7A2B26e39F9E",
    symbol: "ETH",
    blockExplorer: null,
    rpcUrl: `http://localhost:9545`
  },
```

All of the work, from this point, will be done in our `apps/web` directory.

## Connecting Users to MetaMask

Create a directory in `apps/web/components/` named `styledComponents`  
> _We use [Styled Components](https://styled-components.com/docs/basics) for creating React Components that have styling injected..._

Create: `general.js` inside the `styledComponents` directory with the following code:

```ts
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
  margin-top: ${props => props.marginT | 0}em;
  margin-right: ${props => props.marginR | 0}em;
  margin-bottom: ${props => props.marginB | 0}em;
  margin-left: ${props => props.marginL | 0}em;
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
`;
```

Create: `navigation.js` inside the `styledComponents` directory with the following code:

```ts
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
`;

export const Balance = styled.div`
  display: inline-block;
  margin-left: 1em;
`;

export const RightNav = styled.div`
  color: #ddd;
  margin-left: auto;
  line-height: 36px;
  height: 36px;
  width: ${props => (props.widthPixel += "px") || "100%"};
`;
```

Add a `Navigation.tsx` file in the `apps/web/components` directory with the following code:

```tsx
import Link from "next/link";

import { Button, FlexContainer, FlexItem, } from "./styledComponents/general";
import { NavigationView, Balance, RightNav, Logo } from "./styledComponents/navigation";
import { SiEthereum } from 'react-icons/si';

const Navigation = () => {

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

export default Navigation;
```

With our navigation in place, let's update our `pages/index.tsx` using the following code:

```tsx
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

We should see our navigation in the top right corner of our dApp. 
First, we will need to replace the "MM CONNECT BUTTON" text.

We'll set up two [React Hooks](https://react.dev/reference/react) to listen for changes from our MetaMask wallet and keep them in sync with our React dApp.  

Create a new directory in the web app under `apps/web/hooks` and add the following files.

Create a file named `useMetaMask.tsx` with the following code:

```tsx
import React, { type PropsWithChildren } from "react";

type ConnectAction = {
  type: "connect";
  wallet: string;
  balance: string;
  networkId: string;
};
type WrongNetworkAction = {
  type: "wrongNetwork";
  wallet: string;
  balance?: string;
  networkId?: string;
};

type DisconnectAction = { type: "disconnect" };
type PageLoadedAction = {
  type: "pageLoaded";
  isMetaMaskInstalled: boolean;
  wallet: string | null;
  balance: string | null;
  networkId: string | null;
};
type LoadingAction = { type: "loading" };
type IdleAction = { type: "idle" };
type NetworkSwitchedAction = { type: "networkSwitched"; networkId: string };
type Action =
  | ConnectAction
  | DisconnectAction
  | PageLoadedAction
  | LoadingAction
  | IdleAction
  | WrongNetworkAction
  | NetworkSwitchedAction;

type Dispatch = (action: Action) => void;

type Status = "loading" | "idle" | "pageNotLoaded" | "wrongNetwork";

type State = {
  wallet: string | null;
  isMetaMaskInstalled: boolean;
  status: Status;
  networkId: string | null;
  balance: string | null;
};

const initialState: State = {
  wallet: null,
  isMetaMaskInstalled: false,
  status: "loading",
  balance: null,
  networkId: null,
} as const;

function metamaskReducer(state: State, action: Action): State {
  switch (action.type) {
    case "connect": {
      const { wallet, balance, networkId } = action;
      const newState = { ...state, wallet, balance, status: "idle", networkId } as State;
      const info = JSON.stringify(newState);
      window.localStorage.setItem("metamaskState", info);

      return newState;
    }
    case "wrongNetwork": {
      const { wallet, balance, networkId } = action;

      const newState = {
        ... State,
        wallet,
        balance,
        networkId,
        status: "wrongNetwork",
      } as State;

      const info = JSON.stringify(newState);
      window.localStorage.setItem("metamaskState", info);
      return newState;
    }
    case "disconnect": {
      window.localStorage.removeItem("metamaskState");
      if (typeof window.ethereum !== undefined) {
        window.ethereum.removeAllListeners(["accountsChanged"]);
      }
      return { ... State, wallet: null, balance: null, networkId: null };
    }
    case "pageLoaded": {
      const { isMetaMaskInstalled, balance, wallet, networkId } = action;
      return { ... State, isMetaMaskInstalled, status: "idle", wallet, balance, networkId };
    }
    case "loading": {
      return { ...state, status: "loading" };
    }
    case "idle": {
      return { ... State, status: "idle" };
    }
    case "networkSwitched": {
      const { networkId } = action;
      const status =
        networkId === process.env.NEXT_PUBLIC_NETWORK_ID
          ? "idle"
          : "wrongNetwork";
      const newState = { ...state, status, networkId }
      window.localStorage.setItem("metamaskState", JSON.stringify(newState));
      return newState as State;
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

We have used the traditional [reducer pattern](https://kentcdodds.com/blog/the-state-reducer-pattern-with-react-hooks) that handles all of our State for the MetaMask wallet. We have actions for `connect`, `disconnect`, `wrongNetwork`, `pageLoaded` (so that we know when we have access to MetaMask or not), `loading`, `idle`, and `networkSwitched`.  

We utilize [local storage](https://blog.logrocket.com/using-localstorage-react-hooks/) to simulate disconnecting from our dApp for UX purposes.

This brings us to our `useListen` hook that works with `useMetamask`, which returns a [Context Provider](https://react.dev/reference/react/createContext). It updates our components automatically when accounts, balances, or chains/networks have changed in our wallet by dispatching actions in our reducer. Let's create that hook now.

Create a file named `useListen.tsx` in the `apps/web/hooks` directory with the following code:

```tsx
import { isSupportedNetwork } from "../lib/config";
import { useMetaMask } from "./useMetaMask";

export const useListen = () => {
  const { dispatch } = useMetaMask();

  return () => {
    window.ethereum.on("chainChanged", (networkId: string) => {
      dispatch({ type: "networkSwitched", networkId });
    });
    window.ethereum.on("accountsChanged", async (newAccounts: string[]) => {
      if (newAccounts.length > 0) {
        // upon receiving a new wallet, we'll request again the balance to synchronize the UI.
        const newBalance = await window.ethereum!.request({
          method: "eth_getBalance",
          params: [newAccounts[0], "latest"],
        });

        const networkId = await window.ethereum!.request({
          method: "eth_chainId",
        });

        if (isSupportedNetwork(networkId)) {
          dispatch({
            type: "connect",
            wallet: newAccounts[0],
            balance: newBalance,
            networkId,
          });
        } else {
          dispatch({
            type: "wrongNetwork",
            wallet: newAccounts[0],
            balance: newBalance,
            networkId,
          });
        }
      } else {
        // if the length is 0, then the user has disconnected from the wallet UI
        dispatch({ type: "disconnect" });
      }
    });
  };
};
```

With those files in place, we'll wire up our connect, disconnect, and display basic balance information.  

Before we wire up our buttons in our navigation, we need two more files and another hook that will switch the network if the user isn't connected to our network/chainId of choice. We also need to create a component that we can use anywhere in our app to prompt the user to switch the network when we have detected that they are on the wrong network.

Create a file named `useSwitchNetwork.tsx` in the `apps/web/hooks` directory with the following code:

```tsx
import { config, isSupportedNetwork } from "../lib/config";
import { useMetaMask } from "./useMetaMask";


export const useSwitchNetwork = () => {
  const { dispatch } = useMetaMask();
  const networkId = process.env.NEXT_PUBLIC_NETWORK_ID;
  
  if(!isSupportedNetwork(networkId)) {
    throw new Error('Unsupported network')
  };

  const switchNetwork = async () => {
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          chainId: networkId,
          ...(config[networkId].blockExplorer ? {
            blockExplorerUrls: [config[networkId].blockExplorer]
          } : {}),
          chainName: config[networkId].name,
          nativeCurrency: {
            decimals: 18,
            name: config[networkId].name,
            symbol: config[networkId].symbol,
          },
          rpcUrls: [config[networkId].rpcUrl],
        },
      ],
    });
  
    dispatch({
      type: 'networkSwitched',
      networkId
    });
  };

  return {
    switchNetwork
  };
};
```

Create a file named `SwitchNetwork.tsx` in the `apps/web/components` directory with the following code:

```tsx
import { Button } from "./styledComponents/general";
import { useSwitchNetwork } from "../hooks/useSwitchNetwork";

interface ButtonProps {
  textSize?: number;
  marginT?: number;
  marginR?: number;
  marginB?: number;
  marginL?: number;
}

const SwitchNetwork: React.FC<ButtonProps> = ({
  textSize=10, marginT=0, marginR=0, marginB=0, marginL=0
}) => {
  const { switchNetwork } = useSwitchNetwork();
  return (
    <Button {... { textSize, marginT, marginR, marginB, marginL }} onClick={switchNetwork}>
      Switch Chain
    </Button>
  );
};

export default SwitchNetwork;
```

Let's go back to our `Navigation.tsx` file, and replace with the following code:

```tsx
import Link from "next/link";
import { useListen } from "../hooks/useListen";
import { useMetaMask } from "../hooks/useMetaMask";

import { Button, FlexContainer, FlexItem } from "./styledComponents/general";
import { NavigationView, Balance, RightNav, Logo } from "./styledComponents/navigation";
import { SiEthereum } from "react-icons/si";
import SwitchNetwork from "./SwitchNetwork";

const Navigation = () => {
  const { dispatch, state: { status, isMetaMaskInstalled, wallet, balance } }
    = useMetaMask();

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

      const networkId = await window.ethereum!.request({
        method: "eth_chainId",
      });

      if (networkId === process.env.NEXT_PUBLIC_NETWORK_ID) {
        dispatch({ type: "connect", wallet: accounts[0], balance, networkId });
      } else {
        dispatch({
          type: "wrongNetwork",
          wallet: accounts[0],
          balance,
          networkId,
        });
      }
      // register event listener for metamask wallet changes
      listen();
    }
  };

  const handleDisconnect = () => {
    dispatch({ type: "disconnect" });
  };

  const formatAddress = (addr: string) => {
    return `${addr.substring(0, 5)}...${addr.substring(39)}`;
  };

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
              <Button textSize={10} marginR={1} onClick={handleConnect}>
                {status === "loading" ? "loading..." : "Connect Wallet"}
              </Button>
            )}
            {showInstallMetaMask && (
              <Link href="https://metamask.io" target="_blank">
                Install MetaMask
              </Link>
            )}
            <>
              {isConnected && status !== 'wrongNetwork' && (
                <Button textSize={10} marginR={1} onClick={handleDisconnect}>
                  Disconnect
                </Button>
              )}
              {
                status === "wrongNetwork" &&
                <SwitchNetwork {...{ textSize: 10, marginR: 1 }} />
              }
              {!!wallet && (
                <Link
                  className="text_link tooltip-bottom"
                  href={`https://etherscan.io/address/${wallet}`}
                  target="_blank"
                  data-tooltip="Open in Block Explorer"
                >
                  {formatAddress(wallet)}
                </Link>
              )}
              {!!balance && (
                <Balance>
                  {(parseInt(balance) / 1000000000000000000).toFixed(2)} ETH
                </Balance>
              )}
            </>
          </RightNav>
        </FlexItem>
      </FlexContainer>
    </NavigationView>
  );
}

export default Navigation;
```

If we run the frontend, we will still get an error because we have not wrapped the app with our provider.  

Let's go to the `apps/web/pages/_app.tsx` and replace it with the following code:

```tsx
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

We need to change our `apps/web/components/Layout.tsx` as this code will determine: `isMetaMaskInstalled`, and if the Ethereum provider exists or if it is `undefined`, dispatching the proper actions to our context's reducers. 

In the `Layout.tsx` file update the code to the following: 

```tsx
import { PropsWithChildren, useEffect } from "react";
import { useListen } from "../hooks/useListen";
import { useMetaMask } from "../hooks/useMetaMask";
import { instantiateSdk } from "../lib/MetaMaskSdk";

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  const { dispatch } = useMetaMask();
  const listen = useListen();

  useEffect(() => {
    if (typeof window !== undefined) {
      // is window.ethereum is present? indicating a wallet extension
      const ethereumProviderInjected = typeof window.ethereum !== "undefined";
      // Ensure it is MetaMask
      const isMetaMaskInstalled =
        ethereumProviderInjected && Boolean(window.ethereum.isMetaMask);

      const local = window.localStorage.getItem("metamaskState");

      // if user was previously connected, start listening to MetaMask wallet changes
      if (local) {
        listen();
      }

      // local variable could be null if not present in LocalStorage
      const { wallet, balance, networkId } = local
        ? JSON.parse(local)
        : // backup if local storage is empty
          { wallet: null, balance: null, networkId: null };

      instantiateSdk();
      dispatch({ type: "pageLoaded", isMetaMaskInstalled, wallet, balance, networkId });
    }
  }, []);

  return (
    <div className="app-container">
      {children}
    </div>
  );
};
```

Finally, we must add a new file to the `apps/web/lib` directory called `MetaMaskSdk.tsx`.

Once you have created that file, add the following code:

```tsx
import MetaMaskSDK from "@metamask/sdk";

export const instantiateSdk = () => {
  if (typeof window === undefined) {
    return null;
  };

  new MetaMaskSDK();
};
```

The above code will also fix the warnings in our editor for `window` being undefined.

Now our `connect`, `display`, `wrongNetwork`, and `disconnect` functionality should work.  

We need to rename our `apps/web/.env.example` file to `.env` and ensure we have the correct network set:

```bash
#  Use hexadecimal network id '0x539' for localhost, `0x5` for goerli or `0x13881` for mumbai
NEXT_PUBLIC_NETWORK_ID=0x539
# grab from infura dashboard TODO: Delete
NEXT_PUBLIC_INFURA_PROJECT_ID=
```

Let's test our dApp. We should now get the option to install if we don't have the MetaMask extension. Otherwise, we can connect to our imported account, and we will see a balance display and be able to connect and simulate disconnect from the UI.

![](https://imgur.com/61L0S9n.jpg)

## Add Tickets and Minting

Since our app is based on showing the type of NFT tickets available and allowing the user to mint them, we need to add those components directly to the `apps/web/pages/index.ts` page.

We need an array of objects that represent the types of tickets we have to mint (GA & VIP) and their properties, like Event Name and Price in ETH, using this price's basic and hex versions. 

_* Why both? We want to display the value and have the hex value to send to our contract._

On the `index.tx`, we need to update our imports as follows:

```tsx
import type { NextPage } from "next";
import Head from 'next/head';

import { ethers } from "ethers";
import { useMetaMask } from "../hooks/useMetaMask";

import Tickets from "../components/tickets/Tickets";
import Navigation from '../components/Navigation';
```

Next, just under the Mint component declaration, add the following code:

```tsx
  const { state: { networkId } } = useMetaMask();
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

Finally, we will add the actual `<Ticket/>` component and pass this `tickets` array to it; just underneath the `<Navigation/>` component, add the following code: 

```tsx
      <Tickets tickets={tickets} />
```

Now we will create a directory named `tickets` inside `apps/web/components` and add a file called `Tickets.tsx` with the following code:

```tsx
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
  type, event, description, price, priceHexValue
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

With this in place, we must add the styled-components for the `Tickets` page.

In the `apps/web/components/styledComponents` directory, create a page called `tickets.js` and add the following code:

```ts
import styled from 'styled-components';

export const TicketsView = styled.div`
  padding-top: 0em;
  padding-right: 1em;
  padding-bottom: 1em;
  padding-left: 1em;
  border-bottom: 1px solid #333;
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
`;

export const TicketTypeText = styled.h2`
  color: #93cae5;
`;

export const StyledAlert = styled.div`
  border-radius: 6px;
  padding: 0.5em;
  font-size: 10px;
  height: 40px;
  width: 100%;
  word-break: break-word;
  margin: 0.5em 0;
  background-color: #000;
  strong {
    color: #E2761B;
  }
`;
```

With this in place, if we run our dApp, we should see our ticket types with minting buttons (even though they do not work yet).

## Adding Minting Functionality to TicketType Component

We need to add some code to our `Tickets.tsx` page, allowing us to interact with our smart contract.

When we complete this next section, we should be able to call our contract's `mintNFT` function and mint an NFT ticket.

On the `Tickets.tsx` page, we need to replace the existing imports with the following:

```tsx
import { useState } from "react";
import { useRouter } from "next/router";
import { useMetaMask } from "../../hooks/useMetaMask";
import { ETHTickets__factory } from "blockchain";
import { ethers } from "ethers";
import { config, isSupportedNetwork } from "../../lib/config";

import { SiEthereum } from 'react-icons/si';

import { Button, FlexContainer, FlexItem, } from "../styledComponents/general";
import { HeadingText, TicketsView, TicketType, TicketTypeText, StyledAlert } from "../styledComponents/tickets";
```

These imports will give us access to our connected wallet state, the NextJS router so that we can force a page refresh (only after a successful mint), and access to our smart contract through the `ETHTickets__factory` created earlier by our build command, which utilizes *Typechain*, an ethers library to get provider and signer for interacting with the blockchain from our contract methods and the config file which also has access to our `isSupportedNetwork` boolean.

Next, we must destructure our wallet state returned by a call to the `useMetaMask()` hook and define a router with a call to the NextJS `useRouter()` hook.

Starting on line 28 of the `Tickets.tsx` file inside our `TicketsType` component, update that code with the following:

```tsx
  const { state: { wallet }, } = useMetaMask();
  const router = useRouter();
  const [isMinting, setIsMinting] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
```

We need to add a function called `mintTicket()`.

Directly below the code just added and just above the return statement in the `TicketsType` component, add the following code:

```tsx
  const mintTicket = async () => {
    setIsMinting(true);

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // In ethers.js, providers allow you to query data from the blockchain. 
    // They represent the way you connect to the blockchain. 
    // With them, you can only call view methods on contracts and get data from those contracts.
    // Signers are authenticated providers connected to the current address in MetaMask.
    const signer = provider.getSigner();

    const factory = new ETHTickets__factory(signer);
    const networkId = process.env.NEXT_PUBLIC_NETWORK_ID

    if(!isSupportedNetwork(networkId)) {
      throw new Error('Set either `0x5` for goerli or `0x13881` for mumbai in apps/web/.env or .env.local')
    }
    
    const nftTickets = factory.attach(config[networkId].contractAddress);

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
        router.reload();
      })
      .catch((error: any) => {
        console.log(error);
        setError(true);
        setErrorMessage(error?.message);
        setIsMinting(false);
      })
  };

  const cantMint = !Boolean(wallet) && !isMinting;
```

The function above creates an async call on our `nftTickets` factory calling the `mintNFT` function and either running the `then` async function or catching the error. If we succeed, the `then` function will log the transaction after awaiting it and then `setIsMinting` to false using a setter of our React state.

Finally, we will update the button inside the `TicketsType` component's JSX and add a call to the `mintTicket()` function:

```tsx
        <Button disabled={cantMint} onClick={mintTicket}>
          <SiEthereum /> {isMinting ? 'Minting...' : 'Mint'} Ticket
        </Button>
```

We can test our mint functionality now if we are connected to the dApp with our imported test account. Ensure you have your developer tools in your browser open to the console so we can see those logs once we mint. (comment out the `router.reload()` statement to ensure we can see the console messages and uncomment once we are sure it is working).

We should see the following:
```bash
minting accepted
Tickets.tsx?cd6d:55 Minting complete, mined: 0x......
```

With the minting now working, we are ready to make our last changes to display the connected wallet's minted NFTs.

## Add TicketsOwned Component to Minting Page

First, we need to add the styles we will need to display our minted NFTs in a grid at the bottom of the page.  

Create a new file in the `apps/web/components/styledComponents` directory named `ticketsOwned.js` and add the following code:

```ts
import styled from "styled-components";

export const TicketsOwnedView = styled.div`
  padding: 1em;
  border-top: 1px solid #333;
  color: #999;
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

In the `apps/web/pages/index.tsx` file, we need to add one final component named `<TicketsOwned />`. 

Create a `TicketsOwned.tsx` file inside the `apps/web/components/tickets` directory. 

This code that we add will be everything we need to fetch and display our connected user's tickets to our event. Each NFT they have minted will now be visible. This feature of our Smart contract ensures that if they have already minted an NFT through this contract with the same wallet address, they will have a complete view of all of their tickets.

In `TicketsOwned.tsx`, add the following code:

```tsx
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import Image from "next/image";

import { ETHTickets__factory } from "blockchain";
import { config, isSupportedNetwork } from "../../lib/config";
import { useMetaMask } from "../../hooks/useMetaMask";
import SwitchNetwork from "../SwitchNetwork";

import { TicketsOwnedView, Grid, SvgItem } from "../styledComponents/ticketsOwned";

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
  const { state: { wallet: address, networkId } } = useMetaMask();

  useEffect(() => {
    if (typeof window !== "undefined" && address !== null) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const factory = new ETHTickets__factory(signer);

      if (!isSupportedNetwork(networkId)) {
        return;
      }

      const nftTickets = factory.attach(config[networkId].contractAddress);
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
  }, [address, networkId]);

  let listOfTickets = ticketCollection.map((ticket) => (
    <SvgItem pad={4} key={`ticket${ticket.tokenId}`}>
      <Image
        width={200}
        height={200}
        src={ticket.svgImage}
        alt={`Ticket# ${ticket.tokenId}`}
      />
    </SvgItem>
  ));

  return (
    <TicketsOwnedView>
      {isSupportedNetwork(networkId)
        ? <Grid columns={4} itemWidth={210} columnWidth={218}>{listOfTickets}</Grid>
        : <SwitchNetwork {...{ textSize: 10, marginT: 1, marginR: 0, marginB: 0, marginL: 1 }} />
      }
    </TicketsOwnedView>
  );
};

export default TicketsOwned;
```

Each time you mint a new ticket, you should see them displayed as an SVG in a grid format at the bottom of the screen. These are the exact NFTs your users will be minted. We are getting the SVG images directly from the deployed smart contract using the `generateNftSvgByTokenId()` function in our contract which takes a tokenId and builds and returns the SVG just as it is stored on-chain.

After minting a few tickets, our application should look like the following:

![](https://imgur.com/xl7pMPg.jpg)

We have an app that can be tested against the deployed contract to Mumbai or Goerli before going to mainnet. Deploying to mainnet costs real ETH, and we want to find any issues while running against a testnet.

Let's exit our terminal windows, as deploying will be different commands. Let's delete our `apps/blockchain/build` directory and its artifacts to ensure we do everything fresh.

## Deploying to a Testnet

To deploy to a testnet, I am using an Infura account. Set up a free account, find the "Create New API Key" button, choose "Web3 API" and give it a name.

![](https://imgur.com/vnqYWXz.jpg)

Once this is done, you will have an API key that we need to add to both of our `.env` files in our `apps/blockchain` and `apps/web` directories.

Rename those files from `.env.example` to `.env`.  

In our `apps/web/.env` file, we can update the file to include that Infura API key, and we need to change the `NEXT_PUBLIC_INFURA_PROJECT_ID`. 

We will deploy to Polygon Mumbai testnet, using the value `0x13881`.

Your `.env` file should look like this:

```ts
NEXT_PUBLIC_NETWORK_ID=0x13881
NEXT_PUBLIC_INFURA_PROJECT_ID=my_infura_api_key
```

In our `apps/blockchain/.env` file, we can update the file to include that Infura API key for `INFURA_PROJECT_ID`.   

We also need a MetaMask account with test MATIC on the Polygon Mumbai network. Inside MetaMask, switch to the account, and there are three dots to the right of the account address.  

Click on "Account Details" and then "Export Private Key".   

Once you have copied that key (ensure that this is not an account that you use IRL, only for testing), we want to use that for the `PRIVATE_KEY` value.  

Your `.env` file should look like this:

```ts
INFURA_PROJECT_ID=my_infura_api_key
PRIVATE_KEY=my_private_key
```

Remember that your private keys should always be secure, and you should never push these `.env` files to GitHub or share your private key or secret recovery phrase with anyone. Losing these keys or phrases will result in total loss of your wallet or account ownership.

> __*Note that using our private key rather than a passphrase would only expose a single account. When using secret phrases, you can access any account in a wallet.__

### Designating a Deployment Chain

The `NEXT_PUBLIC_NETWORK_ID=0x13881` refers to the Mumbai Network in our `apps/web/lib/config.ts` file.

```ts
  '0x13881': {
    name: 'Mumbai',
    contractAddress: "",
    symbol: "MATIC",
    blockExplorer: "https://mumbai.polygonscan.com",
    rpcUrl: "https://rpc-mumbai.maticvigil.com"
  }
```

Notice that the `contractAddress` is blank. We need to deploy our contract and get that address to plug it into this file.

Open a terminal, and from the root of our project, we will run the deploy command for Mumbai testnet.

```bash
npm run deploy:mumbai --workspace blockchain
```

We only want to run this once, as it will cost the wallet we designated with the private key to deploy our contract.

You will get an output like this:

```bash
   Deploying 'ETHTickets'
   ----------------------
   > transaction hash:    0x21faea4ca99d0acf0df42f16826814fc468d195cd949b6ae4a859c767482fa98
   > Blocks: 3            Seconds: 8
   > contract address:    0x2946A6D0426b906acB09365ba1e69B39F1D9c65C
   ...
   -------------------------------------
   > Total cost:     0.013257367579544205 ETH

Summary
=======
> Total deployments:   1
```

We want to look at the output and copy the `contract address`, and paste that into our `config.ts` file:

```ts
  '0x13881': {
    name: 'Mumbai',
    contractAddress: "0x2946A6D0426b906acB09365ba1e69B39F1D9c65C",
    symbol: "MATIC",
    blockExplorer: "https://mumbai.polygonscan.com",
    rpcUrl: "https://rpc-mumbai.maticvigil.com"
  }
```

Where the contract addresses match.

Our contract is deployed; we need to run another command to test our dApp, this time running against our deployed contract. Understand that when you mint any NFTs from our dApp now, it will cost you real test ETH or MATIC.

```bash
npm run dev:testnet
```

This command knows what testnet we are targeting and will build our dApp accordingly so that we are targeting that chain/network and our contract deployed there.

Ensure that any imported accounts are not connected; here, you can see I am using my test account on the Mumbai network:

![](https://imgur.com/dwnN16q.jpg)

After minting a few NFTS, you can see I now have an updated balance:

![](https://imgur.com/GLpzpVq.jpg)

This concludes our workshop; you could try deploying to Goerli with the same steps or adding more chains/networks to your config file and deploying to a different network. You now have the knowledge and capability with this dApp to do more exploring!

## Thank You for Participating

The MetaMask DevRel team and Eric Bishard at [@httpJunkie](https://twitter.com/httpjunkie) can be contacted on Twitter or Telegram.