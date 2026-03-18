import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider, useAuth } from './src/contexts/AuthContext';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import HomeScreen from './src/screens/HomeScreen';
import TaskFormScreen from './src/screens/TaskFormScreen';
import ProfileScreen from './src/screens/ProfileScreen';

const Stack = createNativeStackNavigator();

/**
 * Componente de navegação com autenticação
 */
function AppNavigator() {
  const { signed, loading } = useAuth();

  // Exibe loading enquanto verifica autenticação
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2196F3" />
      </View>
    );
  }

  return (
    <>
      <StatusBar style="light" backgroundColor="#2196F3" />
      
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#2196F3',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20,
          },
          headerShadowVisible: true,
          animation: 'slide_from_right',
        }}
      >
        {!signed ? (
          // Telas de autenticação (quando não está logado)
          <>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{
                headerShown: false,
              }}
            />
          </>
        ) : (
          // Telas principais (quando está logado)
          <>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={({ navigation }) => ({
                title: 'Lista de Tarefas',
                headerRight: () => (
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Profile')}
                    style={{ marginRight: 8 }}
                  >
                    <Text style={{ fontSize: 24 }}>👤</Text>
                  </TouchableOpacity>
                ),
              })}
            />
            
            <Stack.Screen
              name="TaskForm"
              component={TaskFormScreen}
              options={({ route }) => ({
                title: route.params?.mode === 'edit' ? 'Editar Tarefa' : 'Nova Tarefa',
                headerBackTitle: 'Voltar',
              })}
            />

            <Stack.Screen
              name="Profile"
              component={ProfileScreen}
              options={{
                title: 'Meu Perfil',
                headerBackTitle: 'Voltar',
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </>
  );
}

/**
 * Componente principal que envolve a navegação com o AuthProvider
 */
export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
});