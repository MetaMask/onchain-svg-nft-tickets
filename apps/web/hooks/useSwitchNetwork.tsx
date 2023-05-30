import { config, isSupportedNetwork } from '../lib/config'
import { useMetaMask } from './useMetaMask'


export const useSwitchNetwork = () => {
  const { dispatch } = useMetaMask()
  const networkId = process.env.NEXT_PUBLIC_NETWORK_ID

  const switchNetwork = async () => {
    if(!isSupportedNetwork(networkId)) {
      throw new Error('Unsupported network')
    }
  
    await window.ethereum?.request({
      method: 'wallet_addEthereumChain',
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
    })
  
    dispatch({
      type: 'networkSwitched',
      networkId
    })
  }

  return {
    switchNetwork
  }
}
