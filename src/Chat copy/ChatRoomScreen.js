import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Modal, Button, Image, Linking } from 'react-native';
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import io from 'socket.io-client';

const ChatRoomScreen = ({ route }) => {
  const { userId, userName, userOnlineStatus } = route.params;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [searchModalVisible, setSearchModalVisible] = useState(false);
  const [otherUserTyping, setOtherUserTyping] = useState(false);
  const [onlineStatus, setOnlineStatus] = useState(userOnlineStatus);

  const socket = io('https://ingenieria-mecanica-espoch/api'); // Cambia esto por la URL de tu backend

  useEffect(() => {
    // Escuchar actualizaciones del estado en línea y el estado de escritura
    socket.on('userOnlineStatus', (status) => {
      if (status.userId === userId) {
        setOnlineStatus(status.online);
      }
    });

    socket.on('typingStatus', (status) => {
      if (status.userId === userId) {
        setOtherUserTyping(status.typing);
      }
    });

    // Limpiar la conexión cuando el componente se desmonta
    return () => {
      socket.disconnect();
    };
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = { id: Date.now().toString(), text: newMessage, sender: 'me', timestamp: new Date() };
      setMessages([...messages, message]);
      socket.emit('sendMessage', { message, to: userId }); // Enviar mensaje al backend
      setNewMessage('');
    }
  };

  const handleTyping = (text) => {
    setNewMessage(text);
    socket.emit('typingStatus', { typing: text.trim() !== '', to: userId }); // Enviar estado de escritura
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.userName}>{userName}</Text>
          <Text style={styles.userStatus}>{onlineStatus ? 'En línea' : 'Desconectado'}</Text>
        </View>
        <TouchableOpacity style={styles.searchIcon} onPress={() => setSearchModalVisible(true)}>
          <FontAwesome name="search" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredMessages}
        renderItem={({ item }) => (
          <View style={[styles.messageContainer, item.sender === 'me' ? styles.myMessage : styles.otherMessage]}>
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messagesContainer}
      />
      <View style={styles.typingStatusContainer}>
        <Text style={styles.typingStatusText}>{otherUserTyping ? `${userName} está escribiendo...` : ''}</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newMessage}
          onChangeText={handleTyping}
          placeholder="Escribe un mensaje..."
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <MaterialCommunityIcons name="send" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#4CAF50',
    padding: 10,
  },
  headerContent: {
    flexDirection: 'column',
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  userStatus: {
    fontSize: 14,
    color: 'white',
  },
  searchIcon: {
    marginRight: 10,
  },
  messagesContainer: {
    padding: 10,
  },
  messageContainer: {
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    maxWidth: '80%',
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#ECECEC',
  },
  messageText: {
    fontSize: 16,
  },
  fileText: {
    fontSize: 14,
    color: 'blue',
    textDecorationLine: 'underline',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginTop: 5,
  },
  timestamp: {
    fontSize: 12,
    color: '#888',
    alignSelf: 'flex-end',
  },
  typingStatusContainer: {
    alignItems: 'flex-start',
    padding: 5,
  },
  typingStatusText: {
    fontSize: 14,
    color: '#888',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ECECEC',
    padding: 5,
  },
  mediaButton: {
    marginHorizontal: 5,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ECECEC',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 20,
    padding: 10,
  },
  modalContainer: {
    flex: 1,
    padding: 10,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ECECEC',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
  },
});

export default ChatRoomScreen;
