import "react-native-gesture-handler";
import React, { Component } from "react";
import {
  Appbar,
  Provider as PaperProvider,
} from "react-native-paper";
import AppNavigatorInicio from "./Inicio/TopBarInicio";
import AppNavigatorGestion from "./Gestión/TopBarGestion";
import AppNavigatorAsociacion from "./Asociacion/TopBarAsociacion";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const TopBarNavigation = createMaterialBottomTabNavigator();
const TopBarInicio = createMaterialBottomTabNavigator();
const TopBarGestion = createMaterialBottomTabNavigator();
const TopBarAsociacion = createMaterialBottomTabNavigator();



class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      routes: [
        { key: "inicio", title: "Inicio", icon: "home" },
        { key: "gestion", title: "Gestión", icon: "text-box-multiple" },
        { key: "asociacion", title: "Asociación", icon: "school" },
      ],
    };
  }

  render() {
    return (
      <PaperProvider>
        <Appbar.Header style={{ backgroundColor: "#C64D4D" }}>
          <Appbar.Action 
            icon="menu"
            onPress={this.props.navigation.openDrawer}
          />
          <Appbar.Content  titleStyle={{ color: "#FFFFFF", fontWeight: "bold", padding: 5}} title="Mec App" />
          
        </Appbar.Header>
     
        <TopBarNavigation.Navigator 
              barStyle = {{
                backgroundColor : "#C64D4D", 
                height: 60,
                justifyContent: "center",
              }}
              initialRouteName = "AppNavigatorInicio"
              activeColor = "#000000"
              tabBarLabelStyle = {{fontSize: 0}} 
              tabBarLabelPosition = {{position: "top"}}
                          
              
        >
              <TopBarInicio.Screen 
                  name="Home2" 
                  component={AppNavigatorInicio}
                  options={{ 
                    tabBarLabel: "Inicio",
                    tabBarIcon: ({color}) => (
                      <MaterialCommunityIcons name="home" color ={color} size={24}/>
                    ),
                  }}
              />
              <TopBarGestion.Screen 
                  name="Gestión" 
                  component={AppNavigatorGestion} 
                  options={{ 
                    tabBarLabel: "Gestión",
                    tabBarIcon: ({color}) => (
                      <MaterialCommunityIcons name="text-box-multiple" color ={color} size={24}/>
                    ),
                  }}
              />
              <TopBarAsociacion.Screen 
                  name="Asocacion" 
                  component={AppNavigatorAsociacion} 
                  options={{ 
                    tabBarLabel: "Asociacion",
                    tabBarIcon: ({color}) => (
                      <MaterialCommunityIcons name="school" color ={color} size={24}/>
                    ),
                  }}
              />
             
              
        </TopBarNavigation.Navigator>
        
        
        
      </PaperProvider>
    );
  }
}

export default Index;