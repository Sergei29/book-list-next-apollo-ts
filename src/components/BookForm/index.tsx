import React from 'react'
import { MutationResult, useQuery } from '@apollo/client'
import {
  MenuBook as MenuBookIcon,
  AccountBox as AccountBoxIcon,
  Description as DescriptionIcon,
  CollectionsBookmark as CollectionsBookmarkIcon,
} from '@mui/icons-material'
import { InputAdornment, MenuItem, CardMedia, Typography, Box } from '@mui/material'
import { GET_AUTHORS } from '../../apollo'
import TextField from '../common/TextField'
import FileInput from '../common/FileInput'
import SubmitButton from '../common/SubmitButton'
import { NewBookFormStateType, Author, FormValidationStateType } from '../../types'

type Props = {
  bEditBook?: boolean
  bFormValid: boolean
  handleBlur: (strFieldName: string, strFieldValue: string) => void
  handleChange: (strFieldName: string, mixedValue: string | Record<string, any>) => void
  handleChangeImage: (strFieldName: string, objImageFile?: File | undefined) => void
  handleSubmit: (objEvent: React.FormEvent) => void
  objNewBook: NewBookFormStateType
  objBookMutationResponse: MutationResult<any>
  objFormValidation: FormValidationStateType
  uObjImageFile: File | undefined
}

const BookForm: React.FC<Props> = ({
  bEditBook = false,
  bFormValid,
  handleBlur,
  handleChangeImage,
  handleChange,
  handleSubmit,
  objNewBook,
  objBookMutationResponse,
  objFormValidation,
  uObjImageFile,
}) => {
  const { error: objMutationError, loading: bMutationLoading } = objBookMutationResponse

  const objAuthorsQueryResponse = useQuery<{ authors: Author[] }>(GET_AUTHORS)

  /**
   * @description display authors select options
   * @returns {JSX} markup
   */
  const displayAuthors = () => {
    const { data, loading, error } = objAuthorsQueryResponse

    if (loading) return <MenuItem>loading authors...</MenuItem>
    if (error) return <MenuItem>no authors.</MenuItem>
    if (!data) return <MenuItem>no authors.</MenuItem>

    if (data!.authors) {
      return data!.authors.map((objAuthor: Author | null) => (
        <MenuItem value={objAuthor!.id} key={objAuthor!.id}>
          {objAuthor!.name!}
        </MenuItem>
      ))
    }
  }

  if (bMutationLoading) {
    return (
      <Box
        sx={{
          padding: {
            xs: 0,
            sm: (theme) => theme.spacing(2.5),
          },
          display: 'flex',
          flexDirection: 'column',
          rowGap: (theme) => `${theme.spacing(2)}px`,
          minWidth: {
            xs: 200,
            sm: 320,
          },
        }}
      >
        <Typography
          sx={{
            color: (theme) => theme.palette.info.main,
          }}
        >
          {bEditBook ? 'Updating...' : 'Creating...'}
        </Typography>
      </Box>
    )
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        padding: {
          xs: 0,
          sm: (theme) => theme.spacing(2.5),
        },
        display: 'flex',
        flexDirection: 'column',
        rowGap: (theme) => `${theme.spacing(2)}px`,
        minWidth: {
          xs: 200,
          sm: 320,
        },
      }}
    >
      {objMutationError && (
        <Box
          component="span"
          sx={{
            color: (theme) => theme.palette.secondary.dark,
          }}
        >
          {objMutationError.message}
        </Box>
      )}
      <Box
        sx={{
          display: 'flex',
          flexDirection: {
            xs: 'column',
            sm: 'row',
          },
          columnGap: (theme) => `${theme.spacing(2)}px`,
          '& > div': {
            display: 'flex',
            flexDirection: 'column',
            rowGap: (theme) => `${theme.spacing(2)}px`,
            maxWidth: 240,
          },
        }}
      >
        <Box>
          <TextField
            label="Name"
            strFieldname="name"
            strValue={objNewBook.name}
            handleChange={handleChange}
            handleBlur={handleBlur}
            objValidation={objFormValidation.name}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <MenuBookIcon color="secondary" />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Genre"
            strFieldname="genre"
            strValue={objNewBook.genre}
            handleChange={handleChange}
            handleBlur={handleBlur}
            objValidation={objFormValidation.genre}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <CollectionsBookmarkIcon color="secondary" />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            select
            label="Author"
            strFieldname="authorId"
            strValue={objNewBook.authorId}
            handleChange={handleChange}
            handleBlur={handleBlur}
            objValidation={objFormValidation.authorId}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <AccountBoxIcon color="secondary" />
                </InputAdornment>
              ),
            }}
          >
            {displayAuthors()}
          </TextField>
          <TextField
            label="Description"
            strFieldname="description"
            strValue={objNewBook.description}
            handleChange={handleChange}
            handleBlur={handleBlur}
            objValidation={objFormValidation.description}
            multiline
            rows={6}
            InputProps={{
              endAdornment: (
                <InputAdornment
                  position="end"
                  sx={{
                    alignSelf: 'flex-start',
                    marginTop: (theme) => theme.spacing(1),
                  }}
                >
                  <DescriptionIcon color="secondary" />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box>
          <FileInput
            strFieldName="strBase64ImageFile"
            objValidation={objFormValidation.strBase64ImageFile}
            objFileValue={uObjImageFile}
            handleChange={handleChangeImage}
            sx={{
              display: 'flex',
              padding: (theme) => `${theme.spacing(2)}px ${theme.spacing(6)}px`,
            }}
          />
          {objNewBook.strBase64ImageFile && <CardMedia component="img" src={objNewBook.strBase64ImageFile} />}
        </Box>
      </Box>

      <Box>
        <SubmitButton type="submit" disabled={!bFormValid || bMutationLoading}>
          {bEditBook ? 'Update Book' : 'Add Book'}
        </SubmitButton>
      </Box>
    </Box>
  )
}

export default BookForm
