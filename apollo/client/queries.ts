import { gql } from '@apollo/client'

export const GET_ALL_NOTES = gql`
  query GetAllANotes {
    getNotes {
      id
      title
    }
  }
`

export const GET_NOTE_BY_ID = gql`
  query GetNoteById($id: ID!) {
    getNoteById(id: $id) {
      id
      title
      description
    }
  }
`
