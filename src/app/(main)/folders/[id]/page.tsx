"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Note } from "@prisma/client";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const FoldersOverviewPage = ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const router = useRouter();

  const { id } = useParams();

  useEffect(() => {
    fetchNotes();
  }, [id]);

  async function fetchNotes() {
    try {
      const response = await fetch(`/api/folders/${id}/notes`);

      if (response.ok) {
        const data = await response.json();
        setNotes(data.content.notes);
      }
    } catch (error) {
      console.error("Failed to fetch notes", error);
    }
  }

  async function handleCreateNote() {
    try {
      const response = await fetch(`/api/folders/${id}/notes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: "New Note", content: "some content" }),
      });

      if (response.ok) {
        fetchNotes();
      }
    } catch (error) {
      console.error("Failed to create note", error);
    }
  }

  const CreateNoteCard = () => (
    <Card
      onClick={handleCreateNote}
      className="group flex items-center justify-center border-2 border-dashed border-muted bg-transparent transition-all hover:cursor-pointer hover:border-primary"
    >
      <div className="flex flex-col items-center gap-2 text-muted-foreground group-hover:text-primary">
        <Plus className="h-8 w-8" />
        <p className="text-xl font-medium">New Note</p>
      </div>
    </Card>
  );

  return (
    <div className="grid h-full w-full grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {notes.length > 0 ? (
        <>
          <CreateNoteCard />
          {notes.map((note: Note) => (
            <Card
              key={note.id}
              className="flex cursor-pointer flex-col transition-all hover:border-white"
              onClick={() => router.push(`/folders/${id}/notes/${note.id}`)}
            >
              <CardHeader>
                <CardTitle className="line-clamp-1">{note.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="line-clamp-4 text-muted-foreground">
                  {note.content}
                </p>
              </CardContent>
            </Card>
          ))}
        </>
      ) : (
        <CreateNoteCard />
      )}
    </div>
  );
};

export default FoldersOverviewPage;
