import React, { useEffect } from 'react'
import type { NextPage, GetServerSideProps } from 'next'
import { Typography } from '@mui/material'
import { apolloClient } from '../apollo/client'
import { GET_BOOKS } from '../apollo/client'
import { useQuery } from '@apollo/client'
import { BookType } from '../types'

type Props = {
  data: { books?: BookType[] }
  url?: string
}

const Home: NextPage<Props> = ({ url, data }) => {
  console.log('graphql api url: ', url)

  console.log('data.books', data.books)

  // const { data, loading, error } = useQuery(GET_BOOKS)

  // useEffect(() => {
  //   console.log('data, loading, error: ', '\n', data, '\n', loading, '\n', error)
  // }, [data, loading, error])

  return (
    <div>
      <header>
        <nav>nav</nav>
      </header>

      <main>
        <Typography variant="h1" sx={{ textAlign: 'center', color: (theme) => theme.palette.primary.main }}>
          book list
        </Typography>
      </main>

      <footer>footer</footer>
    </div>
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
