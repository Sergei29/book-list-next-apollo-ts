import React, { Fragment } from 'react'
import { FormControl, Button, Box, Typography, Tooltip, alpha } from '@mui/material'
import { ExitToApp as ExitToAppIcon } from '@mui/icons-material'
import TextField from '../common/TextField'
import ShowPasswordButton from '../common/ShowPasswordButton'
import { useLoginForm } from '../../hooks/useLoginForm'
import { useCopytoClipboard } from '../../hooks/useCopytoClipboard'

type Props = {
  funcCloseModal: () => void
  setBSignUp: React.Dispatch<React.SetStateAction<boolean>>
}

/**
 * @description login form
 * @param {Object} props component props
 * @returns {JSX} markup, form with input fields and buttons
 */
const SignInForm: React.FC<Props> = ({ funcCloseModal, setBSignUp }) => {
  const {
    bShowPassword,
    handleToggleShowPassword,
    nstrSignInError,
    handleChange,
    handleReset,
    handleSubmit,
    objFormData,
  } = useLoginForm(funcCloseModal)

  const { handleCopyOnClick, strCopiedField } = useCopytoClipboard()

  return (
    <Fragment>
      <Typography
        variant="h5"
        component="h3"
        sx={{
          marginBottom: (theme) => theme.spacing(2),
          color: (theme) => theme.palette.info.main,
        }}
      >
        Sign In
      </Typography>
      <Typography
        sx={{
          color: (theme) => theme.palette.info.main,
          fontSize: '.75rem',
          marginBottom: (theme) => theme.spacing(1),
          '& span': {
            '&:hover': {
              cursor: 'pointer',
              color: (theme) => alpha(theme.palette.info.main, 0.5),
            },
          },
        }}
      >
        Not registered ?
        <Button
          endIcon={<ExitToAppIcon />}
          // onClick={() => setBSignUp(true)}
          sx={{
            color: 'inherit',
            fontSize: 'inherit',
            paddingBottom: 0,
            paddingTop: 0,
            marginBottom: 0,
          }}
        >
          Sign Up
        </Button>
      </Typography>
      <Typography color="secondary">
        currently signup service is unavailable. Please, use sample credentils below:
      </Typography>
      <Typography
        sx={{
          color: (theme) => theme.palette.info.main,
          fontSize: '.75rem',
          marginBottom: (theme) => theme.spacing(1),
          '& span': {
            '&:hover': {
              cursor: 'pointer',
              color: (theme) => alpha(theme.palette.info.main, 0.5),
            },
          },
        }}
      >
        <span onClick={handleCopyOnClick('user123@gmail.com', 'email')}>
          {strCopiedField === 'email' ? (
            'copied!'
          ) : (
            <Tooltip title={!strCopiedField ? 'copy to clipboard' : ''} placement="top-end">
              <span>email: user123@gmail.com</span>
            </Tooltip>
          )}
        </span>

        <br />
        <span onClick={handleCopyOnClick('secret123', 'password')}>
          {strCopiedField === 'password' ? (
            'copied!'
          ) : (
            <Tooltip title={!strCopiedField ? 'copy to clipboard' : ''} placement="top-end">
              <span>password: secret123</span>
            </Tooltip>
          )}
        </span>
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          rowGap: (theme) => theme.spacing(2),
        }}
      >
        {nstrSignInError && (
          <Typography
            sx={{
              color: (theme) => theme.palette.error.main,
            }}
          >
            {nstrSignInError}
          </Typography>
        )}
        <FormControl>
          <TextField
            type="text"
            label="Email"
            variant="outlined"
            strFieldname="email"
            strValue={objFormData.email}
            handleChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <TextField
            label="Password"
            variant="outlined"
            type={bShowPassword ? 'text' : 'password'}
            strFieldname="password"
            strValue={objFormData.password}
            handleChange={handleChange}
            InputProps={{
              endAdornment: (
                <ShowPasswordButton
                  bShowPassword={bShowPassword}
                  handleClick={handleToggleShowPassword}
                  bDisabled={objFormData.password.length === 0}
                />
              ),
            }}
          />
        </FormControl>
        <FormControl
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            columnGap: (theme) => theme.spacing(1),
            '& > button': {
              textTransform: 'capitalize',
              color: (theme) => theme.palette.info.main,
            },
          }}
        >
          <Button variant="contained" type="submit" color="secondary">
            submit
          </Button>
          <Button variant="contained" type="reset" onClick={handleReset} color="primary">
            reset
          </Button>
        </FormControl>
      </Box>
    </Fragment>
  )
}

export default SignInForm
