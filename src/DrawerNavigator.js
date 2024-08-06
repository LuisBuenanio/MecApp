import React, { useContext } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { InicioScreen, AcercadeScreen, ContactanosScreen, LoginScreen } from './SlideMenu';
import SideBar from "../components/SideBar";
import PerfilAjustesScreen from './Chat/PerfilAjustesScreen';
import ChatStackNavigator from './Chat/ChatStackNavigator'; // Asegúrate de que la ruta sea correcta
import { AuthContext } from './context/AuthContext';

const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  const { user, logout } = useContext(AuthContext);

  return (
    <Drawer.Navigator
      initialRouteName="Chat"
      drawerContent={(props) => <SideBar {...props} />}
      drawerHideStatusBarOnOpen
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
      <Drawer.Screen name="Inicio" component={InicioScreen} options={{
        headerShown: false,
        drawerLabel: 'Inicio',
        drawerIcon: () => <MaterialCommunityIcons name="home" size={26} color={"#000000"} />,
      }} />
      <Drawer.Screen name="Acerca de" component={AcercadeScreen} options={{
        headerShown: false,
        drawerLabel: 'Acerca de',
        drawerIcon: () => <MaterialCommunityIcons name="account-question" size={26} color={"#000000"} />,
      }} />
      <Drawer.Screen name="Contáctanos" component={ContactanosScreen} options={{
        headerShown: false,
        drawerLabel: 'Contáctanos',
        drawerIcon: () => <MaterialCommunityIcons name="account-supervisor-circle" size={26} color={"#000000"} />,
      }} />
      {user ? (
        <>
          <Drawer.Screen name="Chat" component={ChatStackNavigator} options={{
            drawerLabel: 'Chat',
            headerShown: false,
            drawerIcon: ({ color }) => <MaterialCommunityIcons name="chat" color={color} size={24} />,
          }} />
          <Drawer.Screen name="PerfilAjustesScreen" component={PerfilAjustesScreen} options={{
            title: "Ajustes de Perfil",
            drawerIcon: ({ color }) => <MaterialCommunityIcons name="account-settings" color={color} size={24} />,
          }} />
          <Drawer.Screen name="Logout" component={LogoutScreen} options={{
            title: "Cerrar Sesión",
            drawerIcon: ({ color }) => <MaterialCommunityIcons name="logout" color={color} size={24} />,
          }} />
        </>
      ) : (
        <Drawer.Screen name="Login" component={LoginScreen} options={{
          title: "Iniciar Sesión",
          drawerIcon: ({ color }) => <MaterialCommunityIcons name="login" color={color} size={24} />,
        }} />
      )}
    </Drawer.Navigator>
  );
}

function LogoutScreen() {
  const { logout } = useContext(AuthContext);

  React.useEffect(() => {
    logout();
  }, []);

  return null;
}

export default DrawerNavigator;
