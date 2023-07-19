import * as React from "react";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Inicio from "./Inicio";
import Escuela from "./Escuela";
import Autoridades from "./Autoridades";

const Tab1 = createMaterialTopTabNavigator();

export default function AppNavigatorInicio() {
  return (
    <Tab1.Navigator
    screenOptions={{       
      
      tabBarActiveTintColor: "#ffffff",
      tabBarInactiveTintColor: "#ccd4e3",
      tabBarIndicatorStyle: {
        backgroundColor: "white"
      },
      tabBarLabelStyle: { fontSize: 12},
      tabBarStyle: { 
        backgroundColor: "#000000"
      },
      
    }}
    
    >
      <Tab1.Screen name="Inicio" component={Inicio}/>      
      <Tab1.Screen name="Escuela" component={Escuela} />
      <Tab1.Screen name="Autoridades" component={Autoridades} />      
      
    </Tab1.Navigator>
  );
}

