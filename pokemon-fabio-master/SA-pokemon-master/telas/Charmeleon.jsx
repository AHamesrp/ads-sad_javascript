import { View, Text, StatusBar, Image, StyleSheet } from "react-native";

export default function Charmeleon() {
  return (
    <View style={estilos.tela}>
      <Image source={require("../imagens/Charmeleon.png")} style={{ width: 200, height: 200 }} resizeMode="contain" />
      <Text style={estilos.titulo}>Charmeleon</Text>
      <View style={estilos.cxDescricao}>
        <Text style={estilos.descricao}>
          Altura: 1.1 m<br/>
          Peso: 19.0 kg<br/>
          Tipo: Fogo<br/>
          Fraquezas: Água, Rocha, Terra
        </Text>
      </View>
      <StatusBar hidden />
    </View>
  );
}

const estilos = StyleSheet.create({
  tela: { backgroundColor: "rgb(255,140,0)", flex: 1, alignItems: "center", padding: 30 },
  titulo: { fontSize: 40, color: "white", fontWeight: "600", marginVertical: 10 },
  cxDescricao: { backgroundColor: "rgba(255,255,255,0.5)", width: 300, borderRadius: 20, padding: 20 },
  descricao: { fontSize: 18, color: "#000" },
});
