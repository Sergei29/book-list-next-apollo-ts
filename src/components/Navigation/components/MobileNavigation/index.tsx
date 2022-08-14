import React, { useState } from 'react'
import { Drawer, Divider, List, ListItem, ListItemIcon, ListItemText, IconButton, Box } from '@mui/material'
import { Menu as MenuIcon, SupervisorAccount as SupervisorAccountIcon, Home as HomeIcon } from '@mui/icons-material'
import { MuiSelectedTheme } from '../../../../types'
import { OBJ_TEST_IDS } from '../../../../constants'
// components:
import GitHubButton from '../../../GitHubButton'
import AuthLink from '../../../AuthLink'
import Switch from '../../../common/Switch'
import MobileNavLink from './components/MobileNavLink'

const { LIGHT, DARK } = MuiSelectedTheme

export type Props = {
  bAdmin: boolean
  bLightTheme: boolean
  bLoggedIn: boolean
  funcToggleTheme: () => void
  funcModalOpen: () => void
  handleLogout: () => Promise<void>
}

/**
 * @description navigation for mobile screen
 * @param {Object} props component props
 * @returns {JSX} component markup
 */
const MobileNavigation: React.FC<Props> = ({
  bAdmin,
  bLoggedIn,
  bLightTheme,
  funcToggleTheme,
  funcModalOpen,
  handleLogout,
}) => {
  const [bOpenMenu, setbOpenMenu] = useState<boolean>(false)

  const handleMenuOpen = () => setbOpenMenu(true)

  const handleMenuClose = () => setbOpenMenu(false)

  return (
    <Box
      data-testid={OBJ_TEST_IDS.navigationMobile}
      sx={{
        position: 'relative',
        display: 'flex',
        justifyContent: 'flex-end',
        zIndex: 2,
      }}
    >
      <IconButton
        onClick={handleMenuOpen}
        data-testid={OBJ_TEST_IDS.navigationMobileToggle}
        sx={{
          color: (theme) => theme.palette.secondary.main,
        }}
      >
        <MenuIcon color="secondary" sx={{ fontSize: '1.9rem' }} />
      </IconButton>
      <Drawer
        open={bOpenMenu}
        onClose={handleMenuClose}
        sx={{
          background: (theme) => theme.custom?.mobileNavigation?.background,
          color: (theme) => theme.custom?.mobileNavigation?.color,
        }}
      >
        <List>
          <ListItem
            button
            sx={{
              color: {
                xs: 'inherit',
              },
            }}
          >
            <MobileNavLink href="/">
              <ListItemIcon
                sx={{
                  color: 'inherit',
                }}
              >
                <HomeIcon />
              </ListItemIcon>
              <span>Home</span>
            </MobileNavLink>
          </ListItem>
          {bAdmin && (
            <ListItem
              button
              sx={{
                color: {
                  xs: 'inherit',
                },
              }}
            >
              <MobileNavLink href="/admin">
                <ListItemIcon
                  sx={{
                    color: 'inherit',
                  }}
                >
                  <SupervisorAccountIcon />
                </ListItemIcon>
                <span>Admin</span>
              </MobileNavLink>
            </ListItem>
          )}
          <AuthLink bLoggedIn={bLoggedIn} handleLogout={handleLogout} funcModalOpen={funcModalOpen} />
          <ListItem
            sx={{
              color: {
                xs: 'inherit',
              },
            }}
          >
            <GitHubButton bLightTheme={bLightTheme} />
          </ListItem>
          <Divider />
          <ListItem>
            <Switch checked={bLightTheme} onChange={funcToggleTheme} data-testid={OBJ_TEST_IDS.themeSwitchMobile} />
            <ListItemText>{`switch to ${bLightTheme ? DARK : LIGHT}`}</ListItemText>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  )
}

export default MobileNavigation
