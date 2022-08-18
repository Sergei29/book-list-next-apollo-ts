import * as React from 'react'
import { CacheProvider, EmotionCache } from '@emotion/react'
import { ApolloProvider } from '@apollo/client'
import type { AppProps } from 'next/app'
import Head from 'next/head'

import { createEmotionCache } from '@/Theme/createEmotionCache'
import ThemeContainer from '@/containers/ThemeContainer'
import AuthProvider from '@/containers/AuthProvider'
import { apolloClient } from '@/apollo'

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
      <AuthProvider>
        <ApolloProvider client={apolloClient}>
          <ThemeContainer>
            <Component {...pageProps} />
          </ThemeContainer>
        </ApolloProvider>
      </AuthProvider>
    </CacheProvider>
  )
}

export default MyApp
