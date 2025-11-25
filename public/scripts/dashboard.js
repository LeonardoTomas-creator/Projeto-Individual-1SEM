const cardSemis = document.getElementById("card-semis");
const cardFinal = document.getElementById("card-final");
const cardCampea = document.getElementById("card-campea");

function carregarDashboard() {
  const data = JSON.parse(localStorage.getItem("torneioTeenageDream"));

  if (!data) {
    cardSemis.textContent = "—";
    cardFinal.textContent = "—";
    cardCampea.textContent = "—";
    return;
  }

  cardSemis.textContent = data.semifinalistas.join(", ");
  cardFinal.textContent = data.finalistas.join(", ");
  cardCampea.textContent = data.campea || "—";
}

carregarDashboard();