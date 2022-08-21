import React from 'react'
import { Box } from '@mui/material'

import { animationShake } from '@/Theme'
import { Book } from '@/types'
import TagCloudList from './components/TagCloudList'

type Props = {
  bDisplayCloud: boolean
  onBookSelect: (strId: string) => () => void
  arrBooks?: Book[]
  nStrSelectedBookId: string | null
}

/**
 * @description book list component
 * @param {Function} {onBookSelect callback function on selecting a single book}
 * @returns {JSX} coponent markup
 */
const BookList: React.FC<Props> = ({ bDisplayCloud, onBookSelect, arrBooks, nStrSelectedBookId }) => {
  if (!arrBooks || arrBooks?.length === 0) return <p>No books.</p>

  return bDisplayCloud ? (
    <TagCloudList arrBooks={arrBooks} onBookSelect={onBookSelect} />
  ) : (
    <Box
      component="ul"
      sx={{
        position: 'relative',
        zIndex: 2,
      }}
    >
      {arrBooks.map((objBook) => (
        <Box
          component="li"
          key={objBook!.id}
          onClick={onBookSelect!(objBook!.id)}
          sx={{
            '@keyframes shake': animationShake,
            display: 'inline-block',
            margin: (theme) => theme.spacing(1.5),
            padding: (theme) => theme.spacing(1.25),
            borderRadius: 4,
            border: (theme) => `1px solid ${theme.palette.secondary.main}`,
            boxShadow: `1px 2px 3px rgba(0, 0, 0, 0.3)`,
            cursor: 'pointer',
            color: (theme) =>
              nStrSelectedBookId === objBook!.id ? theme.custom?.bookButton?.color : theme.palette.secondary.main,
            backgroundColor: (theme) =>
              nStrSelectedBookId === objBook!.id ? theme.palette.secondary.main : 'transparent',
            fontWeight: 500,
            transition: (theme) => `all 200ms ${theme.transitions.easing.easeInOut}`,
            '&:hover': {
              color: (theme) => theme.custom?.bookButton?.color,
              backgroundColor: (theme) => theme.palette.secondary.main,
              transform: `scale(1.1)`,
            },
            '&:focus': {
              color: (theme) => theme.palette.primary.main,
              animation: `$shake 0.5s`,
            },
            '&:active': {
              color: (theme) => theme.palette.primary.main,
              animation: `$shake 0.5s`,
            },
          }}
        >
          {objBook!.name}
        </Box>
      ))}
    </Box>
  )
}

export default BookList
