import * as React from "react";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Politica_Calidad from './Politica_Calidad';
import Noticias from './Noticias';

const Tab2 = createMaterialTopTabNavigator();

export default function AppNavigatorGestion() {
  return (
    <Tab2.Navigator
    screenOptions={{       
      
      tabBarActiveTintColor: "#ffffff",
      tabBarInactiveTintColor: "#ccd4e3",
      tabBarIndicatorStyle: {
        backgroundColor: "#ffffff"
      },
      tabBarLabelStyle: {
        fontSize: 10, 
      },
      tabBarStyle: { 
        backgroundColor: "#000000"
      },
      
    }}
    
    >
      
      <Tab2.Screen name="Noticias" component={Noticias} />
      <Tab2.Screen name="Políticas de Calidad" component={Politica_Calidad} />        
    </Tab2.Navigator>
  );
}

