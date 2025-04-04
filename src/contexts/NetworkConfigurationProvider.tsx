import { useLocalStorage } from "@solana/wallet-adapter-react";
import { FC, createContext, ReactNode, useContext } from "react";

export interface NetworkConfigurationContextState {
    networkConfiguration: string;
    setNetworkConfiguration: (networkConfiguration: string) => void;
}

export const NetworkConfigurationContext = createContext<NetworkConfigurationContextState>({
    networkConfiguration: "devnet",
    setNetworkConfiguration: () => console.warn("No NetworkConfigurationProvider found"),
});

export function useNetworkConfiguration(): NetworkConfigurationContextState {
    return useContext(NetworkConfigurationContext);
}

export const NetworkConfigurationProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [networkConfiguration, setNetworkConfiguration] = useLocalStorage<string>(
        "network",
        "devnet"
    );

    return (
        <NetworkConfigurationContext.Provider value={{ networkConfiguration, setNetworkConfiguration }}>
            {children}
        </NetworkConfigurationContext.Provider>
    );
};