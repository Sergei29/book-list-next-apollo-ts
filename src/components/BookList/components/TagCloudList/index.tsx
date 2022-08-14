import React, { memo } from 'react'
import { Box } from '@mui/material'
import { TagCloud } from 'react-tagcloud'
import { useCurrentTheme } from '../../../../hooks'
import { Book } from '../../../../types'

/**
 * @description formatting array, inteerface adaptor func
 * @param {array} arrBookList book index list
 * @returns {array} same book index with adaprted interface for tagcoud to consume
 */
const formatBooks = (arrBookList: Book[]) =>
  arrBookList.map((book) => ({
    value: book.name || 'Book title',
    count: Math.round(5 * Math.random()),
    key: book.id,
  }))

type Props = {
  arrBooks: Book[]
  onBookSelect: (strId: string) => () => void
}

/**
 * @description booklist as word cloud layout
 * @param {Array} {arrBooks list of books
 * @param {Function} onBookSelect on book select handler generator
 * @returns {JSX} component markup
 */
const TagCloudList: React.FC<Props> = ({ arrBooks, onBookSelect }) => {
  const { bLightTheme } = useCurrentTheme()

  return (
    <Box
      component={TagCloud}
      minSize={12}
      maxSize={35}
      tags={formatBooks(arrBooks)}
      onClick={(tag: Record<string, any>) => onBookSelect(tag.key)()}
      colorOptions={{
        luminosity: bLightTheme ? 'dark' : 'light',
      }}
      sx={{
        position: 'relative',
        zIndex: 2,
        '& > span': {
          cursor: 'pointer',
        },
      }}
    />
  )
}

export default memo(TagCloudList)
