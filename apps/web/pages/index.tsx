import type { NextPage } from "next";
import Head from 'next/head';

const Mint: NextPage = () => {

  return (
    <div className="mint-tickets">
      <Head>
        <title>ETH Atlantis 2022</title>
        <meta property="og:title" content="The largest underwater Ethereum event in history" key="title" />
      </Head>

      <div className="frame">
        <span className="text-gradient">Lets Build in Web3</span>
      </div>
    </div>
  );
};

export default Mint;
