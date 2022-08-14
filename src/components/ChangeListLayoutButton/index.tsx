import React from 'react'
import { IconButton, IconButtonProps, Tooltip } from '@mui/material'
import { ViewCompact as ViewCompactIcon, CloudQueue as CloudQueueIcon } from '@mui/icons-material'

type Props = {
  bDisplayCloud: boolean
} & IconButtonProps

/**
 * @description button to toggle layout grid vs word cloud
 * @param {Boolean} {bDisplayCloud should display as word cloud or not
 * @param {Object} restIconButtonProps MUI `IconButton` props
 * @returns {JSX} component markup
 */
const ChangeListLayoutButton: React.FC<Props> = ({ bDisplayCloud, ...restIconButtonProps }) => (
  <IconButton
    {...restIconButtonProps}
    sx={{
      color: (theme) => theme.palette.primary.main,
      '&:hover': {
        color: (theme) => theme.palette.secondary.main,
      },
    }}
  >
    <Tooltip title={`display as ${bDisplayCloud ? 'grid' : 'word-cloud'}`}>
      {bDisplayCloud ? <ViewCompactIcon /> : <CloudQueueIcon />}
    </Tooltip>
  </IconButton>
)

export default ChangeListLayoutButton
