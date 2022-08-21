import React, { memo, Fragment } from 'react'
import { Box } from '@mui/material'

const BACKGROUND_IMG_URL = `https://res.cloudinary.com/dlw2jic1w/image/upload/v1648406178/image_list_images/lincoln-freitas-qgpCWCjaC9w-unsplash_igvcet.jpg`

/**
 * @description background component
 * @returns {JSX} markup, background image
 */
const Background: React.FC = () => {
  const objBaseStyle = {
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    width: {
      xs: '100%',
      sm: '100%',
      md: '60vw',
    },
  }
  return (
    <Fragment>
      <Box
        sx={{
          ...objBaseStyle,
          zIndex: 1,
          background: (theme) => theme.custom?.bookList?.overlay.background,
        }}
      />
      <Box
        sx={{
          ...objBaseStyle,
          backgroundImage: `url(${BACKGROUND_IMG_URL})`,
          backgroundSize: 'cover',
          opacity: (theme) => theme.custom?.bookList?.backgroundImage.opacity,
        }}
      />
    </Fragment>
  )
}

export default memo(Background)
