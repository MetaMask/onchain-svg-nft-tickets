export const config = {
  '0x13881': {
    name: 'Mumbai',
    contractAddress: "0x8E6b0b155B66144066D17cd9a42b80dE2259D5E5",
    symbol: "MATIC",
    blockExplorer: "https://mumbai.polygonscan.com/",
    rpcUrl: "https://rpc-mumbai.maticvigil.com/"
  },
  '0x5': {
    name: 'Goerli',
    contractAddress: "0x8E6b0b155B66144066D17cd9a42b80dE2259D5E5",
    symbol: "ETH",
    blockExplorer: 'https://goerli.etherscan.io/',
    rpcUrl: `https://goerli.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_PROJECT_ID}`
  }
};


/**
 * It returns true if the id is a key of the config object
 * @param {string} [id] - The network ID of the network you want to check.
 * @returns A function that takes an id and returns a boolean.
 */
export const isSupportedNetwork = (id?: string): id is keyof typeof config => {
  return !!(id && id in config);
} 