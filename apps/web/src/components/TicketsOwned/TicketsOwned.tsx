import { useState, useEffect } from 'react'
import { ethers } from 'ethers'

import { ETHTickets__factory } from 'blockchain'
import { config, isSupportedNetwork } from '../../lib/config'
import { useMetaMask } from '../../hooks/useMetaMask'
import styles from './TicketsOwned.module.css'

type NftData = {
  name: string,
  description: string,
  attributes: { trait_type: string, value: string }[],
  owner: string,
  image: string
}

type TicketFormatted = {
  tokenId: string,
  svgImage: string,
  ticketType: { trait_type: string, value: string }
}

const TicketsOwned = () => {
  const [ticketCollection, setTicketCollection] = useState<TicketFormatted[]>([])
  const { wallet } = useMetaMask()

  console.log('TicketsOwned wallet: ', wallet)

  useEffect(() => {
    if (typeof window !== 'undefined' && wallet.address !== null && window.ethereum) {

      const provider = new ethers.providers.Web3Provider(
        window.ethereum as unknown as ethers.providers.ExternalProvider,
      )
      const signer = provider.getSigner()

      console.log('TicketsOwned provider: ', provider)

      const factory = new ETHTickets__factory(signer)
      console.log('TicketsOwned factory: ', factory)

      if (!isSupportedNetwork(wallet.chainId)) {
        return
      }

      console.log('TicketsOwned wallet.chainId: ', wallet.chainId)

      const nftTickets = factory.attach(config[wallet.chainId].contractAddress)
      const ticketsRetrieved: TicketFormatted[] = []

      console.log('TicketsOwned nftTickets: ', nftTickets)

      nftTickets.walletOfOwner(wallet.address).then((ownedTickets) => {
        const promises = ownedTickets.map(async (t) => {
          const currentTokenId = t.toString()
          const currentTicket = await nftTickets.tokenURI(currentTokenId)

          const base64ToString = window.atob(
            currentTicket.replace('data:application/json;base64,', ''),
          )
          const nftData: NftData = JSON.parse(base64ToString)

          ticketsRetrieved.push({
            tokenId: currentTokenId,
            svgImage: nftData.image,
            ticketType: nftData.attributes.find(
              (t) => t.trait_type === 'Ticket Type',
            ),
          } as TicketFormatted)
        })
        Promise.all(promises).then(() => setTicketCollection(ticketsRetrieved))
      })
    }
  }, [wallet.address, wallet.chainId])

  const listOfTickets = ticketCollection.map((ticket) => (
    <div className={styles.svgItem} key={`ticket${ticket.tokenId}`}>
      <img
        width={200}
        height={200}
        src={ticket.svgImage}
        alt={`Ticket# ${ticket.tokenId}`}
      />
    </div>
  ))

  console.log('TicketsOwned listOfTickets: ', listOfTickets)

  return (
    <div className={styles.ticketsOwnedView}>
      <div className={styles.ticketGrid}>{listOfTickets}</div>
    </div>
  )
}

export default TicketsOwned