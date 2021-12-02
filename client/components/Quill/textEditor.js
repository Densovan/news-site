import React from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote", "code-block"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean"],
  ],
  //   handlers: {
  //     image: quillImageCallback
  // },
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
  "code-block",
];

export default (props) => (
  <QuillNoSSRWrapper
    modules={modules}
    formats={formats}
    theme="snow"
    onChange={props.handleDescChange}
    defaultValue={props.defaultValue}
  />
);

// import React from "react";
// import dynamic from "next/dynamic";
// import "react-quill/dist/quill.snow.css";
// const QuillNoSSRWrapper = dynamic(import("react-quill"), {
//   ssr: false,
//   loading: () => <p>Loading ...</p>,
// });

// const modules = {
//   ImageResize: [
//     {
//       modules: ["Resize", "DisplaySize", "Toolbar"],
//     },
//   ],

//   toolbar: [
//     [{ header: [1, 2, 3, 4, 5, 6, false] }],
//     ["bold", "italic", "underline", "strike", "blockquote"],
//     ["image", "code-block"],
//     // ['link', 'blockquote'],
//     // [{ list: 'ordered' }],
//     [
//       { list: "ordered" },
//       { list: "bullet" },
//       { indent: "-1" },
//       { indent: "+1" },
//     ],
//     ["link"],
//     ["clean"],
//   ],
// };
// const formats = [
//   "header",
//   "bold",
//   "italic",
//   "underline",
//   "strike",
//   "blockquote",
//   "list",
//   "bullet",
//   "indent",
//   "link",
//   "image",
//   "imageBlot", // #5 Optinal if using custom formats
// ];

// export default (props) => (
//   <div>
//     <QuillNoSSRWrapper
//       // formats={formats}
//       // modules={modules}
//       // onChange={props.handleDescChange}
//       // defaultValue={props.defaultValue}
//       // preserveWhitespace={true}
//       modules={modules}
//       formats={formats}
//       theme="snow"
//       onChange={props.handleDescChange}
//       defaultValue={props.defaultValue}
//     />
//   </div>
// );
