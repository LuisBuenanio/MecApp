import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { AuthContext } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const ChatScreen = () => {
  const { user } = useContext(AuthContext);
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [individualChats, setIndividualChats] = useState([]);
  const [groupChats, setGroupChats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Función para obtener los chats desde el backend
    const fetchChats = async () => {
      try {
        const response = await axios.get('https://ingenieria-mecanica-espoch.com/api/chats', {
          headers: {
            'Authorization': `Bearer ${user.token}` // Suponiendo que tienes un token de usuario en AuthContext
          }
        });
        setIndividualChats(response.data.individual_chats);
        setGroupChats(response.data.group_chats);
      } catch (error) {
        console.error('Error fetching chats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchChats();
  }, [user.token]);

  const filteredIndividualChats = individualChats.filter(chat =>
    !searchQuery || chat.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredGroupChats = groupChats.filter(chat =>
    !searchQuery || chat.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  

  const handleChatPress = (chat) => {
    if (chat.type === 'individual') {
      navigation.navigate('ChatRoom', {
        chatId: chat.id,
        chatName: chat.name,
      });
    } else if (chat.type === 'group') {
      navigation.navigate('GroupChatRoom', {
        chatId: chat.id,
        chatName: chat.name,
      });
    }
  };

  if (loading) {
    return <Text style={styles.loading}>Cargando chats...</Text>;
  }

  return (
    <ImageBackground
      source={require("../../assets/images/mecanica-transparente.png")}
      style={styles.background}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Bienvenido, {user.name}</Text>
          <TouchableOpacity
            style={styles.settingsButton}
            onPress={() => navigation.navigate('PerfilAjustesScreen')}
          >
            <FontAwesome name="cog" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <TextInput
          style={styles.searchInput}
          placeholder="Buscar chats..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          selectionColor="black"
        />

        <Text style={styles.sectionHeader}>Chats Individuales</Text>
        <FlatList
          data={filteredIndividualChats}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleChatPress({ ...item, type: 'individual' })}>
              <View style={styles.chatItem}>
                <Text style={styles.chatName}>{item.name}</Text>
                <Text style={styles.chatMessage}>{item.last_message}</Text>
              </View>
            </TouchableOpacity>
          )}
        />

        <Text style={styles.sectionHeader}>Chats Grupales</Text>
        <FlatList
          data={filteredGroupChats}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleChatPress({ ...item, type: 'group' })}>
              <View style={styles.chatItem}>
                <Text style={styles.chatName}>{item.name}</Text>
                <Text style={styles.chatMessage}>{item.last_message}</Text>
              </View>
            </TouchableOpacity>
          )}
        />

        <TouchableOpacity
          style={styles.floatingButton}
          onPress={() => navigation.navigate('CrearChatScreen')}
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo con opacidad
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
  chatMessage: {
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
  loading: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default ChatScreen;
