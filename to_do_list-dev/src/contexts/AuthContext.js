import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Carrega o usuário salvo ao iniciar o app
  useEffect(() => {
    loadStorageData();
  }, []);

  // Carrega dados do AsyncStorage
  const loadStorageData = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('@TodoApp:user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Erro ao carregar dados do usuário:', error);
    } finally {
      setLoading(false);
    }
  };

  // Função de login
  const signIn = async (email, password) => {
    try {
      // Busca todos os usuários cadastrados
      const storedUsers = await AsyncStorage.getItem('@TodoApp:users');
      const users = storedUsers ? JSON.parse(storedUsers) : [];

      // Verifica se o usuário existe e a senha está correta
      const foundUser = users.find(
        (u) => u.email === email && u.password === password
      );

      if (foundUser) {
        // Remove a senha antes de salvar no estado
        const { password: _, ...userWithoutPassword } = foundUser;
        setUser(userWithoutPassword);
        await AsyncStorage.setItem(
          '@TodoApp:user',
          JSON.stringify(userWithoutPassword)
        );
        return { success: true };
      } else {
        return { success: false, error: 'Email ou senha incorretos' };
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      return { success: false, error: 'Erro ao fazer login' };
    }
  };

  // Função de cadastro
  const signUp = async (name, email, password) => {
    try {
      // Busca usuários existentes
      const storedUsers = await AsyncStorage.getItem('@TodoApp:users');
      const users = storedUsers ? JSON.parse(storedUsers) : [];

      // Verifica se o email já está cadastrado
      const emailExists = users.find((u) => u.email === email);
      if (emailExists) {
        return { success: false, error: 'Este email já está cadastrado' };
      }

      // Cria novo usuário
      const newUser = {
        id: Date.now().toString(),
        name,
        email,
        password,
        createdAt: new Date().toISOString(),
      };

      // Adiciona à lista de usuários
      users.push(newUser);
      await AsyncStorage.setItem('@TodoApp:users', JSON.stringify(users));

      // Faz login automaticamente
      const { password: _, ...userWithoutPassword } = newUser;
      setUser(userWithoutPassword);
      await AsyncStorage.setItem(
        '@TodoApp:user',
        JSON.stringify(userWithoutPassword)
      );

      return { success: true };
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
      return { success: false, error: 'Erro ao cadastrar usuário' };
    }
  };

  // Função de logout
  const signOut = async () => {
    try {
      await AsyncStorage.removeItem('@TodoApp:user');
      setUser(null);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        loading,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};