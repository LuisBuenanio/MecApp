import "react-native-gesture-handler";
import React, { Component, useContext } from "react";
import { Appbar, Provider as PaperProvider } from "react-native-paper";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AppNavigatorInicio from "./Inicio/TopBarInicio";
import AppNavigatorGestion from "./Gestión/TopBarGestion";
import AppNavigatorAsociacion from "./Asociacion/TopBarAsociacion";
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from './context/AuthContext';

const TopBarNavigation = createMaterialBottomTabNavigator();

class Index extends Component {
  render() {
    return (
      <PaperProvider>
        <Appbar.Header style={{ backgroundColor: "#C64D4D" }}>
          <Appbar.Action 
            icon="menu"
            onPress={this.props.navigation.openDrawer}
          />
          <Appbar.Content titleStyle={{ color: "#FFFFFF", fontWeight: "bold", padding: 5 }} title="Mec App" />
        </Appbar.Header>

        <TopBarNavigation.Navigator 
          barStyle={{ backgroundColor: "#C64D4D", height: 60, justifyContent: "center" }}
          initialRouteName="Home2"
          activeColor="#000000"
          tabBarLabelStyle={{ fontSize: 0 }} 
          tabBarLabelPosition={{ position: "top" }}
        >
          <TopBarNavigation.Screen 
            name="Home2" 
            component={AppNavigatorInicio}
            options={{ 
              tabBarLabel: "Inicio",
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="home" color={color} size={24} />
              ),
            }}
          />
          <TopBarNavigation.Screen 
            name="Gestión" 
            component={AppNavigatorGestion} 
            options={{ 
              tabBarLabel: "Gestión",
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="text-box-multiple" color={color} size={24} />
              ),
            }}
          />
          <TopBarNavigation.Screen 
            name="Asociacion" 
            component={AppNavigatorAsociacion} 
            options={{ 
              tabBarLabel: "Asociacion",
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="school" color={color} size={24} />
              ),
            }}
          />
        </TopBarNavigation.Navigator>

        <FloatingButton />
      </PaperProvider>
    );
  }
}

function FloatingButton() {
  const navigation = useNavigation();
  const { user } = useContext(AuthContext);

  const handlePress = () => {
    if (user) {
      navigation.navigate("Chat");
    } else {
      navigation.navigate("Login");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={handlePress}
        style={styles.touchableOpacityStyle}
      >
        <MaterialCommunityIcons
          name="chat"
          style={styles.floatingButtonStyle}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 80,
    right: 20,
  },
  touchableOpacityStyle: {
    backgroundColor: "#C64D4D",
    borderRadius: 30,
    padding: 10,
    elevation: 8,
  },
  floatingButtonStyle: {
    color: "#FFF",
    fontSize: 24,
  },
});

export default Index;
