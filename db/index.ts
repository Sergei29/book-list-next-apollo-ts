import { Note } from '../src/types'
import { PrismaClient } from '@prisma/client'

export const generateDataSource = (prisma: PrismaClient) => ({
  getAllNotes: async () => await prisma.notes.findMany(),
  getNoteById: async (id: string) =>
    await prisma.notes.findUnique({
      where: { id },
    }),
  addNewNote: async (noteData: Note) =>
    await prisma.notes.create({
      data: noteData,
    }),
  deleteNoteById: async (id: string) =>
    await prisma.notes.delete({
      where: { id },
    }),
  updateNote: async ({ id, ...restNoteData }: Note) =>
    await prisma.notes.update({
      where: { id },
      data: { ...restNoteData },
    }),
})
