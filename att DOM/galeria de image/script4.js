document.addEventListener('DOMContentLoaded', function() {
    const miniaturas = document.querySelectorAll('.miniatura');
    const imagemDestaque = document.getElementById('imagem-destaque');

    miniaturas.forEach(miniatura => {
        miniatura.addEventListener('click', function() {
            const src = this.getAttribute('src');
            imagemDestaque.setAttribute('src', src);
        });
    });
});
