import React from 'react'
import { IconButton, Tooltip, ListItem, ListItemIcon, ListItemText, useTheme, useMediaQuery } from '@mui/material'
import { LockOpen as LockOpenIcon, Lock as LockIcon } from '@mui/icons-material'

import { OBJ_TEST_IDS } from '@/constants'

type Props = {
  bLoggedIn: boolean
  funcModalOpen: () => void
  handleLogout: () => void
}

/**
 * @description functional component, authentication link and modal
 * @returns {JSX} authentication markup
 */
const AuthLink: React.FC<Props> = ({ bLoggedIn, handleLogout, funcModalOpen }) => {
  const theme = useTheme()
  const bIsMobileScreen = useMediaQuery(theme.breakpoints.down('xs'))

  if (true === bIsMobileScreen) {
    return (
      <ListItem button onClick={bLoggedIn ? handleLogout : funcModalOpen}>
        <ListItemIcon
          sx={{
            color: 'inherit',
            paddingLeft: (theme) => theme.spacing(2),
          }}
        >
          {bLoggedIn ? <LockIcon /> : <LockOpenIcon />}
        </ListItemIcon>
        <ListItemText
          sx={{
            paddingLeft: (theme) => theme.spacing(2),
          }}
        >
          {bLoggedIn ? 'Logout' : 'Login'}
        </ListItemText>
      </ListItem>
    )
  }

  return (
    <div data-testid={OBJ_TEST_IDS.authLink}>
      {bLoggedIn ? (
        <IconButton
          onClick={handleLogout}
          sx={{
            '&:hover': {
              transform: `scale(1.1)`,
            },
            '&:focus': {
              animation: `$shake 0.5s`,
            },
            color: (theme) => theme.palette.secondary.main,
            transition: (theme) => `all 200ms ${theme.transitions.easing.easeInOut}`,
          }}
          disableFocusRipple
        >
          <Tooltip title="logout">
            <LockOpenIcon fontSize="large" />
          </Tooltip>
        </IconButton>
      ) : (
        <IconButton
          onClick={funcModalOpen}
          sx={{
            '&:hover': {
              transform: `scale(1.1)`,
            },
            '&:focus': {
              animation: `$shake 0.5s`,
            },
            color: (theme) => theme.palette.secondary.main,
            transition: (theme) => `all 200ms ${theme.transitions.easing.easeInOut}`,
          }}
          disableFocusRipple
        >
          <Tooltip title="login / sign up">
            <LockIcon fontSize="large" />
          </Tooltip>
        </IconButton>
      )}
    </div>
  )
}

export default AuthLink
