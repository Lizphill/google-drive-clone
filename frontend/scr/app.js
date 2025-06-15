import React, { useState, useEffect } from 'react';
import axios from 'axios';
function App() {
  const [files, setFiles] = useState([]);
  useEffect(() => fetchFiles(), []);
  const fetchFiles = async () => {
    const res = await axios.get('/api/files');
    setFiles(res.data.files);
  };
  const upload = async (e) => {
    const fd = new FormData();
    fd.append('file', e.target.files[0]);
    await axios.post('/api/upload', fd);
    fetchFiles();
  };
  const del = async (f) => { await axios.delete(`/api/files/${f}`); fetchFiles(); };
  return (
    <div style={{ padding: 20 }}>
      <h1>Drive Clone</h1>
      <input type="file" onChange={upload}/>
      <ul>
        {files.map(f => (
          <li key={f}>
            <a href={`/api/files/${f}`} download>{f}</a>
            <button onClick={() => del(f)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default App;