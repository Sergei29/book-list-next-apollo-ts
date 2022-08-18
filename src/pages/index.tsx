import React, { useState, useContext } from 'react'
import type { NextPage, GetServerSideProps } from 'next'
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

type Props = {
  data: { books?: Book[] }
  url?: string
}

const Home: NextPage<Props> = ({ url, data }) => {
  const [bDisplayCloud, setbDisplayCloud] = useState<boolean>(false)
  const { getIsAuthenticated } = useContext(objAuthContext)
  const { nStrSelectedBookId, handleBookSelect, handleBookDeselect } = useBookListPage()

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
        <BookList arrBooks={data.books} bDisplayCloud={bDisplayCloud} onBookSelect={handleBookSelect} />

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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { data, error } = await apolloClient.query({
    query: GET_BOOKS,
  })

  const url = process.env.NEXT_PUBLIC_GRAPHQL_URI

  return {
    props: {
      data,
      url,
    },
  }
}

export default Home
