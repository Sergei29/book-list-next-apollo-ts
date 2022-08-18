import React from 'react'
import { ListItem, ListItemIcon, ListItemText, useTheme, useMediaQuery, Link } from '@mui/material'
import { GitHub as GitHubIcon } from '@mui/icons-material'

import { OBJ_TEST_IDS } from '@/constants'
import { animationShake } from '@/Theme'

type Props = {
  bLightTheme: boolean
}

const GitHubButton: React.FC<Props> = ({ bLightTheme }) => {
  const theme = useTheme()
  const bIsMobileScreen = useMediaQuery(theme.breakpoints.down('xs'))

  if (true === bIsMobileScreen) {
    return (
      <ListItem
        component="a"
        href="https://github.com/Sergei29/book-list-graphql-react-app"
        target="_blank"
        sx={{
          color: 'inherit',
        }}
      >
        <ListItemIcon
          sx={{
            color: 'inherit',
          }}
        >
          <GitHubIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Source code</ListItemText>
      </ListItem>
    )
  }

  return (
    <Link
      href="https://github.com/Sergei29/book-list-graphql-react-app"
      target="_blank"
      data-testid={OBJ_TEST_IDS.gitHubLink}
      sx={{
        '@keyframes shake': animationShake,
        '&:hover': {
          transform: `scale(1.1)`,
        },
        '&:focus': {
          animation: `$shake 0.5s`,
        },
        textDecoration: 'none',
        padding: (theme) => `${theme.spacing(0.5)}px ${theme.spacing(1)}px`,
        color: (theme) => (bLightTheme ? theme.palette.common.white : theme.palette.secondary.main),
        display: 'flex',
        borderRadius: 4,
        backgroundColor: (theme) => theme.palette.primary.main,
        columnGap: (theme) => `${theme.spacing(1)}px`,
        transition: (theme) => `all 200ms ${theme.transitions.easing.easeInOut}`,
      }}
    >
      <GitHubIcon fontSize="small" />
      <span>Source code</span>
    </Link>
  )
}

export default GitHubButton
