"use client";

import { useState } from "react";

import { useEffect } from "react";

import { useRef } from "react";

function InventoGPT() {
  const [markdown, setMarkdown] = useState("");
  const [html, setHtml] = useState("");
  const editorRef = useRef(null);

  useEffect(() => {
    // Función para convertir Markdown a HTML
    function convertMarkdownToHTML(markdown) {
      let html = markdown
        .replace(/^# (.+)/gm, "<h1>$1</h1>") // Encabezado h1
        .replace(/^## (.+)/gm, "<h2>$1</h2>") // Encabezado h2
        .replace(/^### (.+)/gm, "<h3>$1</h3>") // Encabezado h3
        .replace(/\* (.+)\n/gm, "<li>$1</li>") // Lista desordenada
        .replace(/\n/gm, "<br>"); // Nueva línea

      html = html.replace(/<li>(.+?)<\/li>/g, "<ul>$1</ul>");

      return html;
    }

    setHtml(convertMarkdownToHTML(markdown));
  }, [markdown]);

  function handleInput() {
    const content = editorRef.current.textContent;
    setMarkdown(content);
  }

  return (
    <div
      contentEditable="true"
      style={{
        border: "1px solid #ccc",
        minHeight: "100px",
        padding: "5px",
        whiteSpace: "pre-wrap",
      }}
      ref={editorRef}
      onInput={handleInput}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

export default InventoGPT;
