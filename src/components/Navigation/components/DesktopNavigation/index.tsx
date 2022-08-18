import React from 'react'
import { Tooltip, Box } from '@mui/material'

import GitHubButton from '@/components/GitHubButton'
import Switch from '@/components/common/Switch'
import AuthLink from '@/components/AuthLink'
import NavListItem from './components/NavListItem'
import NavLink from './components/NavLink'
import { MuiSelectedTheme } from '@/types'
import { OBJ_TEST_IDS } from '@/constants'

const { LIGHT, DARK } = MuiSelectedTheme

export type Props = {
  bAdmin: boolean
  bLoggedIn: boolean
  bLightTheme: boolean
  funcModalOpen: () => void
  funcToggleTheme: () => void
  handleLogout: () => Promise<void>
}

/**
 * @description navigation for desktop
 * @param {Object} props component props
 * @returns {JSX} component markup
 */
const DesktopNavigation: React.FC<Props> = ({
  bAdmin,
  bLoggedIn,
  bLightTheme,
  funcModalOpen,
  funcToggleTheme,
  handleLogout,
}) => {
  return (
    <Box
      component="nav"
      data-testid={OBJ_TEST_IDS.navigationDesktop}
      sx={{
        position: 'relative',
        zIndex: 2,
      }}
    >
      <Box
        component="ul"
        sx={{
          display: 'flex',
          alignItems: 'center',
          margin: 0,
          padding: 0,
          listStyleType: 'none',
        }}
      >
        <NavListItem>
          <NavLink href="/">Home</NavLink>
        </NavListItem>
        {bAdmin && (
          <NavListItem>
            <NavLink href="/admin">Admin</NavLink>
          </NavListItem>
        )}
        <NavListItem>
          <AuthLink bLoggedIn={bLoggedIn} funcModalOpen={funcModalOpen} handleLogout={handleLogout} />
        </NavListItem>
        <NavListItem>
          <span>
            <GitHubButton bLightTheme={bLightTheme} />
          </span>
        </NavListItem>
        <NavListItem bLastItem>
          <Tooltip title={`switch theme to ${bLightTheme ? DARK : LIGHT}`}>
            <Switch checked={bLightTheme} onChange={funcToggleTheme} data-testid={OBJ_TEST_IDS.themeSwitch} />
          </Tooltip>
        </NavListItem>
      </Box>
    </Box>
  )
}

export default DesktopNavigation
