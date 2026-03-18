import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  ScrollView,
  TouchableOpacity,
  Dimensions 
} from 'react-native';
import { useState } from 'react';

const { width, height } = Dimensions.get('window');

export default function App() {
  const [showAbout, setShowAbout] = useState(false);

  if (showAbout) {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => setShowAbout(false)}
          >
            <Text style={styles.backButtonText}>← Voltar</Text>
          </TouchableOpacity>
          <Text style={styles.aboutTitle}>Sobre o Tema</Text>
        </View>

        <View style={styles.aboutContent}>
          <Text style={styles.aboutSection}>
            <Text style={styles.aboutSectionTitle}>GTA 6</Text>
            {'\n'}Grand Theft Auto VI é um dos jogos mais aguardados da década. Desenvolvido pela Rockstar Games, promete revolucionar o mundo dos jogos open-world com gráficos de última geração, narrativa envolvente e um mundo mais interativo que nunca.
          </Text>

          <Text style={styles.aboutSection}>
            <Text style={styles.aboutSectionTitle}>Pokemon Legends</Text>
            {'\n'}A série Pokemon Legends trouxe uma nova abordagem aos jogos da franquia, com elementos de RPG mais profundos e uma jogabilidade mais livre, permitindo aos jogadores explorar o mundo Pokemon de forma única.
          </Text>

          <Text style={styles.aboutSection}>
            <Text style={styles.aboutSectionTitle}>Silk Song</Text>
            {'\n'}Hollow Knight: Silksong é a sequência muito aguardada do aclamado Hollow Knight. Desenvolvido pela Team Cherry, promete expandir o universo sombrio e atmosférico com nova protagonista e mecânicas inovadoras.
          </Text>

          <Text style={styles.aboutSection}>
            <Text style={styles.aboutSectionTitle}>Kaiju No. 8</Text>
            {'\n'}Kaiju No. 8 é um mangá que conquistou milhões de leitores com sua história sobre monstros gigantes e a luta da humanidade para sobreviver. A obra combina ação intensa com desenvolvimento profundo de personagens.
          </Text>

          <Text style={styles.aboutSection}>
            <Text style={styles.aboutSectionTitle}>Demon Slayer</Text>
            {'\n'}Kimetsu no Yaiba (Demon Slayer) revolucionou o mundo dos animes com suas animações espetaculares e história emocionante sobre Tanjiro Kamado em sua jornada para salvar sua irmã e derrotar demônios.
          </Text>
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.mainContent}>
        {/* Header com título */}
        <Text style={styles.title}>Meus Temas Favoritos</Text>
        
        {/* Imagem central */}
        <View style={styles.imageContainer}>
          <View style={styles.imagePlaceholder}>
            <Text style={styles.imagePlaceholderText}>🎮 📺 🎬</Text>
            <Text style={styles.imagePlaceholderSubtext}>Games & Anime</Text>
          </View>
        </View>

        {/* Texto principal */}
        <View style={styles.textContainer}>
          <Text style={styles.mainText}>
            Bem-vindos ao meu universo de entretenimento! Aqui você encontrará uma seleção dos meus temas favoritos, 
            desde jogos revolucionários até animes que marcaram gerações.
            {'\n\n'}
            Explore cada categoria e descubra o que torna cada uma dessas obras especiais no mundo do entretenimento moderno.
          </Text>
        </View>

        {/* Lista de temas */}
        <View style={styles.topicsContainer}>
          <Text style={styles.topicsTitle}>Principais Temas:</Text>
          
          <View style={styles.topicItem}>
            <Text style={styles.topicEmoji}>🎮</Text>
            <Text style={styles.topicText}>GTA 6</Text>
          </View>
          
          <View style={styles.topicItem}>
            <Text style={styles.topicEmoji}>⚡</Text>
            <Text style={styles.topicText}>Pokemon Legends</Text>
          </View>
          
          <View style={styles.topicItem}>
            <Text style={styles.topicEmoji}>🦋</Text>
            <Text style={styles.topicText}>Silk Song</Text>
          </View>
          
          <View style={styles.topicItem}>
            <Text style={styles.topicEmoji}>👹</Text>
            <Text style={styles.topicText}>Kaiju No. 8</Text>
          </View>
          
          <View style={styles.topicItem}>
            <Text style={styles.topicEmoji}>⚔️</Text>
            <Text style={styles.topicText}>Demon Slayer</Text>
          </View>
        </View>

        {/* Botão About */}
        <TouchableOpacity 
          style={styles.aboutButton}
          onPress={() => setShowAbout(true)}
        >
          <Text style={styles.aboutButtonText}>Saiba Mais Sobre os Temas</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a', // Fundo escuro
  },
  mainContent: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    fontFamily: 'serif', // Times New Roman equivalente
    textAlign: 'center',
    marginBottom: 30,
  },
  imageContainer: {
    marginBottom: 30,
    alignItems: 'center',
  },
  imagePlaceholder: {
    width: width * 0.7,
    height: 200,
    backgroundColor: '#2a2a2a',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#444',
  },
  imagePlaceholderText: {
    fontSize: 40,
    marginBottom: 10,
  },
  imagePlaceholderSubtext: {
    color: '#ffffff',
    fontSize: 18,
    fontFamily: 'serif',
    fontWeight: 'bold',
  },
  textContainer: {
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  mainText: {
    fontSize: 16,
    color: '#ffffff',
    fontFamily: 'serif',
    textAlign: 'center',
    lineHeight: 24,
  },
  topicsContainer: {
    width: '100%',
    marginBottom: 30,
  },
  topicsTitle: {
    fontSize: 22,
    color: '#ffffff',
    fontFamily: 'serif',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  topicItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2a2a2a',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  topicEmoji: {
    fontSize: 24,
    marginRight: 15,
  },
  topicText: {
    fontSize: 18,
    color: '#ffffff',
    fontFamily: 'serif',
    flex: 1,
  },
  aboutButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginBottom: 30,
  },
  aboutButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'serif',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  // Estilos da página About
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
  },
  backButton: {
    marginRight: 20,
  },
  backButtonText: {
    color: '#4CAF50',
    fontSize: 16,
    fontFamily: 'serif',
  },
  aboutTitle: {
    fontSize: 24,
    color: '#ffffff',
    fontFamily: 'serif',
    fontWeight: 'bold',
    flex: 1,
  },
  aboutContent: {
    padding: 20,
  },
  aboutSection: {
    fontSize: 16,
    color: '#ffffff',
    fontFamily: 'serif',
    lineHeight: 22,
    marginBottom: 25,
    backgroundColor: '#2a2a2a',
    padding: 15,
    borderRadius: 10,
  },
  aboutSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
});