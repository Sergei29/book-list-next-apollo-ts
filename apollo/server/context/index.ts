import {
  generateAuthorsDataSource,
  generateBooksDataSource,
  generateImagesDataSource,
  generateUsersDataSource,
} from '../../../db'
import { prisma } from '../../../prisma/prisma'
import { Context, TokenPayloadType } from '../../../types'
import { funcVerifyToken } from '../../../util'

export const createContext = async ({ req, res, connection }: any): Promise<Context> => {
  let user: TokenPayloadType | null = null

  if (connection && connection?.context) {
    user = connection.context.user || null
  }

  /**
   * @description decode request cookie token to get user data, set it into context
   */
  if (req && req.cookies.token) {
    const userDecodedData = funcVerifyToken(req.cookies.token)
    user = userDecodedData as TokenPayloadType
  }

  return {
    dataSources: {
      authors: generateAuthorsDataSource(prisma),
      books: generateBooksDataSource(prisma),
      images: generateImagesDataSource(prisma),
      users: generateUsersDataSource(prisma),
    },
    user: null,
    res,
  }
}
