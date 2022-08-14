import React from 'react'
import { IconButton } from '@mui/material'
import { Star as StarIcon, StarBorder as StarBorderIcon } from '@mui/icons-material'

type Props = {
  bFavorite?: boolean
  handleClick: () => void
}

const FavButton: React.FC<Props> = ({ bFavorite = false, handleClick }) => (
  <IconButton onClick={handleClick}>{bFavorite ? <StarIcon /> : <StarBorderIcon />}</IconButton>
)

export default FavButton
