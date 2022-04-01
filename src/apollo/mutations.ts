import { gql } from '@apollo/client'

export const ADD_NEW_NOTE = gql`
  mutation AddNewNote($note: NoteData!) {
    addNote(note: $note) {
      id
      title
    }
  }
`

export const DELETE_NOTE_BY_ID = gql`
  mutation DeleteNoteById($id: ID!) {
    deleteNoteById(id: $id) {
      id
      title
    }
  }
`

export const UPDATE_NOTE = gql`
  mutation UpdateNote($note: NoteDataExisting!) {
    updateNote(note: $note) {
      id
      title
      description
    }
  }
`
