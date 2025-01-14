import React, { useContext, useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TextInput, 
  TouchableOpacity, 
  ActivityIndicator, 
  ImageBackground, 
  Alert 
} from 'react-native';
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

  // Fetch chats from the backend
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axios.get('https://ingenieria-mecanica-espoch.com/api/chats', {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });
        setIndividualChats(response.data.individual_chats);
        setGroupChats(response.data.group_chats);
      } catch (error) {
        console.error('Error fetching chats:', error);
        Alert.alert('Error', 'No se pudieron cargar los chats. Intente nuevamente.');
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

  const handleChatPress = async (chat) => {
    try {
      const response = await axios.get(`https://ingenieria-mecanica-espoch.com/api/chats/${chat.id}/messages`, {
        headers: { 'Authorization': `Bearer ${user.token}` }
      });
      const messages = response.data.messages;
      navigation.navigate(chat.type === 'individual' ? 'ChatRoom' : 'GroupChatRoom', {
        chatId: chat.id,
        chatName: chat.name,
        messages,
      });
    } catch (error) {
      console.error('Error fetching chat messages:', error);
      Alert.alert('Error', 'No se pudieron cargar los mensajes.');
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="white" />
        <Text style={styles.loadingText}>Cargando chats...</Text>
      </View>
    );
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
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleChatPress({ ...item, type: 'individual' })}>
              <View style={styles.chatItem}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  {item.isOnline && <View style={styles.onlineIndicator} />}
                  <Text style={styles.chatName}>{item.name}</Text>
                </View>
                <Text style={styles.chatMessage}>{item.last_message || 'No hay mensajes aún.'}</Text>
              </View>
            </TouchableOpacity>
          )}
        />

        <Text style={styles.sectionHeader}>Chats Grupales</Text>
        <FlatList
          data={filteredGroupChats}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleChatPress({ ...item, type: 'group' })}>
              <View style={styles.chatItem}>
                <Text style={styles.chatName}>{item.name}</Text>
                <Text style={styles.chatMessage}>{item.last_message || 'No hay mensajes aún.'}</Text>
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
  chatMessage: {
    fontSize: 14,
    color: 'gray',
  },
  onlineIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'green',
    marginRight: 8,
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: 'white',
    fontSize: 18,
    marginTop: 10,
  },
});

export default ChatScreen;
