import React from "react";
import Markdoc from "@markdoc/markdoc";

interface MarkdocRendererProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  node: any;
}

export default function MarkdocRenderer({ node }: MarkdocRendererProps) {
  const transformableNode = Markdoc.transform(node);
  return <>{Markdoc.renderers.react(transformableNode, React)}</>;
}
