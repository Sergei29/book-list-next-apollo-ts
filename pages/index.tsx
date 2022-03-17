import type { NextPage } from 'next'
import { Typography } from '@mui/material'

const Home: NextPage = () => {
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
