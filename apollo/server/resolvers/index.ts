import { ApolloError } from 'apollo-server-errors'
import { IResolver } from '../../../types'
import { Query } from './Query'
import { Mutation } from './Mutation'
import { Author } from './Author'
import { Book } from './Book'

export const resolvers: IResolver = {
  Query,
  Mutation,
  Author,
  Book,
}
