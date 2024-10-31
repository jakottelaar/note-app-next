import { auth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";
import prisma from "../../../../../../prisma/client";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const folderId = params.id;

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
