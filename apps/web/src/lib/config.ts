// import ETHTickets from '~/lib/contract-abis/ETHTickets.json'

export const config = {
  '0x539': {
    name: 'Localhost 9545',
    contractAddress: '',
    symbol: 'ETH',
    blockExplorer: null, // leave null for testing
    rpcUrl: `http://localhost:9545`,
  },
  '0x5': {
    name: 'Goerli',
    contractAddress: '',
    symbol: 'ETH',
    blockExplorer: 'https://goerli.etherscan.io',
    rpcUrl: `https://goerli.blockpi.network/v1/rpc/public`,
  },
  '0x13881': {
    name: 'Mumbai',
    contractAddress: '0x313E65fE579D6882c5D495305A28174733CbDf06',// ETHTickets.networks[0x13881].address,
    symbol: 'MATIC',
    blockExplorer: 'https://mumbai.polygonscan.com',
    rpcUrl: 'https://rpc-mumbai.maticvigil.com',
  },
  '0xe704': {
    name: 'Linea',
    contractAddress: '',
    symbol: 'LineaETH',
    blockExplorer: 'https://explorer.goerli.linea.build',
    rpcUrl: 'https://rpc.goerli.linea.build',
  },
}

/**
 * It returns true if the id is a key of the config object
 * @param {string} [id] - The network ID of the network you want to check.
 * @returns A function that takes an id and returns a boolean.
 */
export const isSupportedNetwork = (id?: string | null): id is keyof typeof config => {
  if (!id) {
    return false
  }
  const networkId = id.startsWith('0x') ? id : `0x${Number(id).toString(16)}`
  return !!(networkId in config && import.meta.env.VITE_PUBLIC_NETWORK_ID === networkId)
} 