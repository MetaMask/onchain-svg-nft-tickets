/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, createContext, PropsWithChildren, useContext, useCallback } from 'react'
import { MetaMaskInpageProvider } from '@metamask/providers'
import { MetaMaskSDK } from '@metamask/sdk'
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
  sdkConnected: boolean,
  connectMetaMask: () => void,
  clearError: () => void,
  terminate: () => void
}

const disconnectedState: WalletState = { accounts: [], balance: '', chainId: '' }
const MetaMaskContext = createContext<MetaMaskContextData>({} as MetaMaskContextData)
let _initialized = false;

export const MetaMaskContextProvider = ({ children }: PropsWithChildren) => {
  const [sdk, setSDK] = useState<MetaMaskSDK>()
  const [sdkConnected, setSdkConnected] = useState(false)

  const [isConnecting, setIsConnecting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const clearError = () => setErrorMessage('')

  const [wallet, setWallet] = useState(disconnectedState)

  // useCallback ensures that we don't uselessly re-create the _updateWallet function on every render
  const _updateWallet = useCallback(async (providedAccounts?: any) => {
    console.log("calling updateWallet")
    let accounts: any[] = [];
    try {
      accounts = providedAccounts || await window.ethereum?.request(
        { method: 'eth_accounts' },
      )
    } catch (err) { }

    if (accounts.length === 0) {
      // If there are no accounts, then the user is disconnected
      setWallet(disconnectedState)
      return
    }

    const balanceRaw: string = await window.ethereum?.request({
      method: 'eth_getBalance',
      params: [accounts[0], 'latest'],
    }) as string
    const balance = formatBalance(balanceRaw)

    const chainId:string = await window.ethereum?.request({
      method: 'eth_chainId',
    }) as string

    setWallet({ accounts, balance, chainId })
  }, [])

  const updateWalletAndAccounts = useCallback(() => _updateWallet(), [_updateWallet])
  const updateWallet = useCallback((accounts: any) => _updateWallet(accounts), [_updateWallet])
  const disconnectWallet = useCallback(() => setWallet(disconnectedState), [])

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
      communicationServerUrl: 'https://metamask-sdk-socket.metafi.codefi.network/',
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
    setSDK(clientSDK)
  }, [])

  const terminate = () => {
    console.log("trying to terminate")
    sdk?.terminate()
  }

  /**
   * This logic checks if MetaMask is installed. If it is, then we setup some
   * event handlers to update the wallet state when MetaMask changes. The function
   * returned from useEffect is used as a "clean-up": in there, we remove the event
   * handlers whenever the MetaMaskProvider is unmounted.
   */
  useEffect(() => {
    if (sdk?.isInitialized() && !_initialized) {
      updateWalletAndAccounts()

      window.ethereum?.on('_initialized', updateWalletAndAccounts)
      window.ethereum?.on('connect', updateWalletAndAccounts)
      window.ethereum?.on('_initialized', () => setSdkConnected(true))
      window.ethereum?.on('connect', () => setSdkConnected(true))
      window.ethereum?.on('accountsChanged', updateWallet)
      window.ethereum?.on('chainChanged', updateWalletAndAccounts)
      window.ethereum?.on('disconnect', disconnectWallet)
      window.ethereum?.on('disconnect', () => setSdkConnected(false))

      _initialized = true
    }

    return () => {
      window.ethereum?.removeListener('_initialized', updateWalletAndAccounts)
      window.ethereum?.removeListener('connect', updateWalletAndAccounts)
      window.ethereum?.removeListener('accountsChanged', updateWallet)
      window.ethereum?.removeListener('chainChanged', updateWalletAndAccounts)
      window.ethereum?.removeListener('disconnect', disconnectWallet)
    }
  }, [updateWallet, updateWalletAndAccounts, disconnectWallet, sdk?.isInitialized()])

  return (
    <MetaMaskContext.Provider
      value={{
        wallet,
        error: !!errorMessage,
        errorMessage,
        isConnecting,
        sdkConnected,
        connectMetaMask,
        clearError,
        terminate
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