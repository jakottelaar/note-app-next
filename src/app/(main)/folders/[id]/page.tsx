"use client";
import { Button } from "@/components/ui/button";
import { Note } from "@prisma/client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const FoldersOverviewPage = ({ params }: { params: { id: string } }) => {
  const [notes, setNotes] = useState<Note[]>([]);

  const { id } = useParams();

  useEffect(() => {
    fetchNotes();
  }, [id]);

  async function fetchNotes() {
    try {
      const response = await fetch(`/api/folders/${id}/notes`);

      if (response.ok) {
        const data = await response.json();
        setNotes(data);
      }
    } catch (error) {
      console.error("Failed to fetch notes", error);
    }
  }

  return (
    <div className="grid h-full w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {notes.length > 0 ? (
        notes.map((note) => (
          <div key={note.id} className="rounded-md border border-gray-200 p-4">
            <h1 className="text-lg font-bold">{note.title}</h1>
            <p>{note.content}</p>
          </div>
        ))
      ) : (
        <>
          <h1>No notes yet</h1>
          <Button>Create note</Button>
        </>
      )}
    </div>
  );
};

export default FoldersOverviewPage;
