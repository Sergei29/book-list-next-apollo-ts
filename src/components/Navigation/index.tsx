import React, { useContext, useState } from 'react'
import { useTheme, useMediaQuery } from '@mui/material'

import { useCurrentTheme, useModal, useAuthentication } from '@/hooks'
import { objAuthContext } from '@/containers/AuthProvider'
import SignInForm from '@/components/SignInForm'
import SignUpForm from '@/components/SignUpForm'
import AuthModal from '@/components/AuthModal'
import { OBJ_TEST_IDS } from '@/constants'
import MobileNavigation from './components/MobileNavigation'
import DesktopNavigation from './components/DesktopNavigation'

/**
 * @description navigation component
 * @returns {JSX} component markup
 */
const Navigation: React.FC = () => {
  const theme = useTheme()
  const bIsMobileScreen = useMediaQuery(theme.breakpoints.down('xs'))
  const { getIsAdmin, getIsAuthenticated } = useContext(objAuthContext)
  const { handleSignOut } = useAuthentication()
  const { bLightTheme, funcToggleTheme } = useCurrentTheme()
  const { bOpenModal, funcModalClose, funcModalOpen } = useModal()
  const [bSignUp, setBSignUp] = useState<boolean>(false)

  return (
    <div data-testid={OBJ_TEST_IDS.navigationContainer}>
      {true === bIsMobileScreen ? (
        <MobileNavigation
          bAdmin={getIsAdmin()}
          bLoggedIn={getIsAuthenticated()}
          bLightTheme={bLightTheme}
          funcToggleTheme={funcToggleTheme}
          funcModalOpen={funcModalOpen}
          handleLogout={handleSignOut}
        />
      ) : (
        <DesktopNavigation
          bAdmin={getIsAdmin()}
          bLoggedIn={getIsAuthenticated()}
          bLightTheme={bLightTheme}
          funcModalOpen={funcModalOpen}
          funcToggleTheme={funcToggleTheme}
          handleLogout={handleSignOut}
        />
      )}
      <AuthModal bOpen={bOpenModal} handleClose={funcModalClose}>
        {bSignUp ? (
          <SignUpForm funcCloseModal={funcModalClose} setBSignUp={setBSignUp} />
        ) : (
          <SignInForm funcCloseModal={funcModalClose} setBSignUp={setBSignUp} />
        )}
      </AuthModal>
    </div>
  )
}

export default Navigation
