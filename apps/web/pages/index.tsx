import type { NextPage } from 'next'
import Head from 'next/head'

import { ethers } from 'ethers'

import Tickets from '../components/tickets/Tickets'
import Navigation from '../components/Navigation'

import { useMetaMask } from '../hooks/useMetaMask'

const Mint: NextPage = () => {
  // Get ETH as a small number ("0.01" => "10000000000000000")
  const bigNumberify = (amt: string) => ethers.utils.parseEther(amt)

  const { state: { sdkConnected } } = useMetaMask()

  const ethGa = "0.01"
  const ethVip = "0.02"
  const ethGaHex = bigNumberify(ethGa)._hex
  const ethVipHex = bigNumberify(ethVip)._hex
  const tickets = [
    {
      type: "ga",
      event: "ETH Atlantis",
      description: "General Admission",
      price: ethGa,
      priceHexValue: ethGaHex, // '0x2386f26fc10000' *eserialize.com
    },
    {
      type: "vip",
      event: "ETH Atlantis",
      description: "VIP",
      price: ethVip,
      priceHexValue: ethVipHex, // '0x470de4df820000' *eserialize.com
    },
  ]

  return (
    <div className="mint-tickets">
      <Head>
        <title>ETH Atlantis 2022</title>
        <meta property="og:title" content="The largest underwater Ethereum event in history" key="title" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>

      <Navigation />
      <Tickets tickets={tickets} /> 
    </div>
  )
}

export default Mint