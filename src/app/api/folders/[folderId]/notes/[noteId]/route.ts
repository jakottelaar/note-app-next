import { auth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";
import prisma from "../../../../../../../prisma/client";
import { z } from "zod";

const noteSchema = z.object({
  content: z.string(),
  title: z.string(),
});

export async function GET(
  next: NextRequest,
  { params }: { params: Promise<{ folderId: string; noteId: string }> },
) {
  try {
    const { userId } = await auth();

    const { folderId, noteId } = await params;

    const note = await prisma.note.findUnique({
      where: {
        id: noteId,
      },
    });

    if (!note || note.userId !== userId) {
      return Response.json({ error: "Note not found" }, { status: 404 });
    }

    return Response.json({ content: { note: note } }, { status: 200 });
  } catch (error) {
    return Response.json({ error: "Failed to get notes" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ folderId: string; noteId: string }> },
) {
  try {
    const { userId } = await auth();

    const { folderId, noteId } = await params;

    const body = await req.json();

    const validation = noteSchema.safeParse(body);

    if (!validation.success) {
      return Response.json({ error: validation.error.errors }, { status: 400 });
    }

    const note = await prisma.note.findUnique({
      where: {
        id: noteId,
      },
    });

    if (!note || note.userId !== userId) {
      return Response.json({ error: "Note not found" }, { status: 404 });
    }

    const updateNote = await prisma.note.update({
      where: {
        id: noteId,
      },
      data: {
        content: validation.data.content,
        title: validation.data.title,
      },
    });

    return Response.json({ content: { note: updateNote } }, { status: 200 });
  } catch (error) {
    return Response.json({ error: "Failed to update note" }, { status: 500 });
  }
}
