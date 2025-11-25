// ----- VARIÁVEIS INICIAIS -----

var altura = 0; // altura e largura: armazenam o tamanho atual da tela do navegador.
var largura = 0;
var vidas = 1; // vidas: começa em 1 e controla quantos erros o jogador teve (até 3).
var tempo = 15; // tempo: tempo total da partida (em segundos).
var criaMosquitoTempo = 1500; // criaMosquitoTempo: tempo em milissegundos entre o surgimento de novos mosquitos (1,5 segundos inicialmente).

// ----- NÍVEL DE DIFICULDADE -----
var nivel = window.location.search;
nivel = nivel.replace("?", "");
// window.location.search pega o que vem depois do “?” na URL.
// Exemplo: jogo.html?dificil -> nivel = "dificil".
// Em seguida, o código ajusta a dificuldade:

if (nivel == "normal") {
  criaMosquitoTempo = 1500;
} else if (nivel == "dificil") {
  criaMosquitoTempo = 1000;
} else if (nivel == "beyonce") {
  criaMosquitoTempo = 750; // Quanto menor o número, mais rápido aparecem os mosquitos.
}

// ----- AJUSTA TAMANHO DO PALCO -----
// Pega o tamanho visível da tela (sem precisar definir manualmente). Assim, o jogo sempre se adapta ao tamanho da janela do navegador.
function ajustaTamanhoPalcoJogo() {
  altura = window.innerHeight;
  largura = window.innerWidth;
  console.log(largura, altura);
}

ajustaTamanhoPalcoJogo();

// ----- CRONÔMETRO -----
var cronometro = setInterval(function () {
  tempo -= 1; // A cada 1 segundo, o tempo é reduzido em 1.

  if (tempo < 0) {
    // Quando o tempo acaba (tempo < 0), o jogo é encerrado e o jogador vence (vitoria.html).
    clearInterval(cronometro);
    clearInterval(criaMosca);
    window.location.href = "vitoria.html";
  } else {
    document.getElementById("cronometro").innerHTML = tempo;
  }
}, 1000);

// ----- POSIÇÃO RANDÔMICA -----
// Essa é a principal, cria os mosquitos em posições aleatórias na tela.
function posicaoRandomica() {
  // 1 - Remove o mosquito anterior (caso exista).
  // Se o mosquito anterior ainda estiver na tela, o jogador perde uma vida, pois não clicou a tempo.
  if (document.getElementById("mosquito")) {
    document.getElementById("mosquito").remove();

    // 2 - Controla as vidas
    // Troca o ícone do coração (de cheio para vazio) e, se passar de 3, o jogador perde.
    if (vidas > 3) {
      window.location.href = "fim_de_jogo.html";
    } else {
      document.getElementById("v" + vidas).src = "imagens/coracao_vazio.png"; // Troca o ícone do coração (de cheio para vazio) e, se passar de 3, o jogador perde.

      vidas++;
    }
  }

  // 3 - Gera posição aleatória
  // Calcula uma posição X e Y aleatória dentro da tela, garantindo que o mosquito não apareça fora da área visível.
  var posicaoX = Math.floor(Math.random() * largura) - 90;
  var posicaoY = Math.floor(Math.random() * altura) - 90;

  posicaoX = posicaoX < 0 ? 0 : posicaoX;
  posicaoY = posicaoY < 0 ? 0 : posicaoY;

  console.log(posicaoX, posicaoY);

  // 4 - Cria o mosquito
  // criar o elemento html
  // Cria dinamicamente um <img> com o mosquito em uma posição aleatória.
  var mosquito = document.createElement("img");
  mosquito.src = "imagens/katy.png";
  mosquito.className = tamanhoAleatorio() + " " + ladoAleatorio(); // className define o tamanho e lado (espelhado) do mosquito.
  mosquito.style.left = posicaoX + "px";
  mosquito.style.top = posicaoY + "px";
  mosquito.style.position = "absolute";
  mosquito.id = "mosquito";
  // 5 - Evento de clique
  // Se o jogador clicar no mosquito, ele é removido (acerto).
  mosquito.onclick = function () {
    this.remove();
  };
  // 6 - Adiciona na tela
  // Finalmente, o mosquito aparece no corpo da página.
  document.body.appendChild(mosquito);
}

// ----- POSIÇÃO RANDÔMICA -----
// Essas funções ajudam a variar o visual dos mosquitos:
// Retorna uma das 3 classes CSS (pequeno, médio, grande).
function tamanhoAleatorio() {
  var classe = Math.floor(Math.random() * 3);

  switch (classe) {
    case 0:
      return "mosquito1";

    case 1:
      return "mosquito2";

    case 2:
      return "mosquito3";
  }
}

// Faz o mosquito “virar para a esquerda ou direita”.
function ladoAleatorio() {
  var classe = Math.floor(Math.random() * 2);

  switch (classe) {
    case 0:
      return "ladoA";

    case 1:
      return "ladoB";
  }
}
