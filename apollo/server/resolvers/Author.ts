import { IResolverFunc } from '../../../types'

export const Author: Record<'books', IResolverFunc> = {
  books: async (parent, args, ctx, info) => ctx.dataSources.books.getBooksByAuthorId(parent.id),
}
