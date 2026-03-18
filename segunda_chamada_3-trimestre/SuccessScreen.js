import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'

const SuccessScreen = ({ navigation, route }) => {
  // Recebe o nome do usuário passado da tela de login
  const { nomeUsuario } = route.params || { nomeUsuario: 'Usuário' }

  // Função para voltar à tela de login
  const handleLogout = () => {
    navigation.navigate('Login')
  }

  return (
    <View style={styles.container}>
      <View style={styles.successBox}>
        {/* Ícone de sucesso (simulado com emoji) */}
        <Text style={styles.icone}>✓</Text>
        
        {/* Mensagem de boas-vindas */}
        <Text style={styles.titulo}>Login Realizado!</Text>
        
        <Text style={styles.mensagem}>
          Bem-vindo(a), <Text style={styles.nomeUsuario}>{nomeUsuario}</Text>!
        </Text>
        
        <Text style={styles.descricao}>
          Você acessou a área restrita do aplicativo com sucesso.
        </Text>
      </View>

      {/* Botão de Logout */}
      <View style={styles.buttonContainer}>
        <Button
          title="Fazer Logout"
          onPress={handleLogout}
          color="#ff3b30"
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  successBox: {
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  icone: {
    fontSize: 80,
    color: '#34c759',
    marginBottom: 20,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  mensagem: {
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
    marginBottom: 10,
  },
  nomeUsuario: {
    fontWeight: 'bold',
    color: '#007AFF',
  },
  descricao: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    marginTop: 10,
  },
  buttonContainer: {
    marginTop: 30,
    borderRadius: 8,
    overflow: 'hidden',
  },
  infoBox: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginTop: 20,
  },
  infoTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  infoItem: {
    fontSize: 14,
    color: '#666',
    marginVertical: 5,
  },
})

export default SuccessScreen
