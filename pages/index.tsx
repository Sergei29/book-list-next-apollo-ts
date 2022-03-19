import React, { useEffect } from 'react'
import type { NextPage } from 'next'
import { useQuery, gql } from '@apollo/client'
import { Typography } from '@mui/material'

const GET_USER = gql`
  query GetUser {
    getUser {
      id
    }
  }
`

const Home: NextPage = () => {
  const { data, loading, error } = useQuery(GET_USER)

  useEffect(() => {
    console.log('data, loading, error :>> ', data, '\n ===', loading, '\n ===', error)
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

export default Home
