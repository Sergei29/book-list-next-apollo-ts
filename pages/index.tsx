import React, { useEffect } from 'react'
import type { NextPage, GetServerSideProps } from 'next'
import { Typography } from '@mui/material'
import { apolloClient } from '../src/apollo'
import { GET_ALL_NOTES } from '../src/apollo/queries'
import { useQuery } from '@apollo/client'
import { Note } from '../src/types'

type Props = {
  data: { getNotes?: Note[] }
  errorMessage: string | null
  url?: string
}

const Home: NextPage<Props> = ({ url, data: serverSideData, errorMessage }) => {
  console.log('serverSideData.getNotes: ', serverSideData.getNotes)

  console.log('graphql api url: ', url)

  const { data, loading, error } = useQuery(GET_ALL_NOTES)

  useEffect(() => {
    console.log('data, loading, error: ', '\n', data, '\n', loading, '\n', error)
  }, [data, loading, error])

  return (
    <div>
      <header>
        <nav>nav</nav>
      </header>

      <main>
        <Typography variant="h1" sx={{ textAlign: 'center', color: (theme) => theme.text.accent }}>
          book list
        </Typography>
      </main>

      <footer>footer</footer>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { data, error } = await apolloClient.query({
    query: GET_ALL_NOTES,
  })

  const url = process.env.NEXT_PUBLIC_GRAPHQL_URI

  return {
    props: {
      data,
      errorMesssage: error?.message || null,
      url,
    },
  }
}

export default Home
