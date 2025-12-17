const container = document.getElementById("cards");

days.forEach((item) => {
  const card = document.createElement("div");
  card.classList.add("card");

  card.innerHTML = `
    <div class="card-header">
      <span class="day">Day ${item.day}</span>
      <h2>${item.title}</h2>
    </div>

    <div class="card-body">
      <p>${item.description}</p>

      ${
        item.tips && item.tips.length
          ? `<ul>
              ${item.tips.map(tip => `<li>${tip}</li>`).join("")}
            </ul>`
          : ""
      }

      ${
        item.bonus
          ? `<div class="bonus">${item.bonus}</div>`
          : ""
      }
    </div>
  `;

  container.appendChild(card);
});
