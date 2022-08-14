import React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { useCurrentTheme } from '../../hooks'
import { themeDark, themeLight } from '../../Theme/theme'

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
