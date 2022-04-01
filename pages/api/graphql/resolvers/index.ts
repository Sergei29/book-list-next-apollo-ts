import { ApolloError } from 'apollo-server-errors'
import { getAllNotes, getNoteById, addNewNote, deleteNoteById, updateNote } from '../../../../db'

export const resolvers = {
  Query: {
    getNotes: () => getAllNotes(),
    getNoteById: (
      parent: Record<string, any>,
      args: Record<string, any>,
      context: Record<string, any>,
      info: Record<string, any>,
    ) => {
      const foundNote = getNoteById(args.id)
      if (!foundNote) {
        throw new ApolloError('Note not found')
      }
      return foundNote
    },
  },
  Mutation: {
    addNote: (
      parent: Record<string, any>,
      args: Record<string, any>,
      context: Record<string, any>,
      info: Record<string, any>,
    ) => {
      try {
        const newNote = addNewNote(args.note)
        return newNote
      } catch (error) {
        throw new ApolloError('Failed to add new note')
      }
    },
    deleteNoteById: (
      parent: Record<string, any>,
      args: Record<string, any>,
      context: Record<string, any>,
      info: Record<string, any>,
    ) => {
      const deletedId = deleteNoteById(args.id)
      if (!deletedId) {
        throw new ApolloError("Note doesn't exist")
      }
      return deletedId
    },
    updateNote: (
      parent: Record<string, any>,
      args: Record<string, any>,
      context: Record<string, any>,
      info: Record<string, any>,
    ) => {
      const updatedNote = updateNote(args.note)
      if (!updatedNote) {
        throw new ApolloError("Note doesn't exist")
      }
      return updatedNote
    },
  },
}
