"use client";
import { MDXEditorMethods } from "@mdxeditor/editor";
import { Note } from "@prisma/client";
import { LoaderCircle } from "lucide-react";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const EditorComp = dynamic(() => import("@/components/mdx-editor-component"), {
  ssr: false,
});

const NotePage = ({
  params,
}: {
  params: Promise<{ id: string; noteId: string }>;
}) => {
  const { id, noteId } = useParams();
  const [note, setNote] = useState<Note | null>(null);
  const [markdown, setMarkdown] = useState<string>("");
  const editorRef = useRef<MDXEditorMethods | null>(null);
  const [loading, setLoading] = useState(true);

  async function fetchNote() {
    try {
      const response = await fetch(`/api/folders/${id}/notes/${noteId}`);
      if (response.ok) {
        const data = await response.json();
        setNote(data.content.note);
        setMarkdown(data.content.note.content);
      }
    } catch (error) {
      console.error("Failed to fetch note", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchNote();
  }, [id, noteId]);

  const handleSave = async (content: string) => {
    try {
      const response = await fetch(`/api/folders/${id}/notes/${noteId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content,
          title: note?.title,
        }),
      });

      if (response.ok) {
        console.log("Saved successfully");
      } else {
        console.error("Failed to save");
      }
    } catch (error) {
      console.error("Error saving note:", error);
    }
  };

  return (
    <div className="dark:text-white">
      {loading ? (
        <LoaderCircle className="animate-spin" />
      ) : (
        <>
          <h1 className="mb-4 text-2xl">{note?.title}</h1>
          <EditorComp
            markdown={markdown}
            editorRef={editorRef}
            onSave={handleSave}
          />
        </>
      )}
    </div>
  );
};

export default NotePage;
