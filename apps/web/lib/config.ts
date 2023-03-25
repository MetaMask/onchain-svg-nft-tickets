export const config = {
  '0x539': {
    name: 'Localhost 9545',
    contractAddress: "",
    symbol: "ETH",
    blockExplorer: null, // leave null for testing
    rpcUrl: `http://localhost:9545`
  },
  '0x5': {
    name: 'Goerli',
    contractAddress: "0x5e5e386F82e6A1a3cd140395CB8E9D3974024dE3",
    symbol: "ETH",
    blockExplorer: 'https://goerli.etherscan.io',
    rpcUrl: `https://goerli.blockpi.network/v1/rpc/public`
  },
  '0x13881': {
    name: 'Mumbai',
    contractAddress: "0x277Fb2217952Aa294a0f3BB37B7E024c2F836940",
    symbol: "MATIC",
    blockExplorer: "https://mumbai.polygonscan.com",
    rpcUrl: "https://rpc-mumbai.maticvigil.com"
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