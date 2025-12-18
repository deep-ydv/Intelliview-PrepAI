import React, { useEffect, useRef } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css"; // choose any theme

const AutoCodeBlock = ({ code, language }) => {
  const codeRef = useRef(null);

  useEffect(() => {
    const el = codeRef.current;
    if (el) {
      // 1️⃣ Reset the highlight flag and inner HTML (important)
      el.removeAttribute("data-highlighted");

      // 2️⃣ Set plain text (not innerHTML) to avoid escaping issues
      el.textContent = code || "";

      // 3️⃣ Highlight again
      if (language) {
        el.className = `language-${language}`;
        hljs.highlightElement(el);
      } else {
        const result = hljs.highlightAuto(code || "");
        el.innerHTML = result.value;
        el.className = `hljs language-${result.language || "plaintext"}`;
      }
    }
  }, [code, language]); // re-run whenever code or language changes

  return (
    <pre>
      <code ref={codeRef} className="hljs"></code>
    </pre>
  );
};

export default AutoCodeBlock;
