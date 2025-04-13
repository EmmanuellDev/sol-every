import React, { FC, useEffect, useCallback } from 'react';
import useUserSOLBalanceStore from '../../stores/useUserSOLBalanceStore';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL, TransactionSignature } from '@solana/web3.js';
import { notify } from '../../utils/notifications';
import { AiOutlineClose } from "react-icons/ai"

import Branding from '../../components/Branding';

export const AirdropView: FC = ({ setOpenAirdrop }) => {
  const wallet = useWallet();
  const { connection } = useConnection();
  const { publicKey } = useWallet();

  const balance = useUserSOLBalanceStore((s) => s.balance);
  const { getUserSOLBalance } = useUserSOLBalanceStore();

  useEffect(() => {
    if (wallet.publicKey) {
      getUserSOLBalance(wallet.publicKey, connection);
    }
  }, [wallet.publicKey, connection, getUserSOLBalance]);

  const onClick = useCallback(async () => {
    if (!publicKey) {
      notify({
        type: 'error',
        message: 'Sorry Error',
        description: 'Wallet not connected',
      });
      return;
    }

    let signature: TransactionSignature = "";
    try {
      signature = await connection.requestAirdrop(publicKey, LAMPORTS_PER_SOL);
      notify({
        type: 'success',
        message: 'You have successfully claim 1 Airdrop',
        txid: signature,
      });

      const latestBlockhash = await connection.getLatestBlockhash();
      await connection.confirmTransaction({
        blockhash: latestBlockhash.blockhash,
        lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
        signature,
      });

      getUserSOLBalance(publicKey, connection);
    } catch (error: any) {
      notify({
        type: 'error',
        message: 'Airdrop failed',
        description: error?.message,
        txid: signature,
      });
    }
  }, [publicKey, connection, getUserSOLBalance]);

      const CloseModal = () => (
        <a onClick={() => setOpenContact(false)} className='group mt-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/20 backdrop-blur-2xl transition-all duration-500 hover:bg-blue-600/60'>
          <i className='text-2xl text-white group-hover:text-white'>
            <AiOutlineClose />
          </i>
        </a>
      );

  return (
    <>
    <section className='flex w-full items-center py-6 px-0 lg:h-screen lg:p-10'>
    <div className='container'>
      <div className='bg-default-950/40 mx-auto max-w-5xl overflow-hidden rounded-2xl backdrop-blur-2xl'>
      <div className='grid gap-10 lg:grid-cols-2'>
      <Branding image="auth-img" title="To Build your solana token creator" message="Try and create your first ever solana project, and if you want to master blockchain development then check the course" />
          <div className='lg:ps-0 flex h-full flex-col p-10'>
        <div className='pb-10'>
          <a className='flex'>
            <img src='assets/images/logo1.png' alt='logo' className='h-10'/>
          </a>
        </div>
        <div className='my-auto pb-6 text-center'>
          <h4 className='mb-4 text-2xl font-bold text-white'>
            Send email to us for more details
          </h4>
          <p className='text-default-300 mx-auto mb-5 max-w-sm'>
            Send your message, so we can provide you more details
          </p>
        <div className='text-start'>
          <form onSubmit={handleSubmit}>
            <div className='mb-4'>
              <label htmlFor='email' className='text-base/normal text-default-200 mb-2 block font-semibold'>Email</label>
              <input type='email' id='email' name='email' className='border-default-200 block w-full rounded border-white/10 bg-transparent py-1.5 px-3 text-white/80 focus:border-white/25 focus:ring-transparent' placeholder='email'></input>
            </div>
            <ValidationError prefix='Email' field='email' errors={state.errors} />
            <textarea name='message' id='message' rows="6" className='border-default-200 relative block w-full rounded border-white/10 bg-transparent py-1.5 px-3 text-white/80 focus:border-white/25 focus:ring-transparent' placeholder='message'></textarea>
            <ValidationError prefix='Message' field='message' errors={state.errors} />
          </form>
            <div className='mb-6 text-center'>
              <button type='submit' disabled={state.submitting} className='bg-primary-600/90 hover:bg-primary-600 group mt-5 inline-flex w-full items-center justify-center rounded-lg px-6 py-2 text-white backdrop-blur-2xl transition-all duration-500'>
                <span className='fw-bold'>Send Message</span>
              </button>
              <CloseModal />
            </div>
          </div>
          </div>
        </div>
      </div>
      </div>
      </div>
</section>
    </>
  );
};