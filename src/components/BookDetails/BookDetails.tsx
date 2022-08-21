import React, { useContext } from 'react'
import { Typography, Chip, Box } from '@mui/material'

import { objAuthContext } from '@/containers/AuthProvider'
import { useBookDetails } from '@/hooks'
import BookDetailsHeader from './components/BookDetailsHeader'
import BookDetailsMain from './components/BookDetailsMain'

type Props = {
  strBookId: string
  setBShowEditModal: React.Dispatch<React.SetStateAction<boolean>>
  handleBookSelect: (strBookId: string) => () => void
}

/**
 * @description selected book details
 * @param {String} strBookId book ID
 * @param {Function} setBShowEditModal operate edit modal
 * @returns {JSX} component markup
 */
const BookDetails: React.FC<Props> = ({ strBookId, setBShowEditModal, handleBookSelect }) => {
  const { getIsAdmin } = useContext(objAuthContext)
  const { data, loading, error, funcIsBookFavorite, funcToggleAsFavorite } = useBookDetails({ strBookId })

  if (loading) return <Typography>Loading book details...</Typography>
  if (error) return <Typography>Error: {error.message}</Typography>
  if (!data?.book) return <Typography>No book selected.</Typography>

  const { id, genre, name, author, addedBy, description, image } = data?.book

  return (
    <div>
      <BookDetailsHeader
        bFavorite={funcIsBookFavorite(id)}
        bIsAdmin={getIsAdmin()}
        handleClickFavorite={funcToggleAsFavorite(id)}
        handleOpenEditModal={() => setBShowEditModal(true)}
        strAuthorName={author?.name!}
        strBookGenre={genre!}
        strBookTitle={name!}
        sx={{
          minHeight: 145,
        }}
      />
      <BookDetailsMain strImageUrl={image?.imageUrl} strDescription={description || 'book brief description'} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          rowGap: (theme) => theme.spacing(2),
        }}
      >
        <Typography
          variant="h4"
          component="h5"
          sx={{
            fontSize: '1.5rem',
          }}
        >
          All books by this author:
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: (theme) => theme.spacing(1),
          }}
        >
          {author!.books!.map((objBook: Record<string, any>) => (
            <Chip
              key={objBook!.id}
              label={objBook!.name}
              onClick={handleBookSelect(objBook!.id)}
              disabled={objBook!.id === strBookId}
            />
          ))}
        </Box>
        {!!addedBy && (
          <Typography
            sx={{
              fontSize: 12,
              marginTop: 'auto',
              textAlign: 'end',
              color: 'rgba(0, 0, 0, 0.54)',
            }}
          >
            Book added by: {addedBy}
          </Typography>
        )}
      </Box>
    </div>
  )
}

export default BookDetails
