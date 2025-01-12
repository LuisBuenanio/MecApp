import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const BotonFlotanteCrearChat = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.navigate('CrearChatScreen')}
    >
      <Text style={styles.buttonText}>+</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ff4d4d',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default BotonFlotanteCrearChat;
