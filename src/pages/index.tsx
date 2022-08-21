import React, { useState, useContext } from 'react'
import type { NextPage, GetStaticProps } from 'next'
import { Typography, Box } from '@mui/material'

import { objAuthContext } from '@/containers/AuthProvider'
import PageContainer from '@/containers/PageContainer'
import { apolloClient, GET_BOOKS } from '@/apollo'
import { OBJ_TEST_IDS } from '@/constants'
import { useBookListPage } from '@/hooks'
import { Book } from '@/types'

import ChangeListLayoutButton from '@/components/ChangeListLayoutButton'
import BookDetails from '@/components/BookDetails'
import Background from '@/components/Background'
import BookList from '@/components/BookList'
import AddBook from '@/components/AddBook'

export const getStaticProps: GetStaticProps = async (_ctx) => {
  const { data } = await apolloClient.query<{ books?: Book[] }>({
    query: GET_BOOKS,
  })

  return {
    props: {
      arrBooks: data.books,
      nStrInitialId: data.books ? data.books[0].id : null,
    },
  }
}

type PageProps = {
  arrBooks?: Book[]
  nStrInitialId: string | null
}

const Home: NextPage<PageProps> = ({ arrBooks, nStrInitialId }) => {
  const [bDisplayCloud, setbDisplayCloud] = useState<boolean>(false)
  const { getIsAuthenticated } = useContext(objAuthContext)
  const { nStrSelectedBookId, handleBookSelect, handleBookDeselect } = useBookListPage({ nStrInitialId })

  const funcToggleLayout = () => setbDisplayCloud((bPrevState) => !bPrevState)
  return (
    <PageContainer>
      <Box
        data-testid={OBJ_TEST_IDS.bookListPage}
        sx={{
          padding: 0,
          boxSizing: 'border-box',
          height: '100%',
          width: {
            xs: '100%',
            md: '60%',
          },
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          sx={{
            position: 'relative',
            zIndex: 2,
            color: (theme) => theme.palette.primary.main,
            textAlign: 'center',
          }}
        >
          My Reading List
          <ChangeListLayoutButton onClick={funcToggleLayout} bDisplayCloud={bDisplayCloud} />
        </Typography>
        <BookList
          arrBooks={arrBooks}
          bDisplayCloud={bDisplayCloud}
          onBookSelect={handleBookSelect}
          nStrSelectedBookId={nStrSelectedBookId}
        />

        {getIsAuthenticated() && <AddBook nStrSelectedBookId={nStrSelectedBookId} />}
        <BookDetails
          nstrBookId={nStrSelectedBookId}
          handleBookDeselect={handleBookDeselect}
          handleBookSelect={handleBookSelect}
        />
        <Background />
      </Box>
    </PageContainer>
  )
}

export default Home
