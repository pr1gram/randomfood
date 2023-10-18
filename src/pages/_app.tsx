import * as React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import theme from '@/config/theme';
import createEmotionCache from '@/config/createEmotionCache';
import "@/styles/globals.css";
import { AuthProvider } from "tucmc-auth";
import Navbar from "@/components/navbar/navbar";
import { StyledEngineProvider } from "@mui/material";

const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <AuthProvider TOKEN="tYjFVdtj_5jlF8GhpZ3QF49moVTNXRM6TzB4axMNADs=">
        <Navbar />
        <Component {...pageProps} />
      </AuthProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}
