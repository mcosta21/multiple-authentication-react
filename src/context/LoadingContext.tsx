import { createContext, useState } from "react";

interface LoadingContextData {
    isLoading: boolean,
    setIsLoading: (value: boolean) => void;
}

interface LoadingProviderProps {
    children: React.ReactNode
}

export const LoadingContext = createContext<LoadingContextData>(
    { } as LoadingContextData,
);

export function LoadingProvider({ children }: LoadingProviderProps) {
    const [isLoading, setLoading] = useState<boolean>(false);

    function setIsLoading(value: boolean) {
        setLoading(value);
    }
    
    return (
        <LoadingContext.Provider
            value={{ isLoading, setIsLoading }}
        >
            {children}
        </LoadingContext.Provider>
    );
}
