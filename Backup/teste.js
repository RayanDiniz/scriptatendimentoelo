// URL do JSON
let requestURL = "./src/dadosfrases.json";

let request = new XMLHttpRequest();
request.open("GET", requestURL);
request.responseType = "json";
request.send();

// Variável para armazenar o nome do usuário
let nomeUsuario = "";

// Função chamada ao clicar em "Confirmar" no campo de entrada de nome
function salvarNome() {
  nomeUsuario = document.getElementById("nome").value.trim();
  if (nomeUsuario) {
    document.getElementById("nomeContainer").style.display = "none";
    document.getElementById("conteudoSection").style.display = "block";
    request.onload = function () {
      let atendimentosTexto = request.response;
      showConteudo(atendimentosTexto);
    };
  } else {
    alert("Por favor, insira seu nome.");
  }
}

// Função para definir o cumprimento com base na hora
let now = new Date();
let mensagem;
if (now.getHours() >= 0 && now.getHours() < 12) {
  mensagem = "Bom dia";
} else if (now.getHours() >= 12 && now.getHours() < 18) {
  mensagem = "Boa tarde";
} else if (now.getHours() >= 18 && now.getHours() < 23) {
  mensagem = "Boa noite";
}

// Função para exibir o conteúdo usando o nome do usuário e o cumprimento
let section = document.querySelector("section")
section.setAttribute("class", "main")

function showConteudo(jsonObj) {
  let conteudo = jsonObj["frases"]

  for (let i = 0; i < conteudo.length; i++) {
    let myDivSection = document.createElement("div")
    let myH2 = document.createElement("h2")

    myDivSection.setAttribute("class", "myDivSection")
    myH2.textContent = 1+i+". "+conteudo[i].titulo

    myDivSection.appendChild(myH2)
    let textos = conteudo[i].textos
    for (let j = 0; j < textos.length; j++) {
      let myDivTxt = document.createElement("div")
      let myPara = document.createElement("p")
      let myButton = document.createElement("button")

      myDivTxt.setAttribute("class", "myDivTxt")

      myButton.setAttribute("class", "copy-btn")
      myButton.setAttribute("onclick", "copiaTexto('text"+i+"."+j+"')")
      myButton.innerHTML = "<i class='fa-regular fa-copy'></i>"

      myPara.setAttribute("id", "text"+i+"."+j)
      
      // Substitui {cumprimento} e {nome} nos textos
      myPara.textContent = textos[j].replace("{cumprimento}", mensagem).replace("{nome}", nomeUsuario);

      myDivTxt.appendChild(myPara);
      myDivTxt.appendChild(myButton);
      myDivSection.appendChild(myDivTxt);
    }

    section.appendChild(myDivSection);
  }
}

// Função para copiar texto para a área de transferência
const copiaTexto = (elementId) => {
  let text = document.getElementById(elementId).innerText;
  navigator.clipboard.writeText(text);
};

// Função de ir ao topo e de ir para final
const irTopo = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

const irBase = () => {
  window.scrollTo({
    top: 1000000,
    behavior: 'smooth'
  })
}
