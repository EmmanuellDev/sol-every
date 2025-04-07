import React, { FC, useCallback, useState } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Keypair, PublicKey, SystemProgram, Transaction } from '@solana/web3.js';
import { MINT_SIZE, TOKEN_PROGRAM_ID, createInitializeMintInstruction, getMinimumBalanceForRentExemptMint, getAssociatedTokenAddress, createMintToInstruction, createAssociatedTokenAccountInstruction } from '@solana/spl-token';
import { PROGRAM_ID, createCreateMetadataAccountInstruction, createCreateMetadataAccountV3Instruction } from '@metaplex-foundation/mpl-token-metadata';
import axios from 'axios';
import { notify } from '../../utils/notifications';
import { ClipLoader } from 'react-spinners';
import { useNetworkConfiguration } from 'contexts/NetworkConfigurationProvider';

import { AiOutlineClose } from "react-icons/ai"
import CreateSVG from "../../components/SVG/CreateSVG";
import Branding from 'components/Branding';
import { InputView } from "../index";

export const CreateView: FC = ({ setOpenCreateModel }) => {
  const { connection } = useConnection();
  const { publickey, sendTransaction } = useWallet;
  const { NetworkConfiguration } = useNetworkConfiguration();

  const [ tokenUri, setTokenUri ] = useState("");
  const [ tokenMintAddress, setTokenMintAddress ] = useState("");
  const [isLoading, setIsLoading ] = useState(false);

  const [token, setToken] = useState({
    name: "",
    symbol: "",
    decimals: "",
    amount: "",
    image: "",
    description: "",
    });

    const handleFormFieldChange = (fieldName, e) => {
      setToken({...token, [fieldName]: e.target.value });
    };

    const createToken = useCallback(async (token) => {
      const lamports = await getMinimumBalanceForRentExemptMint(connection);
      const mintKeypair = Keypair.generate();
      const tokenATA = await getAssociatedTokenAddress(
        mintKeypair.publicKey,
        publickey
      );
    });
  return (
    <div>index</div>
  )
};