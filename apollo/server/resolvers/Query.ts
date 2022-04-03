import { IResolverFunc } from '../../../types'

export const Query: Record<string, IResolverFunc> = {
  book: async (parent, args, { dataSources }) => await dataSources.books.getBookById(args.id),

  author: async (parent, args, { dataSources }, info) => await dataSources.authors.getAuthorById(args.id),

  books: async (parent, args, { dataSources }, info) => await dataSources.books.getAllBooks(),

  authors: async (parent, args, { dataSources }, info) => await dataSources.authors.getAllAuthors(),

  me: async (parent, args, { dataSources, user = null }, info) => {
    if (user && user.sub) {
      return dataSources.users.getUserById(user?.sub)
    }
    return undefined
  },

  userById: async (parent, args, { dataSources }, info) => await dataSources.users.getUserById(args.id),

  users: async (parent, args, { dataSources }, info) => await dataSources.users.getAllUsers(),
}
