// Lista de músicas
const musicas = [
  "California Gurls",
  "Teenage Dream",
  "Firework",
  "E.T.",
  "Last Friday Night (T.G.I.F.)",
  "The One That Got Away",
  "Part of Me",
  "Wide Awake",
];

// Isso pega as DIVs onde serão criadas as partidas.
const quartasDiv = document.getElementById("quartas");
const semisDiv = document.getElementById("semis");
const finalDiv = document.getElementById("final");
const campeaDiv = document.getElementById("campea");
const reiniciar = document.getElementById("reiniciar");

let semis = [];
let finalistas = [];
let campea = null;

// Isso embaralha a lista para que as partidas fiquem aleatórias a cada torneio.
function embaralhar(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

function criarPartidas(elemento, lista, proximaFaseCallback) {
  elemento.innerHTML = ""; // Limpa a área onde as partidas vão aparecer, se já tinha partidas antigas ali, apaga tudo.

  for (let i = 0; i < lista.length; i += 2) {
    // Se a lista tiver 8 músicas, ela vai montar as duplas assim:
    // i = 0 → lista[0] vs lista[1]
    // i = 2 → lista[2] vs lista[3]
    // i = 4 → lista[4] vs lista[5]
    // i = 6 → lista[6] vs lista[7]
    // Ou seja: 4 confrontos.

    // Cria a caixa da partida
    const match = document.createElement("div");
    match.className = "match";

    // Cria a música 1
    const m1 = document.createElement("div");
    m1.className = "team";
    m1.textContent = lista[i];

    // Cria a música 2
    const m2 = document.createElement("div");
    m2.className = "team";
    m2.textContent = lista[i + 1];

    // Quando clica no 1:
    m1.onclick = () => {
      m1.classList.add("winner"); // muda cor
      proximaFaseCallback(lista[i]); // envia vencedor para próxima fase
      desativar(match); // impede clicar de novo
    };

    // Quando clica no 2:
    m2.onclick = () => {
      m2.classList.add("winner");
      proximaFaseCallback(lista[i + 1]);
      desativar(match);
    };

    // Monta a partida visualmente
    match.appendChild(m1);
    match.appendChild(m2);
    elemento.appendChild(match);
  }
}

// Desativa para evitar escolher dois vencedores.
function desativar(match) {
  const botoes = match.querySelectorAll(".team");
  botoes.forEach((b) => (b.onclick = null));
}

// Inicia torneio: Limpa tudo, reseta arrays, embaralha músicas, cria as quartas de final
function iniciarTorneio() {
  semis = [];
  finalistas = [];
  campea = null;
  semisDiv.innerHTML = "";
  finalDiv.innerHTML = "";
  campeaDiv.innerHTML = "";

  const embaralhadas = embaralhar([...musicas]);
  criarPartidas(quartasDiv, embaralhadas, vencedorQuartas);
}

// Assim que tiver 4 vencedores cria as semis.
function vencedorQuartas(vencedor) {
  semis.push(vencedor);
  if (semis.length == 4) {
    salvarNoStorage();
    criarPartidas(semisDiv, semis, vencedorSemi);
  }
}

// Assim que tiver 2 cria a final.
function vencedorSemi(vencedor) {
  finalistas.push(vencedor);
  if (finalistas.length == 2) {
    salvarNoStorage();
    criarPartidas(finalDiv, finalistas, vencedorFinal);
  }
}

function vencedorFinal(vencedor) {
  campea = vencedor;
  salvarNoStorage();
  mostrarCampea();
}

// Coloca o nome estilizado da vencedora.
function mostrarCampea() {
  campeaDiv.innerHTML = `<div class="team winner"> ${campea}</div>`;
}

// Quando clicar reinicia o torneio.
reiniciar.onclick = iniciarTorneio;

iniciarTorneio();

function salvarNoStorage() {
  const dados = {
    semifinalistas: semis,
    finalistas: finalistas,
    campea: campea,
    data: new Date().toLocaleString(), // opcional
  };

  localStorage.setItem("torneioTeenageDream", JSON.stringify(dados));
}
