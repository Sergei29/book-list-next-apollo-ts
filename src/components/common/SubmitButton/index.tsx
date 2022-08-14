import React from 'react'
import Button, { ButtonProps } from '@mui/material/Button'

/**
 * @description common component, submit button
 * @param {Node} {children
 * @param {Object} restButtonProps MUI Button props
 * @returns {JSX} component markup
 */
const SubmitButton: React.FC<ButtonProps> = ({ children, ...restButtonProps }) => (
  <Button
    variant="contained"
    type="submit"
    color="secondary"
    sx={{
      textTransform: 'capitalize',
      color: (theme) => theme.palette.info.main,
      '&:disabled': {
        pointerEvents: 'auto',
        cursor: 'not-allowed',
        color: (theme) => theme.palette.info.main,
        backgroundColor: (theme) => theme.palette.secondary.main,
        opacity: 0.9,
        '&:hover': {
          color: (theme) => theme.palette.info.main,
          backgroundColor: (theme) => theme.palette.secondary.main,
          transform: 'scale(1.01)',
        },
      },
    }}
    {...restButtonProps}
  >
    {children}
  </Button>
)

export default SubmitButton
