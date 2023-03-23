import { useState, useEffect } from "react";
import { ethers } from "ethers";
import Image from "next/image";

import { ETHTickets__factory } from "blockchain";
import { config, isSupportedNetwork } from "../../lib/config";
import { useMetaMask } from "../../hooks/useMetaMask";

import { GridContainer, Grid, SvgItem } from "../styledComponents/ticketsOwned";
import { Button } from "../styledComponents/general";

type NftData = {
  name: string,
  description: string,
  attributes: { trait_type: any, value: any }[],
  owner: string,
  image: string
};

type TicketFormatted = {
  tokenId: string
  svgImage: string
  ticketType:
  { trait_type: any, value: any }
};

const TicketsOwned = () => {
  const [ticketCollection, setTicketCollection] = useState<TicketFormatted[]>([]);
  const { state: { wallet: address , networkId }, dispatch } = useMetaMask();

  useEffect(() => {
    if (typeof window !== "undefined" && address !== null) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const factory = new ETHTickets__factory(signer);

      if(!isSupportedNetwork(networkId)) {
        return;
      }
      
      const nftTickets = factory.attach(config[networkId].contractAddress);

      const ticketsRetrieved: TicketFormatted[] = [];

      nftTickets.walletOfOwner(address).then((ownedTickets) => {
        const promises = ownedTickets.map(async (t) => {
          const currentTokenId = t.toString();
          const currentTicket = await nftTickets.tokenURI(currentTokenId);

          const base64ToString = window.atob(
            currentTicket.replace("data:application/json;base64,", "")
          );
          const nftData: NftData = JSON.parse(base64ToString);

          ticketsRetrieved.push({
            tokenId: currentTokenId,
            svgImage: nftData.image,
            ticketType: nftData.attributes.find(
              (t) => t.trait_type === "Ticket Type"
            ),
          } as TicketFormatted);
        });
        Promise.all(promises).then(() => setTicketCollection(ticketsRetrieved));
      });
    }
  }, [address, networkId]);

  const handleSwitchNetwork = async () => {
    const chainId = process.env.NEXT_PUBLIC_NETWORK_ID
    if(!isSupportedNetwork(chainId)) {
      throw new Error('Unsupported network, change env files')
    }

    const blockExplorer = config[chainId].blockExplorer;

    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          chainId: process.env.NEXT_PUBLIC_NETWORK_ID,
          ...(blockExplorer ? {
            blockExplorerUrls: [config[chainId].blockExplorer]
          } : {}),
          chainName: config[chainId].name,
          nativeCurrency: {
            decimals: 18,
            name: config[chainId].name,
            symbol: config[chainId].symbol,
          },
          rpcUrls: [config[chainId].rpcUrl],
        },
      ],
    });

    dispatch({
      type: 'networkSwitched',
      networkId: chainId
    })
  };

  if (!isSupportedNetwork(networkId)) {
    return (
      <Button textSize={10} onClick={handleSwitchNetwork}>
        Switch Network
      </Button>
    )
  }

  let listOfTickets = ticketCollection.map((ticket) => (
    <SvgItem pad={4} key={`ticket${ticket.tokenId}`}>
      <Image
        width={200}
        height={200}
        src={ticket.svgImage}
        alt={`Ticket# ${ticket.tokenId}`}
      />
    </SvgItem>
  ));

  return (
    <GridContainer>
      <Grid columns={4} itemWidth={210} columnWidth={218}>{listOfTickets}</Grid>
    </GridContainer>
  );
};

export default TicketsOwned;