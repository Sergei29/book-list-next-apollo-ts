import React from 'react'
import { Box, CircularProgress, Typography } from '@mui/material'

type Props = {
  strLoadingMessage?: string
}
const Loader: React.FC<Props> = ({ strLoadingMessage }) => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      columnGap: (theme) => theme.spacing(2),
      '& > p': {
        color: (theme) => theme.palette.secondary.main,
      },
    }}
  >
    <CircularProgress color="secondary" />
    {!!strLoadingMessage && <Typography>{strLoadingMessage}</Typography>}
  </Box>
)

export default Loader
