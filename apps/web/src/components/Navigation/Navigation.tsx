import { SiEthereum } from 'react-icons/si'
import { useMetaMask } from '~/hooks/useMetaMask'
import { formatAddress, formatChainAsNum } from '~/utils'
import { config } from '~/lib/config'
import SwitchNetwork from '~/components/SwitchNetwork/SwitchNetwork'
import styles from './Navigation.module.css'

export const Navigation = () => {

  const { wallet, isConnecting, connectMetaMask, sdkConnected } = useMetaMask()
  const networkId = import.meta.env.VITE_PUBLIC_NETWORK_ID
  const notSupportedNetwork = wallet.chainId !== networkId

  const chainInfo = config[networkId as keyof typeof config]

  return (
    <div className={styles.navigation}>
      <div className={styles.flexContainer}>
        <div className={styles.leftNav}>
          <SiEthereum /> ETH Atlantis
        </div>
        <div className={styles.rightNav}>
          {window.ethereum?.isMetaMask && wallet.accounts.length < 1 &&
            <button disabled={isConnecting} onClick={connectMetaMask}>
              Connect MetaMask
            </button>
          }
          <>
            {/* {wallet.accounts.length > 0 &&
              <span>{sdkConnected ? "MOBILE" : "EXTENSION"} &nbsp;</span>
            } */}
            {wallet.accounts.length > 0 && notSupportedNetwork && (
              <SwitchNetwork />
            )}
            {wallet && wallet.accounts.length > 0 && (
              <>
                <a
                  href={`${chainInfo?.blockExplorer}/address/${chainInfo?.contractAddress}`}
                  target="_blank"
                  data-tooltip="Open in Block Explorer"
                >
                  {chainInfo.name}
                </a> &nbsp;| &nbsp;
                <a
                  href={`https://etherscan.io/address/${wallet}`}
                  target="_blank"
                  data-tooltip="Open in Block Explorer"
                >
                  {formatAddress(wallet.address)}
                </a>
                <div className={styles.balance}>
                  {wallet.balance} ETH
                </div>
              </>
            )}
          </>
        </div>
      </div>
    </div>
  )
}