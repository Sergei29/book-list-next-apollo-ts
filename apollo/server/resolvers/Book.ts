import { IResolverFunc } from '../../../types'

export const Book: Record<'author' | 'image', IResolverFunc> = {
  author: async (parent, args, ctx, info) => ctx.dataSources.authors.getAuthorById(parent.authorId),
  image: async (parent, args, ctx, info) => {
    const strImageId = parent.imageId
    if (!strImageId) return null
    const nObjImage = await ctx.dataSources.images.getImageById(strImageId)
    return nObjImage
  },
}
