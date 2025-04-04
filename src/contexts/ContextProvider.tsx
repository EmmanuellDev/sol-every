import { WalletAdapterNetwork, WalletError } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider as ReactUIWalletModelProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter, SolflareWalletAdapter, SolletExtensionWalletAdapter, SolletWalletAdapter, TorusWalletAdapter, } from '@solana/wallet-adapter-wallets';
import { Cluster, clusterApiUrl } from '@solana/web3.js';
import { FC, ReactNode, useCallback, useMemo } from 'react';
import { AutoConnectProvider, useAutoConnect } from './AutoConnectProvider';
import { notify} from "../utils/notifications";
import { NetworkConfigurationProvider, useNetworkConfiguration } from './NetworkConfigurationProvider';

const WalletContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { autoConnect } = useAutoConnect();
  const { NetworkConfiguration } = useNetworkConfiguration();
  const network = NetworkConfiguration as WalletAdapterNetwork;

  const originalEndPoint = useMemo(() => clusterApiUrl (network), [network]);

  let endpoint;

  if (network == "mainnet-beta"){
    endpoint = "URL";
  } else if (network == "devnet"){
    endpoint = originalEndPoint;
  } else {
    endpoint = originalEndPoint;
  }

  const wallets = useMemo(() => [
    new PhantomWalletAdapter(),
    new SolletWalletAdapter({ network }),
    new SolletExtensionWalletAdapter({ network }),
    new SolflareWalletAdapter({ network }),
    new TorusWalletAdapter(),
  ],
  [network]
); 

  const onError = useCallback((error: WalletError) => {
    notify({ type: 'error', message: error.message ? `${error.name}: ${error.message}` : error.name, });
    console.error(error);
  }, []);

  return ( <ConnectionProvider endpoint={endpoint}>
    <WalletProvider wallets={wallets} onError={onError} autoConnect={autoConnect}>
      <ReactUIWalletModelProvider>{children}</ReactUIWalletModelProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export const ContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
    <NetworkConfigurationProvider>
      <AutoConnectProvider>
        <WalletContextProvider>{children}</WalletContextProvider>
      </AutoConnectProvider>
    </NetworkConfigurationProvider>
    </>
  );
};