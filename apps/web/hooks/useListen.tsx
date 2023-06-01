import { isSupportedNetwork } from '../lib/config'
import { useMetaMask } from './useMetaMask'

export const useListen = () => {
  const { dispatch } = useMetaMask()

  return () => {
    window.ethereum?.on('chainChanged', (networkId: string) => {
      dispatch({ type: 'networkSwitched', networkId })
    })
    window.ethereum?.on('accountsChanged', async (newAccounts: string[]) => {
      if (newAccounts.length > 0) {
        // upon receiving a new wallet, we'll request again the balance to synchronize the UI.
        const newBalance = await window.ethereum!.request({
          method: 'eth_getBalance',
          params: [newAccounts[0], 'latest'],
        })

        const networkId = await window.ethereum!.request({
          method: 'eth_chainId',
        })

        if (isSupportedNetwork(networkId as string)) {
          dispatch({
            type: 'connect',
            wallet: newAccounts[0],
            balance: newBalance as string,
            networkId: networkId as string,
          })
        } else {
          dispatch({
            type: 'wrongNetwork',
            wallet: newAccounts[0],
            balance: newBalance as string,
            networkId: networkId as string,
          })
        }
      } else {
        // if the length is 0, then the user has disconnected from the wallet UI
        dispatch({ type: 'disconnect' })
      }
    })
  }
}
