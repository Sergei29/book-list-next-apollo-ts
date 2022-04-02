import { Prisma, PrismaClient, PrismaPromise } from '@prisma/client'
import { ApolloError } from 'apollo-server-micro'
import { ObjType, BookDataType, BookType, AuthorDataType, AuthorType, UserDataType, UserType } from '../types'
import { cloudinary } from '../util'

/**
 * @description uploading image file to Cloudinary CDN
 * @param {String} strBase64ImageFile image file
 * @returns {Promise<Object>} promise resolving to response data about image stored in Cloudinary cdn.
 */
const uploadImageToCloudinary = async (strBase64ImageFile: string) => {
  try {
    const objResponse = await cloudinary.uploader.upload(strBase64ImageFile, {
      allowed_formats: ['jpg', 'jpeg', 'png', 'PNG'],
      folder: 'image_list_images',
    })

    const { public_id: publicId, secure_url: imageUrl, width, height, bytes: size } = objResponse

    return {
      publicId,
      imageUrl,
      width,
      height,
      size,
    }
  } catch (error: any) {
    throw new ApolloError(`Image cannot be uploaded to Cloudinary. ${error.message ?? ''}`)
  }
}

/**
 * @description deletes image from Cloudinary CDN
 * @param {String} strPublicId image public ID
 * @returns {Promise<{result: string}>} promise that resolves to {result:'ok'} response type from Cloudinary on success
 */
const deleteImageFromCloudinary = async (strPublicId: string): Promise<{ result: string }> => {
  try {
    return await cloudinary.uploader.destroy(strPublicId)
  } catch (error: any) {
    throw new ApolloError(`Image cannot be deleted from Cloudinary. ${error.message ?? ''}`)
  }
}

/**
 * @description deletes images from Cloudinary CDN by IDs
 * @param {Array} arrImagePublicIds array of images public IDs
 * @returns {Promise<Object>} promise resolving to object bearing info on deleted resources
 */
const deleteManyFromCloudinaryByIds = async (arrImagePublicIds: string[]) => {
  try {
    return await cloudinary.api.delete_resources(arrImagePublicIds)
  } catch (error: any) {
    throw new ApolloError(`the list of images cannot be deleted from Cloudinary. ${error.message ?? ''}`)
  }
}

export const generateBooksDataSource = (prisma: PrismaClient) => ({
  getAllBooks: async () => await prisma.books.findMany(),

  getBookById: async (id: string) =>
    await prisma.books.findUnique({
      where: { id },
    }),

  getBookByName: async (name: string) =>
    await prisma.books.findUnique({
      where: { name },
    }),

  getBooksByAuthorId: async (authorId: string): Promise<any> =>
    await prisma.books.findRaw({
      filter: { authorId: { $eq: authorId } },
    }),
  addNewBook: async (newBook: BookDataType) =>
    await prisma.books.create({
      data: { ...newBook },
    }),
  deleteBookById: async (id: string) =>
    await prisma.books.delete({
      where: { id },
    }),
  deleteBooksByAuthorId: async (authorId: string) =>
    await prisma.books.deleteMany({
      where: { authorId },
    }),
  updateBook: async ({ id, ...restNoteData }: BookType) =>
    await prisma.books.update({
      where: { id },
      data: { ...restNoteData },
    }),
})

export const generateAuthorsDataSource = (prisma: PrismaClient) => ({
  getAllAuthors: async () => await prisma.authors.findMany(),

  getAuthorById: async (id: string) =>
    await prisma.authors.findUnique({
      where: { id },
    }),

  getAuthorByName: async (name: string) =>
    await prisma.authors.findUnique({
      where: { name },
    }),

  addNewAuhtor: async (newAuhtor: AuthorDataType) =>
    await prisma.authors.create({
      data: { ...newAuhtor },
    }),
  deleteAuthorById: async (id: string) =>
    await prisma.authors.delete({
      where: { id },
    }),
  updateAuthor: async ({ id, ...restAuthorData }: AuthorType) =>
    await prisma.authors.update({
      where: { id },
      data: { ...restAuthorData },
    }),
})

export const generateImagesDataSource = (prisma: PrismaClient) => ({
  getAllImages: async () => await prisma.images.findMany(),
  getImageById: async (id: string) =>
    await prisma.images.findUnique({
      where: { id },
    }),
  getImageByPublicId: async (id: string) =>
    await prisma.images.findUnique({
      where: { publicId: id },
    }),

  addNewImage: async (strBase64ImageFile?: string) => {
    if (!strBase64ImageFile) return null
    try {
      const objNewImage = await uploadImageToCloudinary(strBase64ImageFile)
      return await prisma.images.create({
        data: { ...objNewImage },
      })
    } catch (error: any) {
      throw new ApolloError(`the image cannot be saved to database. ${error.message ?? ''}`)
    }
  },

  updateImage: async (strImageId: string, newImageFile?: string) => {
    if (!newImageFile) return
    const nObjExistingImage = await prisma.images.findUnique({
      where: { id: strImageId },
    })

    try {
      if (!!nObjExistingImage) {
        await deleteImageFromCloudinary(nObjExistingImage.publicId)
      }

      const objNewImage = await uploadImageToCloudinary(newImageFile)
      return await prisma.images.create({
        data: { ...objNewImage },
      })
    } catch (error: any) {
      throw new ApolloError(`Failed to update image:  ${error.message ?? ''}`)
    }
  },

  deleteImageById: async (strImageId: string) => {
    try {
      const nObjDeletedImage = await prisma.images.delete({
        where: { id: strImageId },
      })

      if (!!nObjDeletedImage) {
        await deleteImageFromCloudinary(nObjDeletedImage.publicId)
      }

      return nObjDeletedImage
    } catch (error: any) {
      throw new ApolloError(`Failed to delete image from database ${error.message ?? ''}`)
    }
  },

  deleteImagesByIds: async (arrImagesPublicIds: string[]) => {
    try {
      await deleteManyFromCloudinaryByIds(arrImagesPublicIds)
    } catch (error) {
      console.log(error)
    }

    try {
      const arrDeletedImages = await Promise.all(
        arrImagesPublicIds.map((strImageId) => {
          return prisma.images.delete({ where: { publicId: strImageId } })
        }),
      )
      const arrDeletedImageIds: (string | null)[] = arrDeletedImages.map((nObjImage) => nObjImage?.id || null)

      return arrDeletedImageIds
    } catch (error: any) {
      throw new ApolloError(`Failed to delete the images from database ${error.message ?? ''} `)
    }
  },
})

export const generateUsersDataSource = (prisma: PrismaClient) => ({
  getAllUsers: async () => await prisma.users.findMany(),
  getUserById: async (id: string) =>
    await prisma.users.findUnique({
      where: { id },
    }),
  getUserByEmail: async (email: string) =>
    await prisma.users.findUnique({
      where: { email },
    }),
  addNewUser: async (newUser: UserDataType) =>
    await prisma.users.create({
      data: { ...newUser },
    }),
  deleteUserById: async (id: string) =>
    await prisma.users.delete({
      where: { id },
    }),
  updateUser: async ({ id, ...restUserData }: UserType) =>
    await prisma.users.update({
      where: { id },
      data: { ...restUserData },
    }),
})
