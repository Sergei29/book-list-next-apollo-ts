import React from 'react'
import { Box } from '@mui/material'
import Link, { LinkProps } from 'next/link'
import { useRouter } from 'next/router'

type Props = {
  children: React.ReactNode
} & LinkProps

const MobileNavLink = ({ children, ...restLinkProps }: Props) => {
  const router = useRouter()
  const bActiveLink = router.asPath === restLinkProps.href

  return (
    <Box
      component={Link}
      sx={{
        color: (theme) => (bActiveLink ? theme.custom?.bookDetails?.color : 'inherit'),
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
        padding: (theme) => `${theme.spacing(1)}px ${theme.spacing(2)}px`,
        width: '100%',
        backgroundColor: (theme) => (bActiveLink ? theme.custom?.bookDetails?.background : 'auto'),
      }}
      {...restLinkProps}
    >
      {children}
    </Box>
  )
}

export default MobileNavLink
