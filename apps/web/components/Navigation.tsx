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