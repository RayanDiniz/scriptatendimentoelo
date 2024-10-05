//--------- RETORNO DO OBJETO ---------
let requestURL = "./src/dadosfrases.json"

let request = new XMLHttpRequest()
request.open("GET", requestURL)

request.responseType = "json"
request.send()

request.onload = function () {
  let atendimentosTexto = request.response
  showConteudo(atendimentosTexto)
  // let teste = atendimentosTexto["frases"][0].textos[0].split('//')[0]
  //console.log(teste)
}

//--------- DEFININDO CUMPRIMENTO ---------

let now = new Date
let mensagem
if (now.getHours() >= 0 && now.getHours() < 12) {
  mensagem = "Bom dia"
} else if (now.getHours() >= 12 && now.getHours() < 18) {
  mensagem = "Boa tarde"
} else if (now.getHours() >= 18 && now.getHours() < 23) {
  mensagem = "Boa noite"
}

//--------- CRIANDO ELEMENTOS ---------

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

      myPara.textContent = textos[j].replace("{cumprimento}", mensagem)
      
      myDivTxt.appendChild(myPara)
      myDivTxt.appendChild(myButton)
      myDivSection.appendChild(myDivTxt)
    }

    section.appendChild(myDivSection)
  }
}

//--------- FUNÇÕES ---------

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

const copiaTexto = (elementId) => {
  let text = document.getElementById(elementId).innerText;
  navigator.clipboard.writeText(text).then
}