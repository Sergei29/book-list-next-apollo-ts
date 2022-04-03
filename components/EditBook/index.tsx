import React, { Fragment } from 'react'
import { Typography, DialogContent, DialogTitle, lighten } from '@mui/material'
import { useBookDetails } from '../../hooks'
import EditBookForm from './components/EditBookForm'

type Props = {
  strSelectedBookId: string
  onSumbit?: () => void
}

/**
 * @description edit selected book
 * @param {String} strSelectedBookId current selected book ID
 * @param {Function | undefined} onSumbit on submit callback, optional
 * @returns {JSX} markup
 */
const EditBook: React.FC<Props> = ({ strSelectedBookId, onSumbit }) => {
  const { data, loading, error } = useBookDetails({
    strBookId: strSelectedBookId,
  })

  /**
   * @description render current book editor
   * @returns {JSX} loading | error | edit book form
   */
  const renderBookEditor = () => {
    if (loading) return <Typography>Loading book details...</Typography>
    if (error) return <Typography>Error: {error.message}</Typography>
    if (!data?.book) return <Typography>No book details found.</Typography>
    return <EditBookForm objSelectedBook={data?.book} onSumbit={onSumbit} />
  }

  return (
    <Fragment>
      <DialogTitle
        sx={{
          display: 'flex',
          backgroundColor: (theme) => lighten(theme.palette.common.black, 0.02),
          color: (theme) => theme.palette.info.main,
          borderBottom: (theme) => `1px solid ${theme.palette.info.main}`,
        }}
      >
        {!!data?.book && <Typography>{`Edit  ${data?.book.name}`}</Typography>}
      </DialogTitle>
      <DialogContent
        sx={{
          backgroundColor: (theme) => lighten(theme.palette.common.black, 0.02),
        }}
      >
        {renderBookEditor()}
      </DialogContent>
    </Fragment>
  )
}

export default EditBook
