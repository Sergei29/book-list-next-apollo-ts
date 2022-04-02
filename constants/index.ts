export const origin =
  process.env.NODE_ENV !== 'production' ? 'http://localhost:3000' : 'https://book-list-next-apollo-ts.vercel.app'

export const NEXT_PUBLIC_GRAPHQL_URI = process.env.NEXT_PUBLIC_GRAPHQL_URI!

export const NODE_ENV = process.env.NODE_ENV

export const DATABASE_URL = process.env.DATABASE_URL!

export const ADMIN_EMAIL = process.env.ADMIN_EMAIL!

export const ADMIN_EMAIL_PASSWORD = process.env.ADMIN_EMAIL_PASSWORD!

export const SECRET = process.env.SECRET!

export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY!

export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET!

export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME!
