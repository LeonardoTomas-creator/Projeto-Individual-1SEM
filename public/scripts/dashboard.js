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

  cardSemis.innerHTML = data.semifinalistas.join(", <br> <br>");
  cardFinal.innerHTML = data.finalistas.join(", <br> <br>");
  cardCampea.innerHTML = data.campea || "—";
}

carregarDashboard();

var idUsuario = sessionStorage.ID_USUARIO;

// Buscar último torneio do usuário
fetch(`/resultado/ultimoturno/${idUsuario}`)
  .then(res => res.json())
  .then(dados => {
    document.getElementById("card-semis").innerHTML =
      dados[0].semifinal.replace(/,/g, "<br><br>");
    document.getElementById("card-final").innerHTML =
      dados[0].final.replace(/,/g, "<br><br>");
    document.getElementById("card-campea").innerHTML = dados[0].campea;
  })
  .catch(erro => console.log("Erro ao buscar último turno:", erro));

// Buscar estatísticas de vitórias
fetch("/resultado/vitorias")
  .then(res => res.json())
  .then(dados => {
    
    const labels = [
      "California Gurls", "Teenage Dream", "Firework", "E.T.",
      "Last Friday Night (T.G.I.F.)", "The One That Got Away",
      "Part of Me", "Wide Awake"
    ];

    const chartData = labels.map(label => {
      const musica = dados.find(d => d.campea == label);
      return musica ? musica.vitorias : 0;
    });

    new Chart(document.getElementById("myChartLine"), {
      type: "bar",
      data: {
        labels: labels,
        datasets: [{
          label: "Vitórias",
          data: chartData,
          borderWidth: 2
        }]
      },
      options: {
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  })
  .catch(erro => console.log("Erro ao buscar vitórias:", erro));