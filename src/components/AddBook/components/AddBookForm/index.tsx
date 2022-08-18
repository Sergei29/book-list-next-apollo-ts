import React from 'react'

import BookForm from '@/components/BookForm'
import { useAddBookForm } from '@/hooks'

type Props = {
  nStrSelectedBookId: string | null
  onSumbit?: () => void
}

const AddBookForm: React.FC<Props> = ({ nStrSelectedBookId, onSumbit }) => {
  const {
    bFormValid,
    handleBlur,
    handleChange,
    handleChangeImage,
    handleSubmit,
    uObjImageFile,
    objAddBookMutationResponse,
    objBook,
    objFormValidation,
  } = useAddBookForm(nStrSelectedBookId, onSumbit)

  return (
    <BookForm
      bFormValid={bFormValid}
      handleBlur={handleBlur}
      handleChangeImage={handleChangeImage}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      objNewBook={objBook}
      objBookMutationResponse={objAddBookMutationResponse}
      objFormValidation={objFormValidation}
      uObjImageFile={uObjImageFile}
    />
  )
}

export default AddBookForm
