// ELEMENTS
const calendarGrid = document.getElementById("calendarGrid");
const modal = document.getElementById("modal");
const modalDayNumber = document.getElementById("modalDayNumber");
const modalTitle = document.getElementById("modalTitle");
const modalDifficulty = document.getElementById("modalDifficulty");
const modalBody = document.getElementById("modalBody");
const progressFill = document.getElementById("progressFill");
const progressText = document.getElementById("progressText");

let currentDayIndex = null;
let completedDays = JSON.parse(localStorage.getItem("completedDays")) || [];

// BUILD
function renderCalendar() {
  calendarGrid.innerHTML = "";

  days.forEach((day, index) => {
    const card = document.createElement("div");
    card.classList.add("day-card");

    if (completedDays.includes(day.day)) {
      card.classList.add("completed");
    }

    card.innerHTML = `<span>${day.day}</span>`;

    card.addEventListener("click", () => openModal(index));

    calendarGrid.appendChild(card);
  });

  updateProgress();
}

// MODAL
function openModal(index) {
  currentDayIndex = index;
  const day = days[index];

  modalDayNumber.textContent = day.day;
  modalTitle.textContent = day.title;
  modalDifficulty.textContent = day.difficulty || "";
  modalBody.innerHTML = "";

  if (day.description) {
    modalBody.innerHTML += `<p>${day.description}</p>`;
  }

  if (day.tips && day.tips.length) {
    modalBody.innerHTML += `
      <ul>
        ${day.tips.map(tip => `<li>${tip}</li>`).join("")}
      </ul>
    `;
  }

  if (day.bonus) {
    modalBody.innerHTML += `<div class="bonus">${day.bonus}</div>`;
  }

  modal.classList.add("open");
}

function closeModal() {
  modal.classList.remove("open");
}

// PROGRESS
function toggleComplete() {
  const dayNumber = days[currentDayIndex].day;

  if (completedDays.includes(dayNumber)) {
    completedDays = completedDays.filter(d => d !== dayNumber);
  } else {
    completedDays.push(dayNumber);
  }

  localStorage.setItem("completedDays", JSON.stringify(completedDays));
  renderCalendar();
  closeModal();
}

function skipDay() {
  if (currentDayIndex < days.length - 1) {
    openModal(currentDayIndex + 1);
  }
}

function resetProgress() {
  completedDays = [];
  localStorage.removeItem("completedDays");
  renderCalendar();
}

// PROGRESS BAR
function updateProgress() {
  const percent = (completedDays.length / days.length) * 100;
  progressFill.style.width = `${percent}%`;
  progressText.textContent = `${completedDays.length} / ${days.length} completed`;
}

// INIT
renderCalendar();
