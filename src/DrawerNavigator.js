import React, { useContext } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { InicioScreen, AcercadeScreen, ContactanosScreen, LoginScreen, ChatScreen } from "./SlideMenu";
import SideBar from "../components/SideBar";
import { AuthContext } from './context/AuthContext';

const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  const { user } = useContext(AuthContext);

  return (
    <Drawer.Navigator
      initialRouteName="Inicio"
      drawerContent={(props) => <SideBar {...props} />}
      screenOptions={{
        drawerActiveBackgroundColor: "#ccd4e3",
        drawerInactiveTintColor: "#000000",
        drawerActiveTintColor: "#000000",
        drawerItemStyle: { borderRadius: 8 },
        drawerLabelStyle: { fontSize: 15, fontWeight: "bold" },
        drawerStyle: {
          width: Dimensions.get("window").width * 0.75,
        },
      }}
    >
      <Drawer.Screen
        name="Inicio"
        component={InicioScreen}
        options={{
          headerShown: false,
          drawerLabel: 'Inicio',
          drawerIcon: () => (
            <MaterialCommunityIcons name="home" size={26} color={"#000000"} />
          ),
        }}
      />
      <Drawer.Screen
        name="Acerca de"
        component={AcercadeScreen}
        options={{
          headerShown: false,
          drawerLabel: 'Acerca de',
          drawerIcon: () => (
            <MaterialCommunityIcons name="account-question" size={26} color={"#000000"} />
          ),
        }}
      />
      <Drawer.Screen
        name="Contáctanos"
        component={ContactanosScreen}
        options={{
          headerShown: false,
          drawerLabel: 'Contáctanos',
          drawerIcon: () => (
            <MaterialCommunityIcons name="account-supervisor-circle" size={26} color={"#000000"} />
          ),
        }}
      />
      {user && (
        <Drawer.Screen
          name="Chat"
          component={ChatScreen}
          options={{
            title: "Chat",
            drawerIcon: ({ color }) => (
              <MaterialCommunityIcons name="chat" color={color} size={24} />
            ),
          }}
        />
      )}
      {!user && (
        <Drawer.Screen
          name="Login"
          component={LoginScreen}
          options={{
            title: "Iniciar Sesión",
            drawerIcon: ({ color }) => (
              <MaterialCommunityIcons name="login" color={color} size={24} />
            ),
          }}
        />
      )}
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;
