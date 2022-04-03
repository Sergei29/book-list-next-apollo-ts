import React from 'react'
import { IconButton, Tooltip } from '@mui/material'
import { Edit as EditIcon } from '@mui/icons-material'

type Props = {
  handleClick: () => void
}

const EditButton: React.FC<Props> = ({ handleClick }) => (
  <IconButton onClick={handleClick}>
    <Tooltip title="Edit book">
      <EditIcon />
    </Tooltip>
  </IconButton>
)

export default EditButton
