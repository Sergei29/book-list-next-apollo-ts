import { generateDataSource } from '../db'

export type Note = {
  id: string
  title: string
  description: string
}

export type Context = {
  dataSource: ReturnType<typeof generateDataSource>
}

export type ObjType = Record<string, any>

export type IResolverFunc = (parent: ObjType, args: ObjType, ctx: Context, info: ObjType) => Promise<any> | any

export type IResolver = {
  Query: Record<string, IResolverFunc>
  Mutation: Record<string, IResolverFunc>
}
