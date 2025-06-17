'use client';

import { ChakraProvider, createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';

const queryClient = new QueryClient();

interface ProvidersProps {
  children: ReactNode;
}

const config = defineConfig({
	theme: {
		tokens: {
			colors: {
				// primary: {
				// 	value: '#2e5672',
				// },
				// secondary: {
				// 	value: '#517d98',
				// },
			},
		},
	},
})

const system = createSystem(defaultConfig, config)

export function Providers({ children }: ProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider value={system}>
        {children}
      </ChakraProvider>
    </QueryClientProvider>
  );
}