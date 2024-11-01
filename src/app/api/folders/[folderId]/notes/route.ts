import { auth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";
import prisma from "../../../../../../prisma/client";
import { z } from "zod";

const noteSchema = z.object({
  title: z.string(),
  content: z.string(),
});

export async function POST(
  req: NextRequest,
  { params }: { params: { folderId: string } },
) {
  try {
    const { userId } = await auth();

    const body = await req.json();

    const validation = noteSchema.safeParse(body);

    if (!validation.success) {
      return Response.json({ error: "Invalid note data" }, { status: 400 });
    }

    const note = await prisma.note.create({
      data: {
        ...validation.data,
        folderId: params.folderId,
        userId: userId!,
      },
    });

    return Response.json({ content: { note: note } }, { status: 201 });
  } catch (error) {
    console.error(error);

    return Response.json({ error: "Failed to create note" }, { status: 500 });
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { folderId: string } },
) {
  try {
    const folderId = params.folderId;

    const notes = await prisma.note.findMany({
      where: {
        folderId,
      },
    });

    return Response.json({ content: { notes: notes } }, { status: 200 });
  } catch (error) {
    return Response.json({ error: "Failed to get notes" }, { status: 500 });
  }
}
