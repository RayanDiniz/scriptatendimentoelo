
function copyText(elementId) {
  var text = document.getElementById(elementId).innerText;
  navigator.clipboard.writeText(text).then(function () {

  }, function (err) {
    alert("Erro ao copiar texto: " + err);
  })
}

now = new Date
let mensagem
if (now.getHours() >= 0 && now.getHours() < 12) {
  mensagem = "Bom dia"
} else if (now.getHours() >= 12 && now.getHours() < 18) {
  mensagem = "Boa tarde"
} else if (now.getHours() >= 18 && now.getHours() < 23) {
  mensagem = "Boa noite"
}

for (let i = 0; i < 50; i++) {
  let idnumber = i + 1
  document.getElementById("cumprimento" + idnumber).innerText = mensagem
}



