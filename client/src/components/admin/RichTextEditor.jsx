import React, { useState, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

const RichTextEditor = ({ value, onChange }) => {
  const quillRef = useRef(null);
  const [editorHtml, setEditorHtml] = useState(value);

  const handleChange = (html) => {
    setEditorHtml(html);
    onChange(html);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      const formData = new FormData();
      formData.append('file', acceptedFiles[0]);

      // Replace with your image upload endpoint
      axios.post('http://localhost:5000/api/upload', formData)
        .then(response => {
          const range = quillRef.current.getEditor().getSelection();
          const link = response.data.url; // URL of the uploaded image
          quillRef.current.getEditor().insertEmbed(range.index, 'image', link);
        })
        .catch(error => {
          console.error('Error uploading image:', error);
        });
    }
  });

  return (
    <div className="editor">
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <ReactQuill
        ref={quillRef}
        value={editorHtml}
        onChange={handleChange}
        modules={RichTextEditor.modules}
        formats={RichTextEditor.formats}
        placeholder="Compose an epic..."
      />
    </div>
  );
};

// Quill modules and formats
RichTextEditor.modules = {
  toolbar: [
    [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ 'align': [] }],
    [{ 'color': [] }, { 'background': [] }],
    ['link', 'image'],
    ['clean']
  ]
};

RichTextEditor.formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'color', 'background', 'align'
];

export default RichTextEditor;