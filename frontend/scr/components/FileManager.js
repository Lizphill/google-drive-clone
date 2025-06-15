// frontend/src/components/FileManager.js
import React, { useState, useEffect } from 'react';

const API_URL = 'http://localhost:5000'; // Adjust if using port-forward

function FileManager() {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const fetchFiles = async () => {
    const res = await fetch(`${API_URL}/files`);
    const data = await res.json();
    setFiles(data.files);
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append('file', file);

    await fetch(`${API_URL}/upload`, {
      method: 'POST',
      body: formData,
    });

    setUploading(false);
    fetchFiles();
  };

  const handleDelete = async (filename) => {
    await fetch(`${API_URL}/files/${filename}`, {
      method: 'DELETE',
    });
    fetchFiles();
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <div>
      <input type="file" onChange={handleUpload} />
      {uploading && <p>Uploading...</p>}
      <ul>
        {files.map((file) => (
          <li key={file}>
            <a href={`${API_URL}/files/${file}`} download>{file}</a>
            <button onClick={() => handleDelete(file)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FileManager;