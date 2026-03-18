import { View, Text, StatusBar, Image, StyleSheet } from "react-native";

export default function Sandslash() {
  return (
    <View style={estilos.tela}>
      <Image source={require("../imagens/Sandslash.png")} style={{ width: 200, height: 200 }} resizeMode="contain" />
      <Text style={estilos.titulo}>Sandslash</Text>
      <View style={estilos.cxDescricao}>
        <Text style={estilos.descricao}>
           Altura: 1.0 m<br/>
           Peso: 29.5 kg<br/>
           Tipo: Terra<br/>
           Fraquezas: Água, Gelo, Planta
        </Text>
      </View>
      <StatusBar hidden />
    </View>
  );
}

const estilos = StyleSheet.create({
  tela: { backgroundColor: "rgb(210,180,140)", flex: 1, alignItems: "center", padding: 30 },
  titulo: { fontSize: 40, color: "white", fontWeight: "600", marginVertical: 10 },
  cxDescricao: { backgroundColor: "rgba(255,255,255,0.5)", width: 300, borderRadius: 20, padding: 20 },
  descricao: { fontSize: 18, color: "#000" },
});
