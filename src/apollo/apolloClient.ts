import { ApolloClient, InMemoryCache, InMemoryCacheConfig } from '@apollo/client'

const cacheConfig: InMemoryCacheConfig = {}

export const apolloClient = new ApolloClient({
  // uri: process.env.NEXT_PUBLIC_GRAPHQL_URI,
  uri: 'http://localhost:3000/api/graphql',
  cache: new InMemoryCache(cacheConfig),
})
