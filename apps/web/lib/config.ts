export const config = {
  '0x539': {
    name: 'Localhost 9545',
    contractAddress: "0x485950f7A14140F5561320229CdD7A2B26e39F9E",
    symbol: "ETH",
    blockExplorer: null, // leave null for testing
    rpcUrl: `http://localhost:9545`
  },
  '0x5': {
    name: 'Goerli',
    contractAddress: "0x485950f7A14140F5561320229CdD7A2B26e39F9E",
    symbol: "ETH",
    blockExplorer: 'https://goerli.etherscan.io/',
    rpcUrl: `https://goerli.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_PROJECT_ID}`
  },
  '0x13881': {
    name: 'Mumbai',
    contractAddress: "0x485950f7A14140F5561320229CdD7A2B26e39F9E",
    symbol: "MATIC",
    blockExplorer: "https://mumbai.polygonscan.com/",
    rpcUrl: "https://rpc-mumbai.maticvigil.com/"
  }
};


/**
 * It returns true if the id is a key of the config object
 * @param {string} [id] - The network ID of the network you want to check.
 * @returns A function that takes an id and returns a boolean.
 */
export const isSupportedNetwork = (id?: string | null): id is keyof typeof config => {
  return !!(id && id in config);
} 