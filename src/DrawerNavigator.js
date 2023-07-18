import React from 'react';
import "react-native-gesture-handler";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import {InicioScreen, AcercadeScreen, ContactanosScreen} from "./SlideMenu";
import SideBar from "../components/SideBar";
import { Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


const Stack = createNativeStackNavigator();

const Drawer = createDrawerNavigator();
function DrawerNavigator() {

  return (
    <NavigationContainer>
      <Drawer.Navigator 
      initialRouteName="FadeApp"
      drawerContent={(props) => <SideBar {...props} />}
      
      drawerHideStatusBarOnOpen     
      
      screenOptions= {{
        drawerActiveBackgroundColor : "#ccd4e3",
        drawerInactiveTintColor : "#000000",
        drawerActiveTintColor : "#000000",
        drawerItemStyle : { borderRadius: 8,},
        drawerLabelStyle : {  fontSize: 15, fontWeight: "bold"},
        paddingTop: 0,
        drawerStyle: {
          drawerwidth: Dimensions.get("window").width * 0.75,
          //width: 298,

        },
      }}
      
      
      >
        <Drawer.Screen name="FadeApp" component={InicioScreen} 
          options={{ 
            headerShown: false,
            drawerLabel: 'Inicio',
            drawerInactiveTintColor : "#000000",
            drawerActiveTintColor : "#000000",        
            drawerIcon : () => (
            <MaterialCommunityIcons name="home" size={26} color={"#000000"}/>
            ),
            
          }}/>
          
        <Drawer.Screen name="Acerca de" component={AcercadeScreen} 
        options={{ 
          headerShown: false,
          drawerLabel: 'Acerca de',
          drawerIcon : () => (
            <MaterialCommunityIcons name="account-question" size={26} color={"#000000"} />
          ),
        }}/>        
        <Drawer.Screen name="Contáctanos" component={ContactanosScreen} 
        options={{ 
          headerShown: false,
          drawerLabel: 'Contáctanos',
          drawerIcon : () => (
            <MaterialCommunityIcons name="account-supervisor-circle" size={26} color={"#000000"} />
          ),        
        }} />       
               
        
      </Drawer.Navigator>
      
    </NavigationContainer>
  );
}



export default DrawerNavigator;
