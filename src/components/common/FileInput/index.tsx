import React, { Fragment, useRef } from 'react'
import Button, { ButtonProps } from '@mui/material/Button'
import FormHelperText from '@mui/material/FormHelperText'
import { AddAPhoto as AddAPhotoIcon } from '@mui/icons-material'
import { ValidationType } from '../../../types'

type Props = {
  handleChange: (strFieldName: string, objFileValue: InstanceType<typeof File>) => void
  handleBlur?: (strFieldName: string, objFileValue: InstanceType<typeof File>) => void
  objValidation?: ValidationType
  strFieldName: string
  objFileValue?: InstanceType<typeof File>
  strCustomClass?: string
} & Omit<ButtonProps, 'onClick' | 'onBlur' | 'endIcon' | 'color' | 'variant'>

/**
 * @description common component, textfield input
 * @param {Function} handleChange handler change field value on input
 * @param {Function} handleBlur handler to run on blur
 * @param {Object} objValidation field validation state
 * @param {String} strFieldName field name
 * @param {String} objFileValue field value
 * @param {String} strCustomClass custom class
 * @param {Object} restButtonProps MUI button props
 * @returns {JSX} component markup
 */
const FileInput: React.FC<Props> = ({
  handleChange,
  handleBlur,
  objValidation = { bIsValid: true, strErrorMessage: '' },
  strFieldName,
  objFileValue,
  strCustomClass,
  ...restButtonProps
}) => {
  const hiddenFileInputRef = useRef<null | HTMLInputElement>(null)
  /**
   * @description input field change handler
   * @param {Object} objEvent change event object
   * @returns { undefined } sets state
   */
  const onInputChange = (objEvent: React.ChangeEvent<HTMLInputElement>) => {
    if (!objEvent.target.files) return
    const objFile = objEvent.target.files[0]
    const strFieldName = objEvent.target.name
    handleChange(strFieldName, objFile)
  }

  /**
   * @description input field blur handler
   * @param {Object} objEvent focus event object
   * @returns { undefined } sets state
   */
  const onInputBlur = (objEvent: React.FocusEvent<HTMLInputElement>) => {
    if (!objEvent.target.files || !handleBlur) return
    const objFile = objEvent.target.files[0]
    const strFieldName = objEvent.target.name
    handleBlur(strFieldName, objFile)
  }

  const handleButtonClick = (objEvent: React.MouseEvent) => {
    hiddenFileInputRef.current!.click()
  }
  const { sx, ...restMuiButtonProps } = restButtonProps

  return (
    <Fragment>
      <Button
        variant="outlined"
        color="secondary"
        onClick={handleButtonClick}
        endIcon={<AddAPhotoIcon />}
        sx={{
          boxSizing: 'border-box',
          borderRadius: 4,
          backgroundColor: (theme) => theme.palette.info.main,
          border: (theme) => `1px solid ${theme.palette.secondary.dark}`,
          color: (theme) => theme.palette.secondary.dark,
          textTransform: 'capitalize',
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
        {...restMuiButtonProps}
      >
        Upload image
      </Button>
      <input
        ref={hiddenFileInputRef}
        type="file"
        name={strFieldName}
        onChange={onInputChange}
        onBlur={onInputBlur}
        style={{ display: 'none' }}
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

export default FileInput
