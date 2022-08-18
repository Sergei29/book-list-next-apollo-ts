import React from 'react'
import { Box, Container } from '@mui/material'

import Navigation from '@/components/Navigation'
import PageBackground from './components/PageBackground'

type Props = {
  children: React.ReactNode
}

const PageContainer = ({ children }: Props) => {
  return (
    <>
      <Navigation />
      <PageBackground />
      <Container
        sx={{
          position: 'relative',
          zIndex: 1,
        }}
      >
        {children}
      </Container>
    </>
  )
}

export default PageContainer
