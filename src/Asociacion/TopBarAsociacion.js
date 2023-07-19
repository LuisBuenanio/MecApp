import * as React from "react";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Int_Asociacion from "./Int_Asociacion";
import Asociacion from "./Asociacion";


const Tab3 = createMaterialTopTabNavigator ();

export default function AppNavigatorAsociacion() {
  return (
    <Tab3.Navigator
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
      <Tab3.Screen name="Asociación" component={Asociacion} />      
      <Tab3.Screen name="Integrantes Aso" component={Int_Asociacion} />
    </Tab3.Navigator>
  );
}
