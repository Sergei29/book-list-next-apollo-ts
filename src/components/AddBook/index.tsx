import React, { useState, Fragment } from 'react'
import { Dialog, DialogContent, DialogTitle, Typography, lighten } from '@mui/material'

import AddButton from '@/components/AddButton'
import AddBookForm from './components/AddBookForm'

type Props = {
  nStrSelectedBookId: null | string
}

/**
 * @description add new book form
 * @param {String | null} nStrSelectedBookId selected book ID
 * @returns {JSX} component markup
 */
const AddBook: React.FC<Props> = ({ nStrSelectedBookId }) => {
  const [bDisplayModal, setBDisplayModal] = useState<boolean>(false)

  /**
   * @description open modal
   * @returns {undefined}
   */
  const handleModalOpen = () => setBDisplayModal(true)

  /**
   * @description close modal
   * @returns {undefined}
   */
  const handleModalClose = () => setBDisplayModal(false)

  return (
    <Fragment>
      <AddButton handleClick={handleModalOpen} title="Add New Book" />
      <Dialog open={bDisplayModal} onClose={handleModalClose}>
        <DialogTitle
          sx={{
            display: 'flex',
            backgroundColor: (theme) => lighten(theme.palette.common.black, 0.02),
            color: (theme) => theme.palette.info.main,
            borderBottom: (theme) => `1px solid ${theme.palette.info.main}`,
          }}
        >
          <Typography>Add new book</Typography>
        </DialogTitle>
        <DialogContent
          sx={{
            backgroundColor: (theme) => lighten(theme.palette.common.black, 0.02),
          }}
        >
          <AddBookForm nStrSelectedBookId={nStrSelectedBookId} onSumbit={handleModalClose} />
        </DialogContent>
      </Dialog>
    </Fragment>
  )
}

export default AddBook
