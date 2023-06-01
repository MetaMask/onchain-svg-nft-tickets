import MetaMaskSDK from '@metamask/sdk'
import React, { useEffect, type PropsWithChildren, useState } from 'react'

type ConnectAction = {
  type: 'connect',
  wallet: string,
  balance: string,
  networkId: string,
}
type WrongNetworkAction = {
  type: 'wrongNetwork',
  wallet: string,
  balance?: string,
  networkId?: string,
}

type DisconnectAction = { type: 'disconnect' }
type PageLoadedAction = {
  type: 'pageLoaded',
  isMetaMaskInstalled: boolean,
  wallet: string | null,
  balance: string | null,
  networkId: string | null
}
type LoadingAction = { type: 'loading' }
type IdleAction = { type: 'idle' }
type LogMintAction = { type: 'logMint' }
type NetworkSwitchedAction = { type: 'networkSwitched', networkId: string }
type Action =
  | ConnectAction
  | DisconnectAction
  | PageLoadedAction
  | LoadingAction
  | IdleAction
  | WrongNetworkAction
  | NetworkSwitchedAction
  | LogMintAction

type Dispatch = (action: Action) => void

type Status = 'loading' | 'idle' | 'pageNotLoaded' | 'wrongNetwork' | 'mintSwitch'

type State = {
  wallet: string | null,
  isMetaMaskInstalled: boolean,
  status: Status,
  mints: Number,
  networkId: string | null,
  balance: string | null
};

const initialState: State = {
  wallet: null,
  isMetaMaskInstalled: false,
  status: 'loading',
  mints: 0,
  balance: null,
  networkId: null,
} as const

function metamaskReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'connect': {
      const { wallet, balance, networkId } = action
      const newState = { ...state, wallet, balance, status: 'idle', networkId } as State
      const info = JSON.stringify(newState)
      window.localStorage.setItem('metamaskState', info)

      return newState
    }
    case 'wrongNetwork': {
      const { wallet, balance, networkId } = action

      const newState = {
        ...state,
        wallet,
        balance,
        networkId,
        status: 'wrongNetwork',
      } as State

      const info = JSON.stringify(newState)
      window.localStorage.setItem('metamaskState', info)
      return newState
    }
    case 'disconnect': {
      window.localStorage.removeItem('metamaskState')
      if (typeof window.ethereum !== undefined) {
        window.ethereum?.removeAllListeners('accountsChanged')
      }
      return { ...state, wallet: null, balance: null, networkId: null }
    }
    case 'pageLoaded': {
      const { isMetaMaskInstalled, balance, wallet, networkId } = action
      return { ...state, isMetaMaskInstalled, status: 'idle', wallet, balance, networkId }
    }
    case 'loading': {
      return { ...state, status: 'loading' }
    }
    case 'idle': {
      return { ...state, status: 'idle' }
    }
    case 'networkSwitched': {
      const { networkId } = action
      const status =
        networkId === process.env.NEXT_PUBLIC_NETWORK_ID
          ? 'idle'
          : 'wrongNetwork'
      const newState = { ...state, status, networkId }
      window.localStorage.setItem('metamaskState', JSON.stringify(newState))
      return newState as State
    }
    case 'logMint': {
      const newMints = +state.mints + 1
      return { ...state, mints: newMints }
    }
    default: {
      throw new Error('Unhandled action type')
    }
  }
}

const MetaMaskContext = React.createContext<
  { state: State, dispatch: Dispatch } | undefined
>(undefined)

function MetaMaskProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = React.useReducer(metamaskReducer, initialState)
  const [mmSDK, setSDK] = useState<MetaMaskSDK>();
  const value = { mmSDK, state, dispatch }

  useEffect(() => {
    const clientSDK = new MetaMaskSDK({
      useDeeplink: false,
      //communicationServerUrl: 'https://metamask-sdk-socket.metafi.codefi.network/', 
      //process.env.NEXT_PUBLIC_COMM_SERVER_URL,
      autoConnect: { enable: true },
      dappMetadata: {
        name: "NFT Tickets",
        url: window.location.host,
      },
      logging: { developerMode: false },
      storage: { enabled: true }
    })
    setSDK(clientSDK)
  }, [])

  return (
    <MetaMaskContext.Provider value={value}>
      {children}
    </MetaMaskContext.Provider>
  )
}

function useMetaMask() {
  const context = React.useContext(MetaMaskContext)
  if (context === undefined) {
    throw new Error('useMetaMask must be used within a MetaMaskProvider')
  }
  return context
}

export { MetaMaskProvider, useMetaMask }
