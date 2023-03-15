import { useState } from "react";
import { useRouter } from "next/router";
import { useMetaMask } from "../../hooks/useMetaMask";
import { ETHTickets__factory } from "blockchain";
import { ethers } from "ethers";
import { config } from "../../lib/config";

import { SiEthereum } from 'react-icons/si';

import { Button, FlexContainer, FlexItem, } from "../styledComponents/general";
import { HeadingText, TicketsView, TicketType, TicketTypeText, StyledAlert } from "../styledComponents/tickets";

interface Ticket {
  type: string;
  event: string;
  description: string;
  price: string;
  priceHexValue: string;
}
interface TicketsProps {
  tickets: Ticket[];
}

const TicketTypes: React.FC<Ticket> = ({
  type, event, description, price, priceHexValue,
}) => {

  const { state: { wallet }, } = useMetaMask();
  const router = useRouter();
  const [isMinting, setIsMinting] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const mintTicket = async () => {
    setIsMinting(true);

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // In ethers.js, providers allow you to query data from the blockchain. 
    // They represent the way you connect to the blockchain. 
    // With them you can only call view methods on contracts and get data from those contract.
    // Signers are authenticated providers connected to the current address in MetaMask.
    const signer = provider.getSigner();

    const factory = new ETHTickets__factory(signer);
    const nftTickets = factory.attach(config.contractAddress);

    nftTickets
      .mintNFT({
        from: wallet!,
        value: priceHexValue,
      })
      .then(async (tx: any) => {
        console.log('minting accepted')
        await tx.wait(1);
        console.log(`Minting complete, mined: ${tx}`);
        setIsMinting(false);
        router.reload()
      })
      .catch((error: any) => {
        console.log(error);
        setError(true);
        setErrorMessage(error?.message);
        setIsMinting(false);
      })
  };

  const cantMint = !Boolean(wallet) && !isMinting

  return (
    <FlexItem>
      <TicketType>
        <TicketTypeText>{description}</TicketTypeText>
        <p>{event}</p>
        <Button disabled={cantMint} onClick={mintTicket}>
          <SiEthereum /> {isMinting ? 'Minting...' : 'Mint'} Ticket
        </Button>
        {
          error && (
            <StyledAlert onClick={() => setError(false)}>
              <span>
                <strong>Error:</strong> {errorMessage}
              </span>
            </StyledAlert>
          )
        }
      </TicketType>
    </FlexItem>
  );
};

const Tickets = ({ tickets }: TicketsProps) => {
  return (
    <TicketsView>
      <HeadingText>Ticket Types</HeadingText>
      <FlexContainer gap={1}>
        {tickets.map((ticket) => (
          <TicketTypes key={ticket.type} {...ticket} />
        ))}
      </FlexContainer>
    </TicketsView>
  );
};

export default Tickets;