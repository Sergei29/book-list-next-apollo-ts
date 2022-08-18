import React from 'react'
import { Box } from '@mui/material'
import Link, { LinkProps } from 'next/link'
import { useRouter } from 'next/router'

type Props = {
  children: React.ReactNode
} & LinkProps

const NavLink = ({ children, ...restLinkProps }: Props) => {
  const router = useRouter()
  const bActiveLink = router.asPath === restLinkProps.href

  return (
    <Box
      component={Link}
      sx={{
        color: (theme) => theme.palette.primary.main,
        textDecoration: 'none',
        textDecorationLine: bActiveLink ? 'underline' : 'none',
      }}
      {...restLinkProps}
    >
      {children}
    </Box>
  )
}

export default NavLink
