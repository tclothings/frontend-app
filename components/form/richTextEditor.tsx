"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import { useEffect } from "react";
import clsx from "clsx";
import Button from "./button";
import Placeholder from "@tiptap/extension-placeholder";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function RichTextEditor({ value, onChange }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
      }),
      Placeholder.configure({
        placeholder: "Start typing your product description...",
      }),
    ],
    content: value || "<p></p>",
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value]);

  if (!editor) return null;

  const setLink = () => {
    const url = window.prompt("Enter a URL");
    if (url) {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    }
  };

  return (
    <div className="space-y-2">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 border rounded-md p-2">
        <Button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={clsx(
            "px-2 py-1 rounded text-[var(--foreground)] hover:cursor-pointer",
            {
              "bg-blue-500 ": editor.isActive("bold"),
              "border border-blue-500": !editor.isActive("bold"),
            }
          )}
          text="Bold"
        />
        <Button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={clsx(
            "px-2 py-1 rounded text-[var(--foreground)] hover:cursor-pointer",
            {
              "bg-blue-500 ": editor.isActive("italic"),
              "border border-blue-500": !editor.isActive("italic"),
            }
          )}
          text="Italic"
        />
        <Button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={clsx(
            "px-2 py-1 rounded text-[var(--foreground)] hover:cursor-pointer",
            {
              "bg-blue-500 ": editor.isActive("heading", { level: 1 }),
              "border border-blue-500": !editor.isActive("heading", {
                level: 1,
              }),
            }
          )}
          text="H1"
        />
        <Button
          onClick={setLink}
          className="px-2 py-1 rounded border border-blue-500 text-[var(--foreground)] hover:cursor-pointer"
          text="Add Link"
        />
        <Button
          onClick={() => editor.chain().focus().unsetLink().run()}
          className="px-2 py-1 rounded border border-blue-500 text-[var(--foreground)] hover:cursor-pointer"
          text="Remove Link"
        />
        <Button
          onClick={() => editor.chain().focus().undo().run()}
          className="px-2 py-1 rounded border border-blue-500 text-[var(--foreground)] hover:cursor-pointer"
          text="Undo"
        />
        <Button
          onClick={() => editor.chain().focus().redo().run()}
          className="px-2 py-1 rounded border border-blue-500 text-[var(--foreground)] hover:cursor-pointer"
          text="Redo"
        />
      </div>

      {/* Editor */}
      <div className="border rounded-md p-4 min-h-[200px] bg-white dark:bg-transparent">
        <EditorContent
          editor={editor}
          className="ProseMirror h-full overflow-y-auto focus:outline-none"
        />
      </div>
    </div>
  );
}
