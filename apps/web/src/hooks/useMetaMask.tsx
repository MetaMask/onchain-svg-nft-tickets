/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, createContext, PropsWithChildren, useContext, useCallback } from 'react'

import { MetaMaskSDK } from '@metamask/sdk'
import { MetaMaskInpageProvider } from '@metamask/providers'
import { formatBalance } from '~/utils'

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
  }
}

interface WalletState {
  accounts: any[],
  balance: string,
  chainId: string
}

interface MetaMaskContextData {
  wallet: WalletState,
  error: boolean,
  errorMessage: string,
  isConnecting: boolean,
  connected: boolean,
  connectMetaMask: () => void,
  clearError: () => void
}

const disconnectedState: WalletState = { accounts: [], balance: '', chainId: '' }
const MetaMaskContext = createContext<MetaMaskContextData>({} as MetaMaskContextData)
let _initialized = false;

export const MetaMaskContextProvider = ({ children }: PropsWithChildren) => {
  const [sdk, setSDK] = useState<MetaMaskSDK>()
  const [connected, setConnected] = useState(false)

  const [isConnecting, setIsConnecting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const clearError = () => setErrorMessage('')

  const [wallet, setWallet] = useState(disconnectedState)

  // useCallback ensures that we don't uselessly re-create the _updateWallet function on every render
  const _updateWallet = useCallback(async (providedAccounts?: any) => {
    const accounts = providedAccounts || await window.ethereum?.request(
      { method: 'eth_accounts' },
    )

    if (accounts.length === 0) {
      // If there are no accounts, then the user is disconnected
      setWallet(disconnectedState)
      return
    }

    const balance = formatBalance(await window.ethereum?.request({
      method: 'eth_getBalance',
      params: [accounts[0], 'latest'],
    }))
    const chainId = await window.ethereum?.request({
      method: 'eth_chainId',
    })

    setWallet({ accounts, balance, chainId })
  }, [])

  const updateWalletAndAccounts = useCallback(() => _updateWallet(), [_updateWallet])
  const updateWallet = useCallback((accounts: any) => _updateWallet(accounts), [_updateWallet])

  const connectMetaMask = async () => {
    setIsConnecting(true)

    try {
      const accounts = await window.ethereum?.request({
        method: 'eth_requestAccounts',
      })
      clearError()
      updateWallet(accounts)
    } catch (err: any) {
      setErrorMessage(err.message)
    }
    setIsConnecting(false)
  }

  useEffect(() => {
    const clientSDK = new MetaMaskSDK({
      useDeeplink: false,
      communicationServerUrl: import.meta.env.VITE_PUBLIC_COMM_SERVER_URL,
      autoConnect: {
        enable: true
      },
      dappMetadata: {
        name: "NFT Tickets",
        url: window.location.host,
      },
      logging: {
        developerMode: false,
      },
      storage: {
        enabled: true,
      }
    })
    setSDK(clientSDK);
  }, [])

  /**
   * This logic checks if MetaMask is installed. If it is, then we setup some
   * event handlers to update the wallet state when MetaMask changes. The function
   * returned from useEffect is used as a "clean-up": in there, we remove the event
   * handlers whenever the MetaMaskProvider is unmounted.
   */
  useEffect(() => {
    updateWalletAndAccounts()
    window.ethereum?.on('accountsChanged', updateWallet)
    window.ethereum?.on('chainChanged', updateWalletAndAccounts)

    return () => {
      window.ethereum?.removeListener('accountsChanged', updateWallet)
      window.ethereum?.removeListener('chainChanged', updateWalletAndAccounts)
    }
  }, [updateWallet, updateWalletAndAccounts])

  useEffect(() => {
    if (sdk?.isInitialized() && !_initialized) {
      window.ethereum?.on('_initialized', () => {
        setConnected(true)
      })
      window.ethereum?.on('connect', (_connectInfo: any) => {
        setConnected(true)
      })
      window.ethereum?.on("disconnect", (error) => {
        setConnected(false)
      })
      _initialized = true;
    }

  }, [sdk])

  return (
    <MetaMaskContext.Provider
      value={{
        wallet,
        error: !!errorMessage,
        errorMessage,
        isConnecting,
        connected,
        connectMetaMask,
        clearError,
      }}
    >
      {children}
    </MetaMaskContext.Provider>
  )
}

export const useMetaMask = () => {
  const context = useContext(MetaMaskContext)
  if (context === undefined) {
    throw new Error('useMetaMask must be used within a "MetaMaskContextProvider"')
  }
  return context
}