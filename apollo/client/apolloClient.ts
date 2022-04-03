import { ApolloClient } from '@apollo/client'
import { NEXT_PUBLIC_GRAPHQL_URI } from '../../constants'
import { cache } from './cache'

export const apolloClient = new ApolloClient({
  uri: NEXT_PUBLIC_GRAPHQL_URI,
  cache,
})
