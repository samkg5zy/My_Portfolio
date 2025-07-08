
document.addEventListener("DOMContentLoaded", () => {
  const text = "Hi, I'm Salim 👋";
  let i = 0;
  function typeWriter() {
    if (i < text.length) {
      document.getElementById("typewriter").innerHTML += text.charAt(i);
      i++;
      setTimeout(typeWriter, 100);
    }
  }
  typeWriter();

  document.getElementById("modeToggle").onclick = () =>
    document.body.classList.toggle("dark");

  const imageUpload = document.getElementById("imageUpload");
  const profileImage = document.getElementById("profileImage");

  imageUpload.onchange = (e) => {
    const reader = new FileReader();
    reader.onload = (ev) => {
      profileImage.src = ev.target.result;
      localStorage.setItem("profileImage", ev.target.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const savedImg = localStorage.getItem("profileImage");
  if (savedImg) profileImage.src = savedImg;

  const projectList = document.getElementById("projectList");
  const savedProjects = JSON.parse(localStorage.getItem("projects") || "[]");

  function renderProjects() {
    projectList.innerHTML = "";
    savedProjects.forEach((proj) => {
      const div = document.createElement("div");
      div.className = "project-card";
      div.innerHTML = `<h3>${proj.title}</h3><pre><code>${proj.code}</code></pre>`;
      projectList.appendChild(div);
    });
  }

  renderProjects();

  document.getElementById("addProjectBtn").onclick = () => {
    const title = prompt("Project Title:");
    const code = prompt("Code Snippet:");
    savedProjects.push({ title, code });
    localStorage.setItem("projects", JSON.stringify(savedProjects));
    renderProjects();
  };
});
