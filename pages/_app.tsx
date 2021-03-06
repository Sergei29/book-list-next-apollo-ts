import * as React from 'react'
import { ApolloProvider } from '@apollo/client'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { CacheProvider, EmotionCache } from '@emotion/react'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { apolloClient } from '../apollo/client'
import theme from '../Theme/theme'
import { createEmotionCache } from '../Theme/createEmotionCache'

/**
 * @description  Client-side cache, shared for the whole session of the user in the browser.
 */
const clientSideEmotionCache = createEmotionCache()

type Props = {
  emotionCache?: EmotionCache
} & AppProps

function MyApp(props: Props) {
  const { Component, pageProps, emotionCache = clientSideEmotionCache } = props

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Book list</title>
        <link href="/favicon.ico" rel="icon" />
        <meta content="minimum-scale=1, initial-scale=1, width=device-width" name="viewport" />
      </Head>
      <ThemeProvider theme={theme}>
        <ApolloProvider client={apolloClient}>
          <CssBaseline />
          <Component {...pageProps} />
        </ApolloProvider>
      </ThemeProvider>
    </CacheProvider>
  )
}

export default MyApp
