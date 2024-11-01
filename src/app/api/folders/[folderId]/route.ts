import { auth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";
import prisma from "../../../../../prisma/client";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ folderId: string }> },
) {
  try {
    const { userId } = await auth();
    const { folderId } = await params;

    const folder = await prisma.folder.findFirst({
      where: {
        id: folderId,
        userId: userId!,
      },
    });

    if (!folder) {
      return Response.json({ error: "Folder not found" }, { status: 404 });
    }

    return Response.json({ content: { folder: folder } }, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Failed to get folders" }, { status: 500 });
  }
}
