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