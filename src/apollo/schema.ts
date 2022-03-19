import { gql } from 'apollo-server-micro'
import { makeExecutableSchema } from 'graphql-tools'

const typeDefs = gql`
  type User {
    id: ID
  }

  type Query {
    getUser: User
  }
`

const resolvers = {
  Query: {
    getUser: () => {
      return {
        id: 'Foo',
      }
    },
  },
}

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

export default schema
