import { useCallback } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { GET_ADMIN_AUTHORS, GET_BOOKS, REMOVE_AUTHOR, REMOVE_BOOK } from '../../apollo/client'
import updateAuthorsBooks from '../helpers/updateAuthorsBooks'
import { Author, Book } from '../../types'

/**
 * @description custom hook for admin page logic
 * @returns {Object} admin page data and handler functions
 */
export const useAdminPage = () => {
  const { data: maybeAuthorsData } = useQuery<{ authors: Author[] }>(GET_ADMIN_AUTHORS)

  const [funcRemoveAuthorMutation] = useMutation(REMOVE_AUTHOR)

  const [funcRemoveBook] = useMutation(REMOVE_BOOK)

  const arrAuthors = maybeAuthorsData ? maybeAuthorsData.authors : []

  /**
   * @description callback on click delete author
   * @param {String} strAuthorId author ID
   * @param {String} strAuthorName author name
   * @returns {Function} function that makes api call
   */
  const handleDeleteAuthor = useCallback(
    (strAuthorId: string, strAuthorName: string) => () => {
      const bConfirmDelete = window.confirm(`Are you sure to delete author: ${strAuthorName} ?`)
      if (!bConfirmDelete) return

      funcRemoveAuthorMutation({
        variables: { id: strAuthorId },
        update: (cache, { data: { removeAuthor } }) => {
          const { authors } =
            cache.readQuery<{ authors: Author[] }>({
              query: GET_ADMIN_AUTHORS,
            }) || {}
          const { books } = cache.readQuery<{ books: Book[] }>({ query: GET_BOOKS }) || {}

          cache.writeQuery({
            query: GET_ADMIN_AUTHORS,
            data: {
              authors: authors!.filter((objAuthor) => objAuthor.id !== removeAuthor.id),
            },
          })
          cache.writeQuery({
            query: GET_BOOKS,
            data: {
              books: books!.filter((objBook) => objBook.author!.id !== removeAuthor.id),
            },
          })
        },
      })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  /**
   * @description callback on click delete book from author's book list
   * @param {String} strBookId book ID
   * @param {String} strBookName book name
   * @param {String} strAuthorId author ID
   * @returns {Function} function that makes api call
   */
  const handleDeleteBook = useCallback(
    (strBookId: string, strBookName: string, strAuthorId: string) => () => {
      const bConfirmDelete = window.confirm(`Are you sure to delete book: "${strBookName}" ?`)
      if (!bConfirmDelete) return

      funcRemoveBook({
        variables: { id: strBookId },
        update: (cache, { data: { removeBook } }) => {
          const { books: arrAllBooks } = cache.readQuery<{ books: Book[] }>({ query: GET_BOOKS }) || {}

          const { authors = [] } =
            cache.readQuery<{ authors: Author[] }>({
              query: GET_ADMIN_AUTHORS,
            }) || {}

          cache.writeQuery({
            query: GET_ADMIN_AUTHORS,
            data: {
              authors: updateAuthorsBooks(authors, strAuthorId, removeBook.id),
            },
          })

          if (arrAllBooks) {
            cache.writeQuery({
              query: GET_BOOKS,
              data: {
                books: arrAllBooks.filter((objBook) => objBook.id !== removeBook.id),
              },
            })
          }
        },
      })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  return {
    arrAuthors,
    handleDeleteAuthor,
    handleDeleteBook,
  }
}
