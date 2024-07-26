import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet, ImageBackground } from 'react-native';
import { AuthContext } from '../context/AuthContext';

const ChatScreen = () => {
  const { user, logout } = useContext(AuthContext);

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>No estás autenticado</Text>
      </View>
    );
  }

  return (
    <ImageBackground
    source={require("../../assets/images/mecanica-transparente.png")} // Cambia esta URL a la ruta de tu imagen de fondo
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.message}>Bienvenido, {user.name}!</Text>
        <Button title="Cerrar Sesión" onPress={logout} />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover', // O 'contain' según tus necesidades
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '80%',
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Fondo blanco con opacidad
    borderRadius: 10,
    alignItems: 'center',
  },
  message: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default ChatScreen;
