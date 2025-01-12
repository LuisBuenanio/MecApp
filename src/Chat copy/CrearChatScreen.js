import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity, ImageBackground, BackHandler, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Config from '../../config';

const API_URL = Config.API_URL;

const CrearChatScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(API_URL + "/users");
        const data = await response.json();
  
        // Asegúrate de acceder al array dentro de "users"
        if (data.users) {
          setUsers(data.users); // Aquí `data.users` es el array
        } else {
          console.error("Formato de respuesta inesperado:", data);
          setError("Los datos no tienen el formato esperado.");
        }
      } catch (err) {
        console.error("Error al obtener usuarios:", err);
        setError("Error al obtener los datos del servidor.");
      } finally {
        setLoading(false); // Detén el indicador de carga
      }
    };
  
    fetchUsers();
  }, []);
  

  const filteredUsers = users
      .filter(user =>user.name.toLowerCase().includes(searchQuery.toLowerCase()))
      .slice(0, 10)
  ;
  

  const handleUserPress = (userId) => {
    navigation.navigate('ChatRoom', { userId });
  };

  const createGroupChat = () => {
    navigation.navigate('CrearGrupoScreen');
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
        {loading ? (
          <ActivityIndicator size="large" color="#4CAF50" />
        ) : (
          <>
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar usuarios..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              selectionColor="black"
            />
             {filteredUsers.length > 0 ? (
              <FlatList
                data={filteredUsers}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => handleUserPress(item.id)} style={styles.userItem}>
                    <Text style={styles.userName}>{item.name}</Text>
                  </TouchableOpacity>
                )}
              />
            ) : (
              <Text style={styles.noUsersText}>Usuario no encontrado</Text>
            )}
            <TouchableOpacity onPress={createGroupChat} style={styles.createGroupButton}>
              <MaterialCommunityIcons name="chat-plus" size={24} color="white" />
              <Text style={styles.createGroupButtonText}>Crear grupo de chat</Text>
            </TouchableOpacity>
          </>
        )}
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
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
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
  noUsersText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    marginTop: 20,
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
