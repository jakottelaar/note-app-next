import { auth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";
import prisma from "../../../../prisma/client";
import { z } from "zod";

const folderSchema = z.object({
  name: z.string(),
});

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();

    const body = await req.json();

    const validation = folderSchema.safeParse(body);

    if (!validation.success) {
      return Response.json({ error: validation.error.errors }, { status: 400 });
    }

    const folder = await prisma.folder.create({
      data: {
        name: validation.data.name,
        userId: userId!,
      },
    });

    return Response.json({ content: { folder: folder } }, { status: 201 });
  } catch (error) {
    return Response.json({ error: "Failed to create folder" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth();

    const folders = await prisma.folder.findMany({
      where: {
        userId: userId!,
      },
    });

    return Response.json({ content: { folders: folders } }, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Failed to get folders" }, { status: 500 });
  }
}
