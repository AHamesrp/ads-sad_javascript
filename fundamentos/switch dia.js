
var dia = 'x';

if( dia == 'Seg'){
    console.log('Matemática e Natureza')

}else if( dia == 'Ter'){
    console.log('Técnico e Linguagem')

}else if( dia == 'Qua'){
    console.log('Matemática e Técnico')

}else if( dia == 'Qui'){
    console.log('Humanas e Natureza')

}else if( dia == 'Sex'){
    console.log('Só Técnico')
}

switch(dia){
    case 'Seg':
        console.log('Matemática e Natureza')
        break;
    case 'Ter':
        console.log('Técnico e Linguagem')
        break;
    case 'Qua':
        console.log('Matemática e Técnico')
        break;
    case 'Qui':
        console.log('Humanas e Natureza')
        break;
    case 'Sex':
        console.log('Só Técnico')
        break;
}