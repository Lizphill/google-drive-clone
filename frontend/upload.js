document.getElementById('uploadForm').onsubmit = async function (e) {
  e.preventDefault();
  const file = document.getElementById('fileInput').files[0];
  const formData = new FormData();
  formData.append("file", file);

  await fetch("/upload", { method: "POST", body: formData });
  loadFiles();
};

async function loadFiles() {
  const res = await fetch("/files");
  const data = await res.json();
  const list = document.getElementById("fileList");
  list.innerHTML = "";
  data.files.forEach(name => {
    const li = document.createElement("li");
    li.innerHTML = `<a href="/files/${name}" download>${name}</a> 
                    <button onclick="deleteFile('${name}')">Delete</button>`;
    list.appendChild(li);
  });
}

async function deleteFile(name) {
  await fetch(`/files/${name}`, { method: "DELETE" });
  loadFiles();
}

window.onload = loadFiles;