import React from "react";
import Embed from "@editorjs/embed";
import Table from "@editorjs/table";
import List from "@editorjs/list";
import Warning from "@editorjs/warning";
import Code from "@editorjs/code";
import LinkTool from "@editorjs/link";
import Image from "@editorjs/image";
import Raw from "@editorjs/raw";
import Header from "@editorjs/header";
import Quote from "@editorjs/quote";
import Marker from "@editorjs/marker";
import CheckList from "@editorjs/checklist";
import Delimiter from "@editorjs/delimiter";
import InlineCode from "@editorjs/inline-code";
import SimpleImage from "@editorjs/simple-image";
import Paragraph from "@editorjs/paragraph";
import EditorJs from "react-editor-js";

const Editor = ({ placeholder, instanceRef, name }) => {
  // const instanceRef = React.useRef(null);
  const EDITOR_JS_TOOLS = {
    image: {
      class: Image,
      config: {
        endpoints: {
          byFile: "http://localhost:3500/upload/image/editorjs", // Your backend file uploader endpoint
          byUrl: "http://localhost:3500/upload/image/editorjs", // Your endpoint that provides uploading by Url
        },
      },
    },
    embed: Embed,
    table: Table,
    // paragraph: Paragraph,
    list: List,
    warning: Warning,
    code: Code,
    linkTool: LinkTool,
    raw: Raw,
    header: Header,
    quote: Quote,
    marker: Marker,
    checklist: CheckList,
    delimiter: Delimiter,
    inlineCode: InlineCode,
    simpleImage: SimpleImage,
  };
  return (
    <div>
      <EditorJs
        placeholder={placeholder}
        // placeholder="Please Input Description"
        tools={EDITOR_JS_TOOLS}
        instanceRef={instanceRef}
        name={name}
      />
    </div>
  );
};

export default Editor;