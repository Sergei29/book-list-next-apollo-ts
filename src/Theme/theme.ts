import { createTheme } from '@mui/material/styles'
import { grey, pink, orange } from '@mui/material/colors'

/**
 * @description Theme extension: https://mui.com/customization/theming/#custom-variables
 */
declare module '@mui/material/styles' {
  interface Theme {
    custom: {
      bookButton: { color: string }
      bookDetails: {
        background: string
        color: string
      }
      bookList: {
        backgroundImage: { opacity: number }
        overlay: { background: string }
      }
      mobileNavigation: {
        background: string
        color: string
      }
      page: {
        background: string
      }
    }
  }

  // allow configuration using `createTheme`
  interface ThemeOptions {
    custom?: {
      bookButton?: { color?: string }
      bookDetails?: {
        background?: string
        color?: string
      }
      bookList?: {
        backgroundImage?: { opacity?: number }
        overlay?: { background?: string }
      }
      mobileNavigation?: {
        background?: string
        color?: string
      }
      page?: {
        background?: string
      }
    }
  }
}

// Create a theme instance.
export const themeLight = createTheme({
  palette: {
    primary: {
      main: grey[800], //darkGrey
      light: grey[700],
      dark: grey[900],
    },
    secondary: {
      main: pink[800], //raspberry
      light: pink[700],
      dark: pink[900], // bordeau
    },
    info: {
      main: orange[100], //yellow
      light: '#ffffe4',
      dark: '#cbae82',
    },
    mode: 'light',
  },
  custom: {
    bookButton: { color: '#fff' },
    bookDetails: {
      background: pink[800],
      color: '#fff',
    },
    bookList: {
      backgroundImage: { opacity: 0.3 },
      overlay: { background: 'rgba(0,0,0, 0.1)' },
    },
    mobileNavigation: {
      background: orange[100],
      color: pink[800],
    },
    page: {
      background: '#fafafa',
    },
  },
})

export const themeDark = createTheme({
  palette: {
    primary: {
      main: grey[400],
      light: grey[300],
      dark: grey[500],
    },
    secondary: {
      main: pink[800], //raspberry
      light: pink[700],
      dark: pink[900], // bordeau
    },
    info: {
      main: orange[100], //yellow
      light: '#ffffe4',
      dark: '#cbae82',
    },
    mode: 'dark',
  },
  custom: {
    bookButton: { color: grey[400] },
    bookDetails: {
      background: grey[800],
      color: grey[400],
    },
    bookList: {
      backgroundImage: { opacity: 1 },
      overlay: { background: 'rgba(0,0,0, 0.9)' },
    },
    mobileNavigation: {
      background: pink[800],
      color: '#fff',
    },
    page: {
      background: grey[800],
    },
  },
})
