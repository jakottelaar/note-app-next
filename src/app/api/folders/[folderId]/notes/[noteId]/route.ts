import { auth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";
import prisma from "../../../../../../../prisma/client";

export async function GET(
  next: NextRequest,
  { params }: { params: { folderId: string; noteId: string } },
) {
  try {
    const { userId } = await auth();

    const note = await prisma.note.findUnique({
      where: {
        id: params.noteId,
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
