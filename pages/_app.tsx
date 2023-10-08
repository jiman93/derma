import { AppProps } from 'next/app';
import Head from 'next/head';
import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core';

import './index.scss';
import MapSearchProvider from '../store/providers/mapSearch';
import { useLocalStorage } from '@mantine/hooks';
import HeaderBar from '../components/HeaderBar/HeaderBar';

export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'color-scheme',
    defaultValue: 'dark',
  });

  const toggleColorScheme = () =>
    setColorScheme((current) => (current === 'dark' ? 'light' : 'dark'));

  const providerWrapper = (
    <>
      <MapSearchProvider>
        <HeaderBar />
        <Component {...pageProps} />
      </MapSearchProvider>
    </>
  );

  return (
    <>
      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            /** Put your mantine theme override here */
            colorScheme,
          }}
        >
          {providerWrapper}
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
}
