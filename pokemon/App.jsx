import { View, Text, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Rotas from "./telas/Rotas";

export default function App(){
    return (
        <NavigationContainer>
            <Rotas/>
        </NavigationContainer>
    );
}