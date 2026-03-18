import { TouchableOpacity, StyleSheet, Text, ImageBase, Image } from 'react-native';
export default function Cartoes({imagem, titulo, onPress}){
    return(
        <TouchableOpacity style={estilos.cartao} onPress={onPress}>
           <Image source={imagem} style={{width: 80, height: 80}} resizeMode='contain'/>
           <Text style={estilos.titulo}>{titulo}</Text>     
        </TouchableOpacity>
    );
}
export const estilos = StyleSheet.create({
    titulo:{
        backgroundColor: '#737070',
        color: 'white',
        padding: 5,
        borderRadius: 10
    },
    cartao:{
        backgroundColor: '#3ca0c5',
        width: 150,
        height: 150,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
