import { ApolloClient, InMemoryCache, InMemoryCacheConfig } from '@apollo/client'
import { NEXT_PUBLIC_GRAPHQL_URI } from '../../constants'

const cacheConfig: InMemoryCacheConfig = {}

export const apolloClient = new ApolloClient({
  uri: NEXT_PUBLIC_GRAPHQL_URI,
  cache: new InMemoryCache(cacheConfig),
})
