export enum Expiry {
  IN_1_HOUR = 60 * 60 * 1000,
  IN_24_HOURS = 60 * 60 * 24 * 1000,
  IN_7_DAYS = 60 * 60 * 24 * 7 * 1000,
}

export type ObjType = Record<string, any>

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export enum MuiSelectedTheme {
  LIGHT = 'light',
  DARK = 'dark',
}

export type ValidationType = {
  bIsValid: boolean
  strErrorMessage: string
}

export type NewBookFormStateType = {
  name: string
  genre: string
  authorId: string
  addedBy: string
  description: string
  strBase64ImageFile: null | string
}

export type BookDataType = {
  name: string
  genre: string
  authorId: string
  addedBy: string
  description?: string
  imageId?: string
}

export type BookType = {
  id: string
} & BookDataType

export type AuthorDataType = {
  name: string
  age: number
}

export type AuthorType = {
  id: string
} & AuthorDataType

export type UserDataType = {
  email: string
  hash?: string
  role?: Role
  active?: boolean
} & Record<string, any>

export type UserType = {
  id: string
} & UserDataType

export enum ErrorMessage {
  BOOK_EXISTS = 'Book already exists.',
  BOOK_NOT_FOUND = 'Book does not exist.',
  AUTHOR_EXISTS = 'Author already exists.',
  AUTHOR_NOT_FOUND = 'Author does not exist.',
  USER_EXISTS = 'User already exists.',
  USER_ALREADY_ACTIVE = 'User already activated.',
  USER_NOT_FOUND = 'User does not exist.',
  LOGIN_REQUIRED = 'Please login again.',
  WRONG_PASSWORD = 'Wrong password.',
  NOT_ALOWED = 'Action not allowed.',
}

export type TokenPayloadType = {
  email?: string
  role?: Role
} & Record<string, any>

export type EmailContentType = {
  subject: string
  text: string
  html: string
}

// client side types:

export type FormValidationStateType = Readonly<
  Record<'name' | 'genre' | 'authorId' | 'description' | 'strBase64ImageFile', ValidationType>
>

export type Author = {
  id: string
  name?: string | undefined
  age?: number | undefined
  books?: BookType[] | undefined
}
export type ImageType = {
  id: string
  imageUrl: string
}

export type Book = {
  id: string
  name?: string | undefined
  genre?: string | undefined
  author?: Author | undefined
  addedBy?: string | undefined
  description?: string | null | undefined
  image?: ImageType | null
}

export type ObjValidationType = {
  bIsValid: boolean
  strErrorMessage: string
}

export type SignUpFormStateType = {
  email: string
  password: string
  confirm_password: string
}
