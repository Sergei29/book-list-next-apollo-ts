import React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'

import { themeDark, themeLight } from '@/Theme/theme'
import { useCurrentTheme } from '@/hooks'

type Props = {
  children: React.ReactNode
}

const ThemeContainer = ({ children }: Props) => {
  const { bLightTheme } = useCurrentTheme()
  return (
    <ThemeProvider theme={bLightTheme ? themeLight : themeDark}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}

export default ThemeContainer
