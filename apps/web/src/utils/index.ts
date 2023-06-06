export const formatBalance = (rawBalance: string) => {
  const balance: string = (parseInt(rawBalance) / 1000000000000000000).toFixed(2)
  return balance
}

export const formatChainAsNum = (chainIdHex: string) => {
  const chainIdNum: number = parseInt(chainIdHex)
  return chainIdNum
}

export const formatAddress = (addr: string) => {
  const newString = `${addr.substring(0, 8)}...`
  return newString
}