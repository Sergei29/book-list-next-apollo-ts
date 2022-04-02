import { ApolloError } from 'apollo-server-errors'
import { getAllNotes, getNoteById, addNewNote, deleteNoteById, updateNote } from '../../../../db'

export const resolvers = {
  Query: {
    // getNotes: () => getAllNotes(),
    getNotes: () => [{ id: '62473c65d234343674689442', title: 'My 1st note title' }],
    getNoteById: (
      parent: Record<string, any>,
      args: Record<string, any>,
      context: Record<string, any>,
      info: Record<string, any>,
    ) => {
      // const foundNote = getNoteById(args.id)
      const foundNote = { id: '62473c65d234343674689442', title: 'My 1st note title' }
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
        // const newNote = addNewNote(args.note)
        const newNote = { id: '62473c65d234343674689442', title: 'My 1st note title' }
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
      // const deletedId = deleteNoteById(args.id)
      const deletedId = { id: '62473c65d234343674689442', title: 'My 1st note title' }
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
      // const updatedNote = updateNote(args.note)
      const updatedNote = { id: '62473c65d234343674689442', title: 'My 1st note title' }
      if (!updatedNote) {
        throw new ApolloError("Note doesn't exist")
      }
      return updatedNote
    },
  },
}
