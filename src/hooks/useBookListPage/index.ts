import { useState, useCallback } from 'react'

type HookProps = {
  nStrInitialId: null | string
}

type HookReturnType = {
  nStrSelectedBookId: null | string
  handleBookSelect: (strBookId: string) => () => void
  handleBookDeselect: () => void
}

const defaultProps: HookProps = {
  nStrInitialId: null,
}

/**
 * @description custom hook to manage booklist page
 * @returns {Object} current selected book, select/add book handlers
 */
export const useBookListPage = ({ nStrInitialId = null }: HookProps = defaultProps): HookReturnType => {
  const [nStrSelectedBookId, setNStrSelectedBookId] = useState<null | string>(() => nStrInitialId)

  /**
   * @description callback on book click
   * @param {String} strBookId book id
   * @returns {undefined} sets local state
   */
  const handleBookSelect = useCallback((strBookId: string) => () => setNStrSelectedBookId(strBookId), [])

  /**
   * @description callback to deselect a book to none selected
   * @returns {undefined} sets local state
   */
  const handleBookDeselect = useCallback(() => setNStrSelectedBookId(null), [])

  return {
    nStrSelectedBookId,
    handleBookSelect,
    handleBookDeselect,
  }
}
