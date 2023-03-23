import { Button } from "./styledComponents/general";
import { useSwitchNetwork } from "../utils/switchNetwork";

interface ButtonProps {
  textSize: number;
  marginT: number;
  marginR: number;
  marginB: number;
  marginL: number;
}

const SwitchNetwork: React.FC<ButtonProps> = ({
  textSize, marginT, marginR, marginB, marginL
}) => {
  const { switchNetwork } = useSwitchNetwork();
  return (
    <Button {... { textSize, marginT, marginR, marginB, marginL }} onClick={switchNetwork}>
      Switch Network
    </Button>
  );
};

export default SwitchNetwork;