import React, { FC, useState, useCallback } from 'react';
import { useConnection } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import { Metadata, PROGRAM_ID } from '@metaplex-foundation/mpl-token-metadata';
import { AiOutlineClose} from "react-icons/ai";
import { ClipLoader } from 'react-spinners';
import { notify } from '../../utils/notifications';

import { InputView } from '../input';
import Branding from '../../components/Branding';

export const TokenMetadata: FC = ({ setOpenTokenMetaData }) => {
  const { connection } = useConnection();
  const [tokenAddress, setTokenAddress] = useState('');
  const [tokenMetadata, setTokenMetaData] = useState(null);
  const [logo, setLogo] = useState('');
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);

  const getMetadata = useCallback(async (form) => {
    setIsLoading(true);

    try {
      const tokenMint = new PublicKey(form);
      const metadataPDA = PublicKey.findProgramAddressSync([
        Buffer.from("metadata"),
        PROGRAM_ID.toBuffer(),
        tokenMint.toBuffer(),
      ], PROGRAM_ID)[0];

      const metadataAccount = await connection.getAccountInfo(metadataPDA);
      const [metadata, _] = await Metadata.deserialize(metadataAccount.data);

      let logoRes = await fetch(metadata.data.uri);
      let logoJson = await logoRes.json();
      let { image } = logoJson;

      setTokenMetadata({ tokenMetadata, ...metadata.data });
      setLogo( image );
      setIsLoading(false);
      setLoaded(true);
      setTokenAddress("");
      notify({ type: 'success', message: 'Token Metadata fetched successfully!' });
    } catch (error: any) {
      notify({ type: 'error', message: 'Token Metadata Failed' });
      setIsLoading(false)
    }
  }, [tokenAddress]);

  const CloseModal = () => {
    
  }

  return (
    <div>index</div>
  );
};