import Link from "next/link";
import { useListen } from "../hooks/useListen";
import { useMetaMask } from "../hooks/useMetaMask";
import { config, isSupportedNetwork } from "../lib/config";

import { Button, FlexContainer, FlexItem } from "./styledComponents/general";
import {
  NavigationView,
  Balance,
  RightNav,
  Logo,
} from "./styledComponents/navigation";
import { SiEthereum } from "react-icons/si";

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
      // we can register an event listener for changes to the user's wallet
      listen();
    }
  };

  const handleSwitchNetwork = async () => {
    const chainId = process.env.NEXT_PUBLIC_NETWORK_ID
    if(!isSupportedNetwork(chainId)) {
      throw new Error('Unsupported network, change env files')
    }

    const blockExplorer = config[chainId].blockExplorer;

    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          chainId: process.env.NEXT_PUBLIC_NETWORK_ID,
          ...(blockExplorer ? {
            blockExplorerUrls: [config[chainId].blockExplorer]
          } : {}),
          chainName: config[chainId].name,
          nativeCurrency: {
            decimals: 18,
            name: config[chainId].name,
            symbol: config[chainId].symbol,
          },
          rpcUrls: [config[chainId].rpcUrl],
        },
      ],
    });

    dispatch({
      type: 'networkSwitched',
      networkId: chainId
    })
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
              <Button textSize={10} onClick={handleConnect}>
                {status === "loading" ? "loading..." : "Connect Wallet"}
              </Button>
            )}
            {showInstallMetaMask && (
              <Link href="https://metamask.io/" target="_blank">
                Install MetaMask
              </Link>
            )}
            <>
              {isConnected && status !== 'wrongNetwork' && (
                <Button textSize={10} onClick={handleDisconnect}>
                  Disconnect
                </Button>
              )}
              {status === "wrongNetwork" && (
                <Button textSize={10} onClick={handleSwitchNetwork}>
                  Switch Network
                </Button>
              )}
              {!!wallet && (
                <Link
                  className="text_link tooltip-bottom"
                  href={`https://etherscan.io/address/${wallet}`}
                  target="_blank"
                  data-tooltip="Open in Etherscan"
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
