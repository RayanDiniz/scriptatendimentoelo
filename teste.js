import data from "./src/dadosfrases.json" with {type: "json"}

let teste = data["frases"]

let titulo = "Titulo"
let autor = "Fulano"
let textos = "exemplo"
teste.push({"titulo": titulo, "autor": autor, "textos": [textos]})
console.log(teste)
