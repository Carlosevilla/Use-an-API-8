"use strict";
const apiUrl =
  "https://randomuser.me/api/?results=12&inc=name,picture,email,location,phone,dob&noinfo&nat=US";
const employeeContainer = document.getElementById("employeeContainer");
const modal = document.getElementById("modal");
const modalImage = document.getElementById("modal-image");
const modalName = document.getElementById("modal-name");
const modalEmail = document.getElementById("modal-email");
const modalCell = document.getElementById("modal-cell");
const modalAddress = document.getElementById("modal-address");
const modalBirthdate = document.getElementById("modal-birthdate");
const closeBtn = document.getElementsByClassName("close")[0];
const modalCity = document.getElementById("modal-city");

//
async function fetchEmployees() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    const employees = data.results.map((result) => {
      const { name, picture, email, location, phone, dob } = result;
      return { name, picture, email, location, phone, dob };
    });

    return employees;
  } catch (error) {
    console.error("Error fetching employees:", error);
    return [];
  }
}

function displayEmployees(employeeArray) {
  employeeArray.forEach((employee) => {
    const employeeCard = document.createElement("div");
    employeeCard.classList.add("employee-card");

    // Set content using template literals
    employeeCard.innerHTML = `
        <img src="${employee.picture.large}" alt="Employee Image">
        <div>
        <h2>${employee.name.first} ${employee.name.last}</h2>
        <p>${employee.email}</p>
        <p>${employee.location.city}</p>
        </div>
        
      `;

    // Add click event listener to open modal
    employeeCard.addEventListener("click", () => openModal(employee));

    employeeContainer.appendChild(employeeCard);
  });
}

fetchEmployees()
  .then((employeeArray) => {
    displayEmployees(employeeArray);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
function openModal(employee) {
  modalImage.src = employee.picture.large;
  modalName.textContent = `${employee.name.first} ${employee.name.last}`;
  modalEmail.textContent = employee.email;
  modalCity.textContent = employee.location.city;
  modalCell.textContent = employee.phone;
  modalAddress.textContent = `${employee.location.street.number} ${employee.location.street.name}, ${employee.location.city}, ${employee.location.state}, ${employee.location.postcode}`;
  modalBirthdate.textContent = `Birthdate: ${new Date(
    employee.dob.date
  ).toLocaleDateString()}`;

  modal.style.display = "block";
}

function closeModal() {
  modal.style.display = "none";
}

closeBtn.addEventListener("click", closeModal);
window.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeModal();
  }
});