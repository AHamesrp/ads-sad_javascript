//Array vazio para armazenar os usuários
const usuarios = [];

//Função para adicionar um novo usuário
function adicionarUsuario(nome, idade, email) {
    if (!nome && !idade && !email) {
        console.error("Todos os campos devem ser preenchidos.");
        return;
    }

    if (idade <= 0) {
        console.error("A idade deve ser maior que 0.");
        return;
    }
    
    const novoUsuario = { nome, idade, email };
    usuarios.push(novoUsuario);
}

//Função para listar os usuários cadastrados
function listarUsuarios() {
    console.log("Usuários cadastrados:");
    usuarios.forEach((usuario) => {
        console.log(`Nome: ${usuario.nome}, Idade: ${usuario.idade}, Email: ${usuario.email}`);
    });
}

//Exemplo
adicionarUsuario("Arthur", 16, "arthur_hames@estudante.sesisenai.org.br");
adicionarUsuario("Ramon", 25, "ramon.brignoli@edu.sc.senai.br");
listarUsuarios();
