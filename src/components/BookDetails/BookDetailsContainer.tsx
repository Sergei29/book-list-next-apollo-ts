import React, { useState, Fragment } from 'react'
import { Typography, useMediaQuery, useTheme, Dialog, DialogContent, Box } from '@mui/material'
// components:
import EditBook from '../EditBook'
import BookDetails from './BookDetails'

type Props = {
  nstrBookId: null | string
  handleBookDeselect: () => void
  handleBookSelect: (strBookId: string) => () => void
}

/**
 * @description container for selected book display
 * @param {null| String} {nstrBookId selected book ID}
 * @returns {JSX} markup conditional render
 */
const BookDetailsContainer: React.FC<Props> = ({ nstrBookId, handleBookDeselect, handleBookSelect }) => {
  const theme = useTheme()
  const bIsMediumScreen = useMediaQuery(theme.breakpoints.up('md'))
  const [bShowEditModal, setBShowEditModal] = useState<boolean>(false)

  const handleCloseEditModal = () => setBShowEditModal(false)

  const renderBookDetails = () =>
    bIsMediumScreen ? (
      <Box
        sx={{
          '& > div': {
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            gap: `${theme.spacing(2)}px`,
          },
          position: {
            xs: 'relative',
            md: 'fixed',
          },
          top: {
            xs: 'unset',
            md: 0,
          },
          right: {
            xs: 'unset',
            md: 0,
          },
          width: {
            xs: 'auto',
            md: '40%',
          },
          height: {
            xs: 'auto',
            md: '100%',
          },
          background: (theme) => theme.custom?.bookDetails?.background,
          padding: theme.spacing(3.75),
          overflow: 'auto',
          boxShadow: '-2px -3px 5px rgba(0, 0, 0, 0.3)',
          boxSizing: 'border-box',
          color: (theme) => theme.custom?.bookDetails?.color,
          zIndex: 2,
        }}
      >
        {nstrBookId ? (
          <BookDetails
            strBookId={nstrBookId}
            setBShowEditModal={setBShowEditModal}
            handleBookSelect={handleBookSelect}
          />
        ) : (
          <Typography>No book selected.</Typography>
        )}
      </Box>
    ) : (
      <Dialog open={!!nstrBookId && !bShowEditModal} onClose={handleBookDeselect} fullWidth>
        <DialogContent
          sx={{
            '& > div': {
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              gap: `${theme.spacing(2)}px`,
            },
            position: {
              xs: 'relative',
              md: 'fixed',
            },
            top: {
              xs: 'unset',
              md: 0,
            },
            right: {
              xs: 'unset',
              md: 0,
            },
            width: {
              xs: 'auto',
              md: '40%',
            },
            height: {
              xs: 'auto',
              md: '100%',
            },
            background: (theme) => theme.custom?.bookDetails?.background,
            padding: theme.spacing(3.75),
            overflow: 'auto',
            boxShadow: '-2px -3px 5px rgba(0, 0, 0, 0.3)',
            boxSizing: 'border-box',
            color: (theme) => theme.custom?.bookDetails?.color,
            zIndex: 2,
          }}
        >
          {nstrBookId && (
            <BookDetails
              strBookId={nstrBookId}
              setBShowEditModal={setBShowEditModal}
              handleBookSelect={handleBookSelect}
            />
          )}
        </DialogContent>
      </Dialog>
    )

  return (
    <Fragment>
      {renderBookDetails()}
      <Dialog open={bShowEditModal && !!nstrBookId} onClose={handleCloseEditModal} fullWidth>
        <EditBook strSelectedBookId={nstrBookId!} onSumbit={handleCloseEditModal} />
      </Dialog>
    </Fragment>
  )
}

export default BookDetailsContainer
