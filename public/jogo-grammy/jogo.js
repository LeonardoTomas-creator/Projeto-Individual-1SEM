// ----- VARIÁVEIS INICIAIS -----
var altura = 0;
var largura = 0;
var vidas = 1;
var tempo = 10;
var criaRostoKatyTempo = 1500;

// ----- NÍVEL DE DIFICULDADE -----
var nivel = window.location.search;
nivel = nivel.replace("?", "");

if (nivel == "normal") {
  criaRostoKatyTempo = 1500;
} else if (nivel == "dificil") {
  criaRostoKatyTempo = 1000;
} else if (nivel == "beyonce") {
  criaRostoKatyTempo = 750;
}

// ----- AJUSTA TAMANHO DO PALCO -----
function ajustaTamanhoPalcoJogo() {
  altura = window.innerHeight;
  largura = window.innerWidth;
  console.log(largura, altura);
}

ajustaTamanhoPalcoJogo();

// ----- CRONÔMETRO -----
var cronometro = setInterval(function () {
  tempo -= 1;

  if (tempo < 0) {
    clearInterval(cronometro);
    clearInterval(criaMosca);
    window.location.href = "vitoria.html";
  } else {
    document.getElementById("cronometro").innerHTML = tempo;
  }
}, 1000);

// ----- POSIÇÃO RANDÔMICA -----
function posicaoRandomica() {
  // 1 - Remove o rosto anterior (caso exista).
  if (document.getElementById("RostoKaty")) {
    document.getElementById("RostoKaty").remove();

    // 2 - Controla as vidas
    if (vidas > 3) {
      window.location.href = "derrota.html";
    } else {
      document.getElementById("v" + vidas).src = "imagens/coracao_vazio.png";
      vidas++;
    }
  }

  // 3 - Gera posição aleatória
  var posicaoX = Math.floor(Math.random() * largura) - 180;
  var posicaoY = Math.floor(Math.random() * altura) - 180;

  if (posicaoX < 0) {
    posicaoX = 0;
  } else {
    posicaoX = posicaoX;
  }

  if (posicaoY < 0) {
    posicaoY = 0;
  } else {
    posicaoY = posicaoY;
  }

  console.log(posicaoX, posicaoY);

  // 4 - Cria o rosto
  // cria o elemento html
  // cria dinamicamente um <img> com o rosto em uma posição aleatória.
  var RostoKaty = document.createElement("img");
  RostoKaty.src = "imagens/katy.png";
  RostoKaty.className = tamanhoAleatorio() + " " + ladoAleatorio();
  RostoKaty.style.left = posicaoX + "px";
  RostoKaty.style.top = posicaoY + "px";
  RostoKaty.style.position = "absolute";
  RostoKaty.id = "RostoKaty";

  // 5 - Evento de clique
  RostoKaty.onclick = function () {
    this.remove();
  };

  // 6 - Adiciona na tela () o rosto aparece no corpo da página)
  document.body.appendChild(RostoKaty);
}

// ----- POSIÇÃO RANDÔMICA TAMANHO IMAGEM -----
function tamanhoAleatorio() {
  var classe = Math.floor(Math.random() * 3);

  if (classe == 0) {
    return "katy1";
  } else if (classe == 1) {
    return "katy2";
  } else if (classe == 2) {
    return "katy3";
  }
}

// ----- POSIÇÃO RANDÔMICA LADO IMAGEM -----
function ladoAleatorio() {
  var classe = Math.floor(Math.random() * 2);

  if (classe == 0) {
    return "ladoA";
  } else if (classe == 1) {
    return "ladoB";
  }
}
