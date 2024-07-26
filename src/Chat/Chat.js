// ChatScreen.js
import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AuthContext } from '../context/AuthContext';

const ChatScreen = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>No estás autenticado</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.message}>Bienvenido, {user.name}!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    fontSize: 20,
  },
});

export default ChatScreen;
