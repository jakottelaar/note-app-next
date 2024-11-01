"use client";
import { Note } from "@prisma/client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const NotePage = ({
  params,
}: {
  params: Promise<{ id: string; noteId: string }>;
}) => {
  const { id, noteId } = useParams();
  const [note, setNote] = useState<Note | null>(null);

  async function fetchNote() {
    try {
      const response = await fetch(`/api/folders/${id}/notes/${noteId}`);

      if (response.ok) {
        const data = await response.json();
        setNote(data.content.note);
      }
    } catch (error) {
      console.error("Failed to fetch note", error);
    }
  }

  useEffect(() => {
    fetchNote();
  }, [id, noteId]);

  return (
    <div className="dark:text-white">
      <h1>{note?.title}</h1>
    </div>
  );
};

export default NotePage;
