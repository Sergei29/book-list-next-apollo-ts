import React, { memo } from 'react'
import { IconButton, InputAdornment } from '@mui/material'
import { Visibility as VisibilityIcon, VisibilityOff as VisibilityOffIcon } from '@mui/icons-material'

type Props = {
  bShowPassword: boolean
  handleClick: () => void
  bDisabled?: boolean
}

/**
 * @description passoword visibility button
 * @param {Obect} props component props
 * @returns {JSX} markup, conditional show/hide pw button
 */
const ShowPasswordButton: React.FC<Props> = ({ bDisabled = false, bShowPassword, handleClick }) => (
  <InputAdornment position="end">
    <IconButton aria-label="toggle password visibility" onClick={handleClick} disabled={bDisabled}>
      {bShowPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
    </IconButton>
  </InputAdornment>
)

export default memo(ShowPasswordButton)
