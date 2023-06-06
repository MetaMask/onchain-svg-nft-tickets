import { SiEthereum } from 'react-icons/si'
import { useMetaMask } from '~/hooks/useMetaMask'
import { formatAddress } from '~/utils'
import { isSupportedNetwork } from '~/lib/config'
import SwitchNetwork from '~/components/SwitchNetwork/SwitchNetwork'
import styles from './Navigation.module.css'

export const Navigation = () => {

  const { wallet, isConnecting, connectMetaMask, terminate, sdkConnected } = useMetaMask()
  const networkId = import.meta.env.VITE_PUBLIC_NETWORK_ID
  const supportedNetwork = isSupportedNetwork(networkId)

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
            {!supportedNetwork && (
              <SwitchNetwork />
            )}
            {wallet && (
              <a
                className="text_link tooltip-bottom"
                href={`https://etherscan.io/address/${wallet}`}
                target="_blank"
                data-tooltip="Open in Block Explorer"
              >
                {formatAddress(wallet.address)}
              </a>
            )}
            {wallet && (
              <div className={styles.balance}>
                {wallet.balance} ETH
              </div>
            )}
          </>

        </div>
      </div>
    </div>
  )
}