"use client";

import { useEffect, useRef } from "react";

interface QuillEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minHeight?: number;
}

export default function QuillEditor({
  value,
  onChange,
  placeholder = "Унесите садржај...",
  minHeight = 200,
}: QuillEditorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<any>(null);
  const onChangeRef = useRef(onChange);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let ignore = false; // ← flag da znamo da li je cleanup već pozvan

    if (!document.getElementById("quill-css")) {
      const link = document.createElement("link");
      link.id = "quill-css";
      link.rel = "stylesheet";
      link.href = "https://cdn.jsdelivr.net/npm/quill@2/dist/quill.snow.css";
      document.head.appendChild(link);
    }

    import("quill").then(({ default: Quill }) => {
      // Ako je cleanup već pozvan (Strict Mode unmount), ne inicijalizuj
      if (ignore) return;
      if (!containerRef.current) return;

      containerRef.current.innerHTML = "";

      const quill = new Quill(containerRef.current, {
        theme: "snow",
        placeholder,
        modules: {
          toolbar: [
            [{ header: [2, 3, false] }],
            ["bold", "italic", "underline"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link"],
            ["clean"],
          ],
        },
      });

      if (value) {
        quill.root.innerHTML = value;
      }

      quill.on("text-change", () => {
        const html = quill.root.innerHTML;
        onChangeRef.current(html === "<p><br></p>" ? "" : html);
      });

      quillRef.current = quill;
    });

    return () => {
      ignore = true; // ← zaustavi async import ako nije završen
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
      quillRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!quillRef.current) return;
    const trenutni = quillRef.current.root.innerHTML;
    const normalizovan = trenutni === "<p><br></p>" ? "" : trenutni;
    if (normalizovan !== value) {
      quillRef.current.root.innerHTML = value ?? "";
    }
  }, [value]);

  return (
    <div
      className="quill-wrapper border border-stone-200 focus-within:border-crimson-400 transition-colors bg-white"
      style={{ minHeight }}
    >
      <div ref={containerRef} />
      <style>{`
        .quill-wrapper .ql-toolbar {
          border: none;
          border-bottom: 1px solid #e7e5e4;
          padding: 6px 8px;
        }
        .quill-wrapper .ql-container {
          border: none;
          font-size: 14px;
          font-family: inherit;
        }
        .quill-wrapper .ql-editor {
          min-height: ${minHeight - 42}px;
          padding: 10px 14px;
        }
        .quill-wrapper .ql-editor.ql-blank::before {
          color: #a8a29e;
          font-style: normal;
        }
      `}</style>
    </div>
  );
}