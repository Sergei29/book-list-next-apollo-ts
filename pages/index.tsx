import React from 'react'
import type { NextPage, GetServerSideProps } from 'next'
import { Typography } from '@mui/material'
import { apolloClient } from '../src/apollo'
import { GET_ALL_NOTES } from '../src/apollo/queries'
import { Note } from '../src/types'

// type Props = {
//   data: { getNotes?: Note[] }
//   errorMessage: string | null
// }

const Home: NextPage = () => {
  // console.log('data.getNotes: ', data.getNotes)
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

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   const { data, error } = await apolloClient.query({
//     query: GET_ALL_NOTES,
//   })

//   return {
//     props: {
//       data,
//       errorMesssage: error?.message || null,
//     },
//   }
// }

export default Home
