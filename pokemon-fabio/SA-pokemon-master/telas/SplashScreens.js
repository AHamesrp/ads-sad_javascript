import { Text, StatusBar, ImageBackground, StyleSheet, Image } from "react-native";
import Fundo from '../imagens/fundo.jpg';
import Carregando from '../imagens/carregando.gif';
import { useEffect } from "react";


export default function SplashScreens({navigation}){
    useEffect(()=>{
       setTimeout(()=> navigation.replace('Pokemons'),3000)
    },[])
    return (
        <ImageBackground source={Fundo} style={styles.container}>
            <Image
            source={Carregando}
            style={{height:50,width:50}}
            /> 
            <Text style={{color:'white',fontWeight:'bold'}}>Carregando</Text>
            <StatusBar hidden={true}/>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
});

