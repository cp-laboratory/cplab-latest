"use client";

import { useEffect, useRef, memo } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

function RichTextEditor({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<Quill | null>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (!containerRef.current) return;

    if (!quillRef.current) {
      quillRef.current = new Quill(containerRef.current, {
        theme: "snow",
        placeholder,
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "clean"],
          ],
        },
      });

      quillRef.current.on("text-change", () => {
        const html = quillRef.current?.root.innerHTML || "";
        onChange(html === "<p><br></p>" ? "" : html);
      });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (quillRef.current && isFirstRender.current && value) {
      quillRef.current.clipboard.dangerouslyPasteHTML(value);
      isFirstRender.current = false;
    }
  }, [value]);

  return <div ref={containerRef} />;
}

export default memo(RichTextEditor);
