"use strict";

const closeModalButtons = document.querySelectorAll("[data-close-button]");
const overlay = document.getElementById("overlay");
const projectsContainer = document.querySelector(".projects");

closeModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = button.closest(".modal"); //selects closest parent with class modal
    closeModal(modal);
  });
});

function openModal(modal) {
  if (modal == null) return;
  modal.classList.add("active");
  overlay.classList.add("active");
}

function closeModal(modal) {
  if (modal == null) return;
  modal.classList.remove("active");
  overlay.classList.remove("active");
}

function displayProjects(projectData) {
  const projects = projectData;
  // store the project HTML as we create it
  let projectHTML = "";
  // loop through each project and create HTML markup
  projects.forEach((project, index) => {
    let projectNumber = index + 1;
    let title = project.title;
    let img = project.imgUrl;
    let technologies = project.technologies;
    let skills = technologies.map((skill) => {
      const cleanSkill = skill.toLowerCase();
      let color;
      switch (true) {
        case cleanSkill === "html":
          color = "#0399ff";
          break;
        case cleanSkill === "css":
          color = "#ff9904";
          break;
        case cleanSkill === "javascript":
          color = "green";
          break;
        case cleanSkill === "sass":
          color = "purple";
          break;
        default:
          color = "#0399ff";
      }
      return `<li style="background-color:${color}">${skill}</li>`;
    });
    console.log("skills", skills);

    // template literals make this so much cleaner!
    // Lookup Array.join(), the join method
    projectHTML += `
    <div class="card pcard">
          <h2>Project ${projectNumber}</h2>
          <h3>${title}</h3>
          <img class="classthumb" src="${img}" />
          <ul class="skills">
            ${skills.join(" ")} 
          </ul>
          <button data-modal-target="#modal">More Info</button>
        </div>
    `;
  });
  projectsContainer.innerHTML = projectHTML;
  const openModalButtons = document.querySelectorAll("[data-modal-target]");
  console.log("openModalButtons", openModalButtons);
  openModalButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const modal = document.getElementById("modal");
      console.log("modal", modal);
      openModal(modal);
    });
  });
  console.log("test", openModalButtons);
}

displayProjects(data);
