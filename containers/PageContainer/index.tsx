import React from 'react'
import { Box, Container } from '@mui/material'
import PageBackground from './components/PageBackground'

type Props = {
  children: React.ReactNode
}

const PageContainer = ({ children }: Props) => {
  return (
    <Box>
      <PageBackground />
      <Container
        sx={{
          position: 'relative',
          zIndex: 1,
        }}
      >
        {children}
      </Container>
    </Box>
  )
}

export default PageContainer
