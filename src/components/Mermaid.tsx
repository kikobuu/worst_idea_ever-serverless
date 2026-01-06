"use client";
import { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";

mermaid.initialize({
  startOnLoad: false,
  theme: "default", 
  securityLevel: "loose",
  fontFamily: "var(--font-noto-serif-sc)", // consistent font
});

interface MermaidProps {
  chart: string;
}

export default function Mermaid({ chart }: MermaidProps) {
  const [svg, setSvg] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (chart) {
      const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
      try {
        mermaid.render(id, chart).then(({ svg }) => {
          setSvg(svg);
          setError(null);
        }).catch((e) => {
            console.error("Mermaid render error:", e);
            setError("Failed to render diagram");
        });
      } catch (e) {
         console.error("Mermaid sync error:", e);
         setError("Failed to render diagram");
      }
    }
  }, [chart]);

  if (error) {
      return <div className="text-red-500 border border-red-200 p-2 rounded bg-red-50 text-sm font-mono">{error}</div>
  }

  if (!svg) {
      return <div className="text-muted-foreground text-sm animate-pulse">Loading diagram...</div>
  }

  return (
    <div
      className="mermaid flex justify-center my-6 overflow-x-auto"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
