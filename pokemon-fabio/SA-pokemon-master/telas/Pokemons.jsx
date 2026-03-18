import { Image, StyleSheet, StatusBar, View } from "react-native";
import Cartoes from "./cartoes";

export default function Pokemons({ navigation }) {
  return (
    <View>
      <Image
        source={require("../imagens/logomarca_pokemon.png")}
        style={{ alignSelf: "center", marginTop: 30 }}
      />
      <View style={styles.grid}>
        <Cartoes imagem={require("../imagens/bulbassauro.png")} titulo="Bulbassauro" onPress={() => navigation.navigate("Bulbassauro")} />
        <Cartoes imagem={require("../imagens/charmander.png")} titulo="Charmander" onPress={() => navigation.navigate("Charmander")} />
        <Cartoes imagem={require("../imagens/Squirtle.png")} titulo="Squirtle" onPress={() => navigation.navigate("Squirtle")} />
        <Cartoes imagem={require("../imagens/zubat.png")} titulo="Zubat" onPress={() => navigation.navigate("Zubat")} />
        <Cartoes imagem={require("../imagens/Sandslash.png")} titulo="Sandslash" onPress={() => navigation.navigate("Sandslash")} />
        <Cartoes imagem={require("../imagens/Charmeleon.png")} titulo="Charmeleon" onPress={() => navigation.navigate("Charmeleon")} />
      </View>
      <StatusBar hidden />
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 20,
    justifyContent: "center",
    marginTop: 20,
  },
});
