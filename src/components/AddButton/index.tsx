import React from 'react'
import { Fab, FabProps } from '@mui/material'
import { Add as AddIcon } from '@mui/icons-material'

type RestFabProps = Omit<FabProps, 'onCLick' | 'sx'>

type Props = {
  handleClick?: () => void
} & RestFabProps

/**
 * @description add button component
 * @param {Function} handleClick callback on click
 * @param {unknown} restFabButtonProps possible rest params
 * @returns {JSX} component markup
 */
const AddButton: React.FC<Props> = ({ handleClick, ...restFabButtonProps }) => (
  <Fab
    sx={{
      color: (theme) => theme.custom?.bookButton?.color,
      fontSize: '2em',
      background: (theme) => theme.palette.secondary.main,
      border: 0,
      padding: (theme) => theme.spacing(2),
      width: 50,
      height: 49,
      borderRadius: '50%',
      position: 'fixed',
      zIndex: 2,
      bottom: 30,
      left: 60,
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
      transition: 'all 200ms ease-in-out',
      '&:disabled': {
        cursor: 'not-allowed',
        opacity: 0.9,
      },
      '&:hover': {
        background: (theme) => theme.palette.secondary.dark,
      },
      '&:active': {
        outline: 'none',
        transform: 'scale(1.01)',
      },
      '&:focus': {
        outline: 'none',
        transform: 'scale(1.01)',
      },
    }}
    onClick={handleClick}
    aria-label="add"
    {...restFabButtonProps}
  >
    <AddIcon />
  </Fab>
)

export default AddButton
