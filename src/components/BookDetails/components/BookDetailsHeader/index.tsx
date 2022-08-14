import React from 'react'
import { Typography, Box, BoxProps } from '@mui/material'
import FavButton from '../FavButton'
import EditButton from '../EditButton'

type Props = {
  bFavorite: boolean
  bIsAdmin: boolean
  handleClickFavorite: () => void
  handleOpenEditModal: () => void
  strAuthorName: string
  strBookGenre: string
  strBookTitle: string
  strCustomClass?: string
} & BoxProps

const BookDetailsHeader: React.FC<Props> = ({
  bFavorite,
  bIsAdmin,
  handleClickFavorite,
  handleOpenEditModal,
  strAuthorName,
  strBookGenre,
  strBookTitle,
  ...restBoxProps
}) => {
  return (
    <Box {...restBoxProps}>
      <Typography variant="h4" component="h2">
        {strBookTitle}
        <FavButton bFavorite={bFavorite} handleClick={handleClickFavorite} />
        {true === bIsAdmin && <EditButton handleClick={handleOpenEditModal} />}
      </Typography>
      <Typography>{strBookGenre}</Typography>
      <Typography>{strAuthorName}</Typography>
    </Box>
  )
}

export default BookDetailsHeader
