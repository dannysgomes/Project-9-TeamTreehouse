"use strict";

const closeModalButtons = document.querySelectorAll("[data-close-button]");
const overlay = document.getElementById("overlay");
const projectsContainer = document.querySelector(".projects");
// create const for modal, modalContainer
const modalContainer = document.getElementById("modal");

modalContainer.addEventListener("click", (e) => {
  // make sure the click is not on the gridContainer itself
  if (e.target !== projectsContainer) {
    // select the card element based on its proximity to actual element clicked
    const isCloseButton = e.target.closest(".close-button");
    if (isCloseButton) {
      modal.classList.remove("active");
      overlay.classList.remove("active");
    }
  }
});

closeModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = button.closest(".modal"); //selects closest parent with class modal
    closeModal(modal);
  });
});

function openModal(index) {
  console.log("data", data);
  const { title, description, githubUrl, projectUrl } = data[index];
  if (modal == null) return;
  modal.classList.add("active");
  overlay.classList.add("active");
  const modalBody = `<div class="modal-header">
    <div class="title">${title}</div>
    <button data-close-button class="close-button">&times;</button>
  </div>
  <div class="modal-body">${description}</div>
  <div class="links-wrapper">
    <a class="links" href="${projectUrl}" target="_blank">View Project</a>
    <a class="links" href="${githubUrl}" target="_blank">View Code</a>
  </div>`;
  modalContainer.innerHTML = modalBody;
}

function displayProjects() {
  const projects = data;
  // store the project HTML as we create it
  let projectHTML = "";
  // loop through each project and create HTML markup
  projects.forEach((project, index) => {
    const { title, imgUrl, technologies } = project;
    const skills = technologies.map((skill) => {
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

    // template literals make this so much cleaner!
    // Lookup Array.join(), the join method
    projectHTML += `
    <div class="card pcard">
          <h2>Project ${index + 1}</h2>
          <h3>${title}</h3>
          <img class="classthumb" src="${imgUrl}" />
          <ul class="skills">
            ${skills.join(" ")} 
          </ul>
          <button class="modal-button" data-index="${index}">More Info</button>
        </div>
    `;
  });
  projectsContainer.innerHTML = projectHTML;
}

displayProjects();

projectsContainer.addEventListener("click", (e) => {
  console.log("e", e.target);
  // make sure the click is not on the gridContainer itself
  if (e.target !== projectsContainer) {
    // select the card element based on its proximity to actual element clicked
    const button = e.target.closest(".modal-button");
    const index = button.getAttribute("data-index");
    openModal(index);
  }
});
