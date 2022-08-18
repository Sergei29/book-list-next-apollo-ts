import React, { Fragment } from 'react'
import MuiTextField, { TextFieldProps } from '@mui/material/TextField'
import { FormHelperText } from '@mui/material'

import { ValidationType } from '@/types'

type Props = {
  handleChange: (strFieldName: string, strValue: string) => void
  handleBlur?: (strFieldName: string, strValue: string) => void
  objValidation?: ValidationType
  strFieldname: string
  strValue: string
  strCustomClass?: string
} & TextFieldProps

/**
 * @description common component, textfield input
 * @param {Function} handleChange handler change field value on input
 * @param {Function} handleBlur handler to run on blur
 * @param {Object} objValidation field validation state
 * @param {String} strFieldname field name
 * @param {String} strCustomClass custom class
 * @param {Object} restMuiTextFieldProps MUI TextField props
 * @returns {JSX} component markup
 */
const TextField: React.FC<Props> = ({
  handleChange,
  handleBlur = () => {},
  objValidation = { bIsValid: true, strErrorMessage: '' },
  strFieldname,
  strValue,
  strCustomClass = '',
  ...restMuiTextFieldProps
}) => {
  /**
   * @description input field change handler
   * @param {Object} objEvent change event object
   * @returns { undefined } sets state
   */
  const onInputChange = (objEvent: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = objEvent.target
    handleChange(name, value)
  }

  /**
   * @description input field blur handler
   * @param {Object} objEvent focus event object
   * @returns { undefined } sets state
   */
  const onInputBlur = (objEvent: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = objEvent.target
    handleBlur(name, value)
  }

  const { sx, ...restTextFieldProps } = restMuiTextFieldProps

  return (
    <Fragment>
      <MuiTextField
        sx={{
          paddingRight: (theme) => theme.spacing(0.5),
          boxSizing: 'border-box',
          borderRadius: 4,
          backgroundColor: (theme) => theme.palette.info.main,
          border: (theme) => `1px solid ${theme.palette.secondary.dark}`,
          color: (theme) => theme.palette.secondary.dark,
          '& > label': { color: (theme) => theme.palette.secondary.dark },
          '& > div > fieldset': {
            border: 'none',
            '&:hover': {
              outline: 'none',
            },
          },
          '&:hover': {
            backgroundColor: (theme) => theme.palette.info.main,
            color: (theme) => theme.palette.secondary.dark,
            outline: 'none',
          },
          '&:active': {
            backgroundColor: (theme) => theme.palette.info.main,
            color: (theme) => theme.palette.secondary.dark,
            outline: 'none',
          },
          '&:focus': {
            backgroundColor: (theme) => theme.palette.info.main,
            color: (theme) => theme.palette.secondary.dark,
            outline: 'none',
          },
          '&::selection': {
            backgroundColor: (theme) => theme.palette.info.main,
            color: (theme) => theme.palette.secondary.dark,
            outline: 'none',
          },
          ...sx,
        }}
        error={!objValidation.bIsValid}
        name={strFieldname}
        value={strValue}
        variant="outlined"
        onChange={onInputChange}
        onBlur={onInputBlur}
        {...restTextFieldProps}
      />
      {!objValidation.bIsValid && (
        <FormHelperText
          sx={{
            color: (theme) => theme.palette.error.main,
            paddingLeft: (theme) => theme.spacing(2),
          }}
        >
          {objValidation.strErrorMessage}
        </FormHelperText>
      )}
    </Fragment>
  )
}

export default TextField
