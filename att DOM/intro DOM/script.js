const paragrafo1 = document.getElementById("paragrafo1")
const paragrafo2 = document.getElementsByClassName("paragrafo2")[0]
const botao = document.getElementById("botao")
//selecionando elementos do ex02
const link = document.getElementById("link")
const imagem = document.getElementById("imagem")
const botaoimg = document.getElementById("botaoimg")

botao.addEventListener('click', function(){
    paragrafo1.textContent = "Novo texto do paragrafo 1"
    paragrafo2.textContent = "Novo texto do paragrafo 2"
})

//Use getAttribute() e setAttribute() para alterar o href do link.
link.setAttribute('href', 'https://www.petlove.com.br/')
link.textContent = "Acessar Petlove"

//adicionando estilo no link
link.style.color = "red"
link.style.fontWeight = "bold"

var imagemAtual = 1
botaoimg.addEventListener('click', function(){
    if(imagemAtual === 1){
        imagem.setAttribute('src', 'img2.jpg')
        imagemAtual = 2
    }else{
        imagem.setAttribute('src', 'img1.jpg')
        imagemAtual = 1
    }
})

imagem.style.width = '600px'
imagem.style.height = '500px'
imagem.style.objectFit = 'cover'
imagem.style.borderRadius = '30px'