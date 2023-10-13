import '@mantine/core/styles.css';

import { AppProps } from 'next/app';
import { createTheme, MantineProvider } from '@mantine/core';

import './index.scss';
import MapSearchProvider from '../store/providers/mapSearch';
import HeaderBar from '../components/HeaderBar/HeaderBar';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  const theme = createTheme({
    /** Put your mantine theme override here */
  });

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
      <MantineProvider defaultColorScheme="dark">{providerWrapper}</MantineProvider>
    </>
  );
}
