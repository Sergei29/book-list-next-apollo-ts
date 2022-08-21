import React from 'react'
import { Backdrop, Fade, Dialog, DialogContent } from '@mui/material'

type Props = {
  children: React.ReactNode
  handleClose: () => void
  bOpen: boolean
}

/**
 * @description authentication modal
 * @param {Boolean} {bOpen is modal open
 * @param {Node} children nested children - content
 * @param {Function} handleClose function to close modal }
 * @returns {JSX} modal HOC
 */
const AuthModal: React.FC<Props> = ({ bOpen, children, handleClose }) => {
  return (
    <Dialog
      aria-labelledby="authentication-modal"
      aria-describedby="login or register the user"
      open={bOpen}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: (theme) => theme.spacing(2),
        minWidth: '40%',
      }}
      PaperProps={{
        sx: {
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
        },
      }}
    >
      <Fade in={bOpen}>
        <DialogContent
          sx={{
            width: '100%',
          }}
        >
          {children}
        </DialogContent>
      </Fade>
    </Dialog>
  )
}

export default AuthModal
