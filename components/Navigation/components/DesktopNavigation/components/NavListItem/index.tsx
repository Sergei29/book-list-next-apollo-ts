import React from 'react'
import { Box } from '@mui/material'

type Props = {
  children: React.ReactNode
  bLastItem?: boolean
}

const NavListItem = ({ children, bLastItem = false }: Props) => (
  <Box
    component="li"
    sx={
      bLastItem
        ? {
            display: 'inline-block',
            margin: (theme) => `0 ${theme.spacing(0.75)}px`,
          }
        : {
            marginLeft: 'auto',
            marginRight: {
              md: '40%',
            },
          }
    }
  >
    {children}
  </Box>
)

export default NavListItem
