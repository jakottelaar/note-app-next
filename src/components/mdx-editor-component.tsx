"use client";

import {
  BoldItalicUnderlineToggles,
  Button,
  MDXEditor,
  MDXEditorMethods,
  UndoRedo,
  headingsPlugin,
  linkPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  quotePlugin,
  toolbarPlugin,
} from "@mdxeditor/editor";
import { FC, useEffect, useState } from "react";
import "@mdxeditor/editor/style.css";

interface EditorProps {
  markdown: string;
  editorRef?: React.MutableRefObject<MDXEditorMethods | null>;
  onSave: (content: string) => void;
}

const Editor: FC<EditorProps> = ({ markdown, editorRef, onSave }) => {
  const [content, setContent] = useState<string>(markdown);

  useEffect(() => {
    setContent(markdown);
  }, [markdown]);

  const saveChanges = () => {
    if (editorRef?.current) {
      const currentContent = editorRef.current.getMarkdown();
      onSave(currentContent);
    }
  };

  return (
    <MDXEditor
      onChange={(newContent) => setContent(newContent)}
      ref={editorRef}
      markdown={markdown}
      plugins={[
        toolbarPlugin({
          toolbarContents: () => (
            <>
              <UndoRedo />
              <BoldItalicUnderlineToggles />
              <Button onClick={saveChanges}>Save</Button>
            </>
          ),
        }),
        headingsPlugin(),
        listsPlugin(),
        linkPlugin(),
        quotePlugin(),
        markdownShortcutPlugin(),
      ]}
    />
  );
};

export default Editor;
