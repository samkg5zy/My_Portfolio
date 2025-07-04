
document.addEventListener("DOMContentLoaded", () => {
  // Typewriter
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

  // Theme toggle
  document.getElementById("modeToggle").onclick = () => document.body.classList.toggle("dark");

  // Edit Profile
  document.getElementById("editProfileBtn").onclick = () => {
    const info = document.getElementById("info");
    info.classList.toggle("hidden");
  };

  // Upload image
  const profileImage = document.getElementById("profileImage");
  const input = document.getElementById("imageUpload");
  input.onchange = e => {
    const reader = new FileReader();
    reader.onload = ev => {
      profileImage.src = ev.target.result;
      localStorage.setItem("profileImage", ev.target.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  // Restore saved image
  const savedImg = localStorage.getItem("profileImage");
  if (savedImg) profileImage.src = savedImg;

  // Admin Login
  const modal = document.getElementById("adminLoginModal");
  document.getElementById("adminLoginBtn").onclick = () => modal.classList.remove("hidden");
  document.getElementById("adminLoginSubmit").onclick = () => {
    const user = document.getElementById("adminUser").value;
    const pass = document.getElementById("adminPass").value;
    if (user === "admin" && pass === "1234") {
      alert("Access granted!");
      modal.classList.add("hidden");
    } else {
      alert("Incorrect credentials!");
    }
  };

  // Add Project
  const list = document.getElementById("projectList");
  const savedProjects = JSON.parse(localStorage.getItem("projects") || "[]");
  function renderProjects() {
    list.innerHTML = "";
    savedProjects.forEach((p, i) => {
      const card = document.createElement("div");
      card.className = "project-card";
      card.innerHTML = "<h3>" + p.title + "</h3><pre><code>" + p.code + "</code></pre>";
      list.appendChild(card);
    });
  }
  renderProjects();
  document.getElementById("addProjectBtn").onclick = () => {
    const title = prompt("Project Title:");
    const code = prompt("Project Code:");
    savedProjects.push({ title, code });
    localStorage.setItem("projects", JSON.stringify(savedProjects));
    renderProjects();
  };
});
