import React from 'react'
import Button, { ButtonProps } from '@mui/material/Button'

/**
 * @description common component, reset button
 * @param {Node} children
 * @param {Object} restButtonProps MUI Button props
 * @returns {JSX} component markup
 */
const ResetButton: React.FC<ButtonProps> = ({ children, ...restButtonProps }) => (
  <Button
    sx={{
      textTransform: 'capitalize',
      color: (theme) => theme.palette.info.main,
    }}
    variant="contained"
    type="reset"
    color="primary"
    {...restButtonProps}
  >
    {children}
  </Button>
)

export default ResetButton
