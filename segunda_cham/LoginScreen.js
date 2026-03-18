import React, { useState } from 'react'
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native'

const LoginScreen = ({ navigation }) => {
  // Estados para armazenar os valores dos campos de entrada
  const [usuario, setUsuario] = useState('')
  const [senha, setSenha] = useState('')
  const [mensagemErro, setMensagemErro] = useState('')

  // Credenciais fixas (hardcoded) para validação
  const CREDENCIAIS = {
    usuario: 'aluno',
    senha: '123'
  }

  // Função de validação e login
  const handleLogin = () => {
    // Limpa mensagem de erro anterior
    setMensagemErro('')

    // Validação: verifica se os campos não estão vazios
    if (!usuario.trim() || !senha.trim()) {
      setMensagemErro('Por favor, preencha todos os campos')
      return
    }

    // Compara as credenciais digitadas com as credenciais fixas
    if (usuario === CREDENCIAIS.usuario && senha === CREDENCIAIS.senha) {
      // Login bem-sucedido: navega para a tela de sucesso
      navigation.navigate('Success', { nomeUsuario: usuario })
      
      // Limpa os campos após login bem-sucedido
      setUsuario('')
      setSenha('')
    } else {
      // Login falhou: exibe mensagem de erro
      setMensagemErro('Credenciais inválidas. Tente novamente.')
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Login</Text>
      
      {/* Campo de Usuário */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Usuário:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu usuário"
          value={usuario}
          onChangeText={setUsuario}
          autoCapitalize="none"
        />
      </View>

      {/* Campo de Senha */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Senha:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite sua senha"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry={true}
          autoCapitalize="none"
        />
      </View>

      {/* Mensagem de Erro */}
      {mensagemErro ? (
        <Text style={styles.erro}>{mensagemErro}</Text>
      ) : null}

      {/* Botão de Login */}
      <View style={styles.buttonContainer}>
        <Button
          title="Entrar"
          onPress={handleLogin}
          color="#007AFF"
        />
      </View>

      {/* Dica para o usuário */}
      <Text style={styles.dica}>
        Dica: usuário: aluno | senha: 123
      </Text>
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
  titulo: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
    color: '#333',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#555',
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  erro: {
    color: '#ff3b30',
    textAlign: 'center',
    marginBottom: 15,
    fontSize: 14,
    fontWeight: '600',
  },
  buttonContainer: {
    marginTop: 10,
    borderRadius: 8,
    overflow: 'hidden',
  },
  dica: {
    marginTop: 30,
    textAlign: 'center',
    color: '#888',
    fontSize: 12,
    fontStyle: 'italic',
  },
})

export default LoginScreen
