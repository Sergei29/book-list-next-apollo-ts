import React from 'react'
import { Box } from '@mui/material'

import { OBJ_TEST_IDS } from '@/constants'

const PageBackground = () => (
  <Box
    sx={{
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      background: (theme) => theme.custom?.page?.background,
      zIndex: 0,
    }}
    data-testid={OBJ_TEST_IDS.pageBackground}
  ></Box>
)

export default PageBackground
