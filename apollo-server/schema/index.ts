import { gql } from 'apollo-server-micro'

export const typeDefs = gql`
  input NoteDataNew {
    title: String!
    description: String!
  }
  input NoteDataExisting {
    id: ID!
    title: String
    description: String
  }

  type Note {
    id: ID!
    title: String!
    description: String!
  }

  type Query {
    getNotes: [Note]
    getNoteById(id: ID!): Note
  }

  type Mutation {
    addNote(note: NoteDataNew!): Note
    deleteNoteById(id: ID!): Note
    updateNote(note: NoteDataExisting!): Note
  }
`
