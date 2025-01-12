import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ImageBackground } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { login } from '../context/authService';

const LoginScreen = ({ navigation }) => {
  const { setUser } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const user = await login(email, password);
      setUser(user);
      navigation.navigate('Chat'); // Navegar a la pantalla de chat después del inicio de sesión
    } catch (error) {
      Alert.alert('Error', 'Error al iniciar sesión. Verifica tus credenciales.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
    source={require("../../assets/images/mecanica-transparente.png")} // Cambia esta URL a la ruta de tu imagen de fondo
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Iniciar Sesión</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          selectionColor="black"
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          selectionColor="black"
        />
        <Button title={loading ? 'Cargando...' : 'Iniciar Sesión'} onPress={handleLogin} disabled={loading} />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover', // Ajusta el tamaño de la imagen
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '90%',
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Fondo blanco con opacidad
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
});

export default LoginScreen;
