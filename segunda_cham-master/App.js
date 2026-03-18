import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from './LoginScreen'
import SuccessScreen from './SuccessScreen'

// Cria o navegador de pilha (stack navigator)
const Stack = createNativeStackNavigator()

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#007AFF',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        {/* Tela de Login */}
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            title: 'Tela de Login',
            headerShown: true,
          }}
        />

        {/* Tela de Sucesso */}
        <Stack.Screen
          name="Success"
          component={SuccessScreen}
          options={{
            title: 'Área Restrita',
            headerShown: true,
            // Previne voltar usando o gesto ou botão de voltar
            headerBackVisible: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
