import React, { useState, useContext } from 'react'
import type { NextPage, GetServerSideProps } from 'next'
import { Typography, Box } from '@mui/material'
import { apolloClient } from '../apollo/client'
import { GET_BOOKS } from '../apollo/client'
import { Book } from '../types'
import PageContainer from '../containers/PageContainer'
import { objAuthContext } from '../containers/AuthProvider'
import { useBookListPage } from '../hooks'
import { OBJ_TEST_IDS } from '../constants'
//components:
import BookList from '../components/BookList'
import BookDetails from '../components/BookDetails'
import AddBook from '../components/AddBook'
import Background from '../components/Background'
import ChangeListLayoutButton from '../components/ChangeListLayoutButton'

type Props = {
  data: { books?: Book[] }
  url?: string
}

const Home: NextPage<Props> = ({ url, data }) => {
  console.log('graphql api url: ', url)

  console.log('data.books', data.books)
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
