//Como usar o DOM para Acessar e Manipular Elementos HTML?

//Acessando Elementos no DOM:

//Seleciona um elemento pelo seu atributo id.
document.getElementById(id)
const titulo = document.getElementById('meuTitulo')

//Seleciona todos os elementos que têm a mesma classe.
document.getElementsByClassName(className) 
const paragrafos = document.getElementsByClassName('meuParagrafo')

//Seleciona todos os elementos de um determinado tipo de tag (por exemplo, todos os <p>).
document.getElementsByTagName(tagName) 
const divs = document.getElementsByTagName('div')

//Seleciona o primeiro elemento que corresponde ao seletor CSS especificado.
document.querySelector(selector)
const primeiroParagrafo = document.querySelector('p')

//Seleciona todos os elementos que correspondem ao seletor CSS especificado.
document.querySelectorAll(selector)
const todosOsParagrafos = document.querySelectorAll('p')
