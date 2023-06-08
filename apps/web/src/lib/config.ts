export const config = {
  '0x13881': {
    name: 'Mumbai',
    contractAddress: '',
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