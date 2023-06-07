import { SiEthereum } from 'react-icons/si'
import { useMetaMask } from '~/hooks/useMetaMask'
import { formatAddress, formatChainAsNum } from '~/utils'
import { config, isSupportedNetwork } from '~/lib/config'
import SwitchNetwork from '~/components/SwitchNetwork/SwitchNetwork'
import styles from './Navigation.module.css'

export const Navigation = () => {

  const { wallet, isConnecting, connectMetaMask, terminate, sdkConnected } = useMetaMask()
  const networkId = import.meta.env.VITE_PUBLIC_NETWORK_ID
  const notSupportedNetwork = wallet.chainId !== networkId

  const chainInfo = config[networkId as keyof typeof config]

  console.log(`notSupportedNetwork: `,notSupportedNetwork)
  console.log(`chainInfo: `,chainInfo)

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
            {wallet.accounts.length > 0 && notSupportedNetwork && (
              <SwitchNetwork />
            )}
            {sdkConnected && (
              <button className={styles.terminate}>Terminate</button>
            )}
            {wallet && wallet.accounts.length > 0 && (
              <>
                <a
                  className="text_link tooltip-bottom"
                  href={chainInfo?.blockExplorer}
                  target="_blank"
                  data-tooltip="Open in Block Explorer"
                >
                  {chainInfo.name}
                </a> &nbsp;| &nbsp;
                <a
                  className="text_link tooltip-bottom"
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