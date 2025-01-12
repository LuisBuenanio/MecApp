import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { AuthContext } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const API_URL = 'https://ingenieria-mecanica-espoch.com/api/chats'; // Tu URL correcta

const ChatScreen = () => {
  const { user } = useContext(AuthContext);
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [individualChats, setIndividualChats] = useState([]);
  const [groupChats, setGroupChats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchChats();
  }, []);

  const fetchChats = async () => {
    try {
      setLoading(true);
      const token = user.token; // El token de autenticación del usuario
      const headers = { Authorization: `Bearer ${token}` };

      // Haciendo la solicitud a la API para obtener los chats
      const response = await axios.get(API_URL, { headers });
      
      // Asignamos los chats individuales y grupales
      setIndividualChats(response.data.individual_chats || []); 
      setGroupChats(response.data.group_chats || []);
    } catch (error) {
      console.error('Error fetching chats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChatPress = (chat) => {
    navigation.navigate(chat.type === 'individual' ? 'ChatRoom' : 'GroupChatRoom', {
      chatId: chat.id,
      chatName: chat.name || `Chat ${chat.id}`, // Si no tiene nombre, mostramos el ID
    });
  };

  const renderChatItem = ({ item }) => {
    // Definir el último mensaje si no existe
    const lastMessage = item.messages && item.messages.length > 0
      ? item.messages[item.messages.length - 1].content
      : 'No hay mensajes aún';

    return (
      <TouchableOpacity onPress={() => handleChatPress(item)}>
        <View style={styles.chatItem}>
          <Text style={styles.chatName}>{item.name || `Chat ${item.id}`}</Text>
          <Text style={styles.lastMessage}>{lastMessage}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ImageBackground
      source={require('../../assets/images/mecanica-transparente.png')}
      style={styles.background}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Bienvenido, {user.name}</Text>
          <TouchableOpacity
            style={styles.settingsButton}
            onPress={() => navigation.navigate('ProfileSettings')}
          >
            <FontAwesome name="cog" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <TextInput
          style={styles.searchInput}
          placeholder="Buscar chats..."
          placeholderTextColor="gray"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        {loading ? (
          <Text style={styles.loadingText}>Cargando...</Text>
        ) : (
          <>
            <Text style={styles.sectionHeader}>Chats Individuales</Text>
            <FlatList
              data={individualChats.filter(chat =>
                (chat.name || `Chat ${chat.id}`).toLowerCase().includes(searchQuery.toLowerCase())
              )}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderChatItem}
            />

            <Text style={styles.sectionHeader}>Chats Grupales</Text>
            <FlatList
              data={groupChats.filter(chat =>
                (chat.name || `Chat ${chat.id}`).toLowerCase().includes(searchQuery.toLowerCase())
              )}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderChatItem}
            />
          </>
        )}

        <TouchableOpacity
          style={styles.floatingButton}
          onPress={() => navigation.navigate('CreateChat')}
        >
          <FontAwesome name="plus" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    color: 'white',
  },
  settingsButton: {
    padding: 10,
  },
  searchInput: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 20,
    color: 'white',
    marginVertical: 10,
  },
  chatItem: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  chatName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  lastMessage: {
    fontSize: 14,
    color: 'gray',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#344a72',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    marginVertical: 20,
  },
});

export default ChatScreen;
