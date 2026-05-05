"use client";

import { useEffect, useRef } from "react";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  height?: number;
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder = "Unesite tekst...",
  height = 300,
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<unknown>(null);
  const isInitialized = useRef(false);

  useEffect(() => {
    if (isInitialized.current || !editorRef.current) return;

    const loadQuill = async () => {
      const { default: Quill } = await import("quill");

      // CSS
      if (!document.getElementById("quill-css")) {
        const link = document.createElement("link");
        link.id = "quill-css";
        link.rel = "stylesheet";
        link.href = "https://cdnjs.cloudflare.com/ajax/libs/quill/1.3.7/quill.snow.min.css";
        document.head.appendChild(link);
      }

      const toolbarOptions = [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ indent: "-1" }, { indent: "+1" }],
        [{ align: [] }],
        ["link"],
        ["clean"],
      ];

      const quill = new Quill(editorRef.current!, {
        theme: "snow",
        placeholder,
        modules: { toolbar: toolbarOptions },
      });

      if (value) {
        quill.root.innerHTML = value;
      }

      quill.on("text-change", () => {
        const html = quill.root.innerHTML;
        onChange(html === "<p><br></p>" ? "" : html);
      });

      quillRef.current = quill;
      isInitialized.current = true;
    };

    loadQuill();
  }, []);

  useEffect(() => {
    if (!quillRef.current || !isInitialized.current) return;
    const quill = quillRef.current as { root: { innerHTML: string } };
    if (quill.root.innerHTML !== value) {
      quill.root.innerHTML = value || "";
    }
  }, [value]);

  return (
    <div className="quill-wrapper border border-stone-200 rounded-sm overflow-hidden">
      <div
        ref={editorRef}
        style={{ minHeight: height }}
        className="bg-white"
      />
      <style>{`
        .quill-wrapper .ql-toolbar {
          border: none;
          border-bottom: 1px solid #e7e5e4;
          background: #fafaf9;
          padding: 8px 12px;
        }
        .quill-wrapper .ql-container {
          border: none;
          font-size: 14px;
          font-family: inherit;
        }
        .quill-wrapper .ql-editor {
          min-height: ${height}px;
          padding: 16px;
          line-height: 1.7;
        }
        .quill-wrapper .ql-editor.ql-blank::before {
          color: #a8a29e;
          font-style: normal;
        }
      `}</style>
    </div>
  );
}