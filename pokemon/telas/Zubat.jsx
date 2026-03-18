import { View, Text, StatusBar, Image, StyleSheet } from "react-native";

export default function Zubat() {
  return (
    <View style={estilos.tela}>
      <Image source={require("../imagens/zubat.png")} style={{ width: 200, height: 200 }} resizeMode="contain" />
      <Text style={estilos.titulo}>Zubat</Text>
      <View style={estilos.cxDescricao}>
        <Text style={estilos.descricao}>
           Altura: 0.8 m<br/>
           Peso: 7.5 kg<br/>
           Tipo: Voador / Veneno<br/>
           Fraquezas: Elétrico, Gelo, Psíquico, Pedra
        </Text>
      </View>
      <StatusBar hidden />
    </View>
  );
}

const estilos = StyleSheet.create({
  tela: { backgroundColor: "rgb(123,104,238)", flex: 1, alignItems: "center", padding: 30 },
  titulo: { fontSize: 40, color: "white", fontWeight: "600", marginVertical: 10 },
  cxDescricao: { backgroundColor: "rgba(255,255,255,0.5)", width: 300, borderRadius: 20, padding: 20 },
  descricao: { fontSize: 18, color: "#000" },
});
