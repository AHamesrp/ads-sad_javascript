function Titulo(){

    let nome = "Rodrigo Flexa";
    const soma = 20 + 20;
    let idade = 34;
    const ImgUrl ="https://imgs.search.brave.com/l4I5I7tSs67f0RHuJAy5auRLToflsoAX61OY0SQFJwM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzhhL2I5/L2U0LzhhYjllNDFh/NmJmMjc5NTJlYWJm/MzQ2NmE2NTBmZTdj/LmpwZw"

    return (
    <div>
        <h1>Oi, eu sou o Pikachu!</h1>
        <p>Eu estou muito feliz com tudo 
            o que vem acontecendo..<br/>
           Minha vida e rotina tem 
           mudado bastante estes dias.<br/>
           O valor é {soma} 
        </p>
        <p>Eu sou o {nome}<br></br>
            Eu tenho {idade} anos de idade
        </p>
         <img src={ImgUrl} width={150} />
    </div>

    )
}
export default Titulo