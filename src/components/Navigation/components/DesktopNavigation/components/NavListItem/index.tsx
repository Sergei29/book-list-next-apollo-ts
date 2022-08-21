import React from 'react'
import { Box } from '@mui/material'

type Props = {
  children: React.ReactNode
  bLastItem?: boolean
}

const NavListItem = ({ children, bLastItem = false }: Props) => (
  <Box
    component="li"
    sx={{
      marginLeft: bLastItem ? 'auto' : 'unset',
      marginRight: bLastItem ? 1 : 'unset',
    }}
  >
    {children}
  </Box>
)

export default NavListItem
