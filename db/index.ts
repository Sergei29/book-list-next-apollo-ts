import { prisma } from '../prisma/prisma'
import { Note } from '../src/types'

export const getAllNotes = async () => await prisma.notes.findMany()

export const getNoteById = async (id: string) =>
  await prisma.notes.findUnique({
    where: { id },
  })

export const addNewNote = async (noteData: Note) =>
  await prisma.notes.create({
    data: noteData,
  })

export const deleteNoteById = async (id: string) =>
  await prisma.notes.delete({
    where: { id },
  })

export const updateNote = async ({ id, ...restNoteData }: Note) =>
  await prisma.notes.update({
    where: { id },
    data: { ...restNoteData },
  })
