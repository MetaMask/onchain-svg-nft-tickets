import { Button } from "./styledComponents/general";
import { useSwitchNetwork } from "../hooks/useSwitchNetwork";
import { useMetaMask } from "../hooks/useMetaMask";

interface ButtonProps {
  textSize?: number;
  marginT?: number;
  marginR?: number;
  marginB?: number;
  marginL?: number;
}

const SwitchNetwork: React.FC<ButtonProps> = ({
  textSize=10, marginT=0, marginR=0, marginB=0, marginL=0
}) => {
  const { state: { networkId } } = useMetaMask();
  const { switchNetwork } = useSwitchNetwork();
  return (
    <Button {... { textSize, marginT, marginR, marginB, marginL }} onClick={switchNetwork}>
      {networkId === null
        ? <span>Load NFTs</span>
        : <span>Switch Chain</span>
      }
    </Button>
  );
};

export default SwitchNetwork;