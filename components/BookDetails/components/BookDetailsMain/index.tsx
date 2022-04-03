import React from 'react'
import { Box, BoxProps, Typography, CardMedia } from '@mui/material'
import { STR_DEFAULT_BOOK_IMG_URL } from '../../../../constants'

type Props = {
  strImageUrl?: string
  strDescription?: string
} & BoxProps

const BookDetailsMain: React.FC<Props> = ({
  strImageUrl = STR_DEFAULT_BOOK_IMG_URL,
  strDescription,
  ...restBoxProps
}) => (
  <Box
    sx={{
      display: 'flex',
      gap: (theme) => `${theme.spacing(2)}px`,
      minHeight: 170,
    }}
    {...restBoxProps}
  >
    <Box>
      <CardMedia component="img" src={strImageUrl} sx={{ width: 124 }} />
    </Box>
    <Box>{strDescription && <Typography>{strDescription}</Typography>}</Box>
  </Box>
)

export default BookDetailsMain
