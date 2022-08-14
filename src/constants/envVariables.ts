export const origin =
  process.env.NODE_ENV !== 'production' ? 'http://localhost:3000' : 'https://book-list-next-apollo-ts.vercel.app'

export const NEXT_PUBLIC_GRAPHQL_URI = process.env.NEXT_PUBLIC_GRAPHQL_URI!

export const NODE_ENV = process.env.NODE_ENV

export const SECRET = process.env.NEXT_PUBLIC_SECRET!
