import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Telas
import SplashScreens from "./SplashScreens";
import Pokemons from "./Pokemons";
import Bulbassauro from "./Bulbassauro";
import Charmander from "./Charmander";
import Squirtle from "./Squirtle";
import Zubat from "./Zubat";
import Sandslash from "./Sandslash";
import Charmeleon from "./Charmeleon";

const Stack = createNativeStackNavigator();

export default function Rotas() {
  return (
    <Stack.Navigator initialRouteName="SplashScreens">
      <Stack.Screen
        name="SplashScreens"
        component={SplashScreens}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Pokemons"
        component={Pokemons}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Bulbassauro" component={Bulbassauro}/>
      <Stack.Screen name="Charmander" component={Charmander}/>
      <Stack.Screen name="Squirtle" component={Squirtle}/>
      <Stack.Screen name="Zubat" component={Zubat}/>
      <Stack.Screen name="Sandslash" component={Sandslash}/>
      <Stack.Screen name="Charmeleon" component={Charmeleon}/>
    </Stack.Navigator>
  );
}
