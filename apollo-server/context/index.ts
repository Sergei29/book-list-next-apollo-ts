import { generateDataSource } from '../../db'
import { prisma } from '../../prisma/prisma'
import { Context } from '../../src/types'

export async function createContext({ req, res }: any): Promise<Context> {
  return {
    dataSource: generateDataSource(prisma),
  }
}
