//Manipulando Conteúdo

//Alterando o Conteúdo:

//Permite que você defina ou obtenha o HTML interno de um elemento
element.innerHTML
const paragrafo = document.querySelector('p')
paragrafo.innerHTML = 'Este é o novo conteúdo do parágrafo.';

//Permite que você defina ou obtenha apenas o texto interno de um elemento, sem considerar o HTML.
element.textContent
const titulo = document.querySelector('h1')
titulo.textContent = 'Novo Título';




//Alterando atributos:

//Define o valor de um atributo específico em um elemento.
element.setAttribute(attrName, attrValue)
const link = document.querySelector('a');
link.setAttribute('href', 'https://www.example.com');

//Obtém o valor de um atributo específico de um elemento.
element.getAttribute(attrName)
const hrefValue = link.getAttribute('href');

//Remove um atributo específico de um elemento.
element.removeAttribute(attrName)
link.removeAttribute('href');



//Manipulando Estilos:

//Permite alterar estilos CSS diretamente a partir do JavaScript.
element.style.propertyName 
const div = document.querySelector('div');
div.style.backgroundColor = 'blue';

//Permite alterar estilos CSS diretamente a partir do JavaScript.
element.style.propertyName
const div = document.querySelector('div');
div.style.backgroundColor = 'blue';

