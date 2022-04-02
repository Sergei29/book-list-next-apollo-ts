import { ApolloClient, InMemoryCache, InMemoryCacheConfig } from '@apollo/client'

const cacheConfig: InMemoryCacheConfig = {}

export const apolloClient = new ApolloClient({
  uri: '/api/graphql',
  cache: new InMemoryCache(cacheConfig),
})
