import React, { Fragment } from 'react'
import { useRouter } from 'next/router'
import { FormControl, Button, Box, Typography } from '@mui/material'
import { ExitToApp as ExitToAppIcon } from '@mui/icons-material'

import ShowPasswordButton from '@/components/common/ShowPasswordButton'
import SubmitButton from '@/components/common/SubmitButton'
import PageBackDrop from '@/components/common/PageBackDrop'
import ResetButton from '@/components/common/ResetButton'
import TextField from '@/components/common/TextField'
import Loader from '@/components/common/Loader'
import { useSignUpForm } from '@/hooks'

type Props = {
  funcCloseModal: () => void
  setBSignUp: React.Dispatch<React.SetStateAction<boolean>>
}

/**
 * @description login form
 * @param {Object} props component props
 * @returns {JSX} markup, form with input fields and buttons
 */
const SignUpForm: React.FC<Props> = ({ funcCloseModal, setBSignUp }) => {
  const router = useRouter()

  const handleSubmitSuccess = () => {
    funcCloseModal()
    router.push('/signup-complete')
  }

  const {
    bFormComplete,
    bShowConfirmPassword,
    bShowPassword,
    bSignUpLoading,
    handleBlur,
    handleChange,
    handleResetForm,
    handleSubmit,
    handleToggleConfirmPassword,
    handleTogglePassword,
    nstrSignUpError,
    objFieldsValidation,
    objFormData,
  } = useSignUpForm({ handleSubmitSuccess })

  if (bSignUpLoading) {
    return (
      <PageBackDrop>
        <Loader strLoadingMessage="Signing up..." />
      </PageBackDrop>
    )
  }
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
        Sign Up
      </Typography>
      <Typography
        sx={{
          color: (theme) => theme.palette.info.main,
          fontSize: '.75rem',
          marginBottom: (theme) => theme.spacing(1),
        }}
      >
        Already registered ?
        <Button
          endIcon={<ExitToAppIcon />}
          onClick={() => setBSignUp(false)}
          sx={{
            color: 'inherit',
            fontSize: 'inherit',
            paddingBottom: 0,
            paddingTop: 0,
            marginBottom: 0,
          }}
        >
          Log in
        </Button>
      </Typography>
      <Typography color="secondary">
        currently signup service is unavailable. Please, use sample credentils at the login
        <Button
          endIcon={<ExitToAppIcon />}
          onClick={() => setBSignUp(false)}
          sx={{ color: 'inherit', fontSize: 'inherit', paddingBottom: 0, paddingTop: 0, marginBottom: 0 }}
        >
          Log in
        </Button>
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
        {nstrSignUpError && (
          <Typography sx={{ color: (theme) => theme.palette.error.main }}>{nstrSignUpError}</Typography>
        )}
        <FormControl>
          <TextField
            type="text"
            label="Email"
            variant="outlined"
            strFieldname="email"
            strValue={objFormData.email}
            handleChange={handleChange}
            handleBlur={handleBlur}
            objValidation={objFieldsValidation.email}
            required
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
            handleBlur={handleBlur}
            objValidation={objFieldsValidation.password}
            required
            InputProps={{
              endAdornment: (
                <ShowPasswordButton
                  bShowPassword={bShowPassword}
                  handleClick={handleTogglePassword}
                  bDisabled={objFormData.password.length === 0}
                />
              ),
            }}
          />
        </FormControl>
        <FormControl>
          <TextField
            label="Confirm Password"
            variant="outlined"
            type={bShowConfirmPassword ? 'text' : 'password'}
            strFieldname="confirm_password"
            strValue={objFormData.confirm_password}
            handleChange={handleChange}
            handleBlur={handleBlur}
            objValidation={objFieldsValidation.confirm_password}
            required
            disabled={!objFieldsValidation.password.bIsValid}
            InputProps={{
              endAdornment: (
                <ShowPasswordButton
                  bShowPassword={bShowConfirmPassword}
                  handleClick={handleToggleConfirmPassword}
                  bDisabled={objFormData.confirm_password.length === 0}
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
          <SubmitButton disabled={!bFormComplete}>submit</SubmitButton>
          <ResetButton onClick={handleResetForm}>reset</ResetButton>
        </FormControl>
      </Box>
    </Fragment>
  )
}

export default SignUpForm
