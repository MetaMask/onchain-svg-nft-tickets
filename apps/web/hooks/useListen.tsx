import { MetaMaskInpageProvider } from '@metamask/providers'
import { MetaMaskSDK } from '@metamask/sdk'
import { ConnectionStatus, EventType, ServiceStatus } from '@metamask/sdk-communication-layer'

import { useEffect, useState } from 'react'
import { isSupportedNetwork } from '../lib/config'
import { useMetaMask } from './useMetaMask'


declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
  }
}

let _initialized = false;

export const useListen = () => {
  const [sdk, setSDK] = useState<MetaMaskSDK>()
  const [serviceStatus, setServiceStatus] = useState<ServiceStatus>()

  // const connect = () => {
  //   if (!window.ethereum) {
  //     throw new Error(`invalid ethereum provider`)
  //   }
  //   window.ethereum
  //     .request({
  //       method: "eth_requestAccounts",
  //       params: [],
  //     })
  //     .then((accounts) => {
  //       if (accounts) {
  //         console.debug(`connect:: accounts result`, accounts)
  //         setAccount((accounts as string[])[0]);
  //         setConnected(true);
  //       }
  //     })
  //     .catch((e) => console.log("request accounts ERR", e))
  // }

  const { dispatch } = useMetaMask()

  useEffect(() => {
    const clientSDK = new MetaMaskSDK({
      useDeeplink: false,
      communicationServerUrl: 'https://metamask-sdk-socket.metafi.codefi.network/', 
      //process.env.NEXT_PUBLIC_COMM_SERVER_URL,
      autoConnect: { enable: true },
      dappMetadata: {
        name: 'NFT Tickets',
        url: window.location.host,
      },
      logging: { developerMode: false },
      storage: { enabled: true }
    })
    setSDK(clientSDK)
  }, [])

  useEffect(() => {
    console.debug(`App::useEffect window.ethereum listeners`);
    console.log('selectedAddress: ', window.ethereum?.selectedAddress)

    if (sdk?.isInitialized() && !_initialized) {
      console.debug(`SDK initialized!`)

      window.ethereum?.on('_initialized', () => {
        console.debug(`App::useEffect on _initialized`)
        dispatch({ type: 'sdkHasConnected', connected: true })
      })

      window.ethereum?.on('connect', (_connectInfo) => {
        console.log(`App::useEfect on 'connect'`, _connectInfo);
        dispatch({ type: 'sdkHasConnected', connected: true })
      })

      window.ethereum?.on('disconnect', (error) => {
        console.log(`App::useEfect on 'disconnect'`, error)
        dispatch({ type: 'sdkHasConnected', connected: false })
      })

      sdk?.on(EventType.SERVICE_STATUS, (_serviceStatus: ServiceStatus) => {
        console.debug(`sdk connection_status`, _serviceStatus);
        setServiceStatus(_serviceStatus)
      })

    _initialized = true;
    }
  }, [sdk, dispatch])

  const terminate = () => {
    sdk?.terminate();
  }

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
