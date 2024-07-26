import React from 'react';
import Index from "./Index";
import Acerca_de from "./Acerca_de";
import Contactanos from "./Contactanos";
import Login from "../src/Chat/Login"; // Asegúrate de tener este archivo
import Chat from "../src/Chat/Chat"; // Asegúrate de tener este archivo

export const InicioScreen = ({ navigation }) => (
  <Index navigation={navigation} name="Inicio" />
);

export const AcercadeScreen = ({ navigation }) => (
  <Acerca_de navigation={navigation} name="Acerca_de" />
);

export const ContactanosScreen = ({ navigation }) => (
  <Contactanos navigation={navigation} name="Contactanos" />
);

export const LoginScreen = ({ navigation }) => (
  <Login navigation={navigation} name="Login" />
);

export const ChatScreen = ({ navigation }) => (
  <Chat navigation={navigation} name="Chat" />
);
