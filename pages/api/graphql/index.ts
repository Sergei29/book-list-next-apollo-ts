import { ApolloServer } from 'apollo-server-micro'
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'
import schema from '../../../src/apollo/schema'

const apolloServer = new ApolloServer({
  schema,
  context(ctx) {
    return ctx
  },
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
})

const startServer = apolloServer.start()

export default async function handler(req: any, res: any) {
  await startServer
  await apolloServer.createHandler({
    path: '/api/graphql',
  })(req, res)
}

export const config = {
  api: {
    bodyParser: false,
  },
}
