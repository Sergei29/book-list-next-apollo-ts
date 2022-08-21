import React from 'react'
import { Box } from '@mui/material'

/**
 * @description page backdrop, ( eg. display loading )
 * @param {Node} children jsx content
 * @returns {JSX} component markup
 */
const PageBackDrop: React.FC = ({ children }) => (
  <Box
    sx={{
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      background: `rgba(0, 0, 0, 0.1)`,
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    {children}
  </Box>
)

export default PageBackDrop
