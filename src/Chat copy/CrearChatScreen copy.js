import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity, ImageBackground, BackHandler } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const users = [
  { id: '1', name: 'Alice' },
  { id: '2', name: 'Bob' },
  { id: '3', name: 'Charlie' },
];

const CrearChatScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleUserPress = (userId) => {
    navigation.navigate('ChatRoom', { userId });
  };

  const createGroupChat = () => {
    navigation.navigate('CrearGrupoScreen');  // Navega a la nueva pantalla de crear grupo
  };

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        navigation.navigate('Chat');
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [navigation])
  );

  return (
    <ImageBackground
      source={require("../../assets/images/mecanica-transparente.png")}
      style={styles.background}
    >
      <View style={styles.container}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar usuarios..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          selectionColor="black"
        />
        <FlatList
          data={filteredUsers}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleUserPress(item.id)} style={styles.userItem}>
              <Text style={styles.userName}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
        <TouchableOpacity onPress={createGroupChat} style={styles.createGroupButton}>
          <MaterialCommunityIcons name="chat-plus" size={24} color="white" />
          <Text style={styles.createGroupButtonText}>Crear grupo de chat</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Fondo con opacidad para mejorar la legibilidad
    padding: 20,
  },
  searchInput: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  userItem: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  createGroupButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
  },
  createGroupButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default CrearChatScreen;
