import { ApolloError } from 'apollo-server-errors'
import { IResolver } from '../../../types'

export const resolvers: IResolver = {
  Query: {
    getNotes: (parent, args, ctx, info) => ctx.dataSource.getAllNotes(),
    getNoteById: (parent, args, ctx, info) => {
      const foundNote = ctx.dataSource.getNoteById(args.id)
      if (!foundNote) {
        throw new ApolloError('Note not found')
      }
      return foundNote
    },
  },
  Mutation: {
    addNote: (parent, args, ctx, info) => {
      try {
        const newNote = ctx.dataSource.addNewNote(args.note)
        return newNote
      } catch (error) {
        throw new ApolloError('Failed to add new note')
      }
    },
    deleteNoteById: (parent, args, ctx, info) => {
      const deletedNote = ctx.dataSource.deleteNoteById(args.id)
      if (!deletedNote) {
        throw new ApolloError("Note doesn't exist")
      }
      return deletedNote
    },
    updateNote: (parent, args, ctx, info) => {
      const updatedNote = ctx.dataSource.updateNote(args.note)
      if (!updatedNote) {
        throw new ApolloError("Note doesn't exist")
      }
      return updatedNote
    },
  },
}
