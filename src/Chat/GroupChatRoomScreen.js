import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Modal, Button, Image } from 'react-native';
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';

const GroupChatRoomScreen = ({ route }) => {
  const { groupName, userIds } = route.params;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [searchModalVisible, setSearchModalVisible] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    // Datos de ejemplo de mensajes
    setMessages([
      { id: '1', text: 'Hola a todos!', sender: 'Alice', timestamp: new Date() },
      { id: '2', text: '¡Hola Alice!', sender: 'Bob', timestamp: new Date() },
    ]);
  }, []);

  useEffect(() => {
    if (searchTerm) {
      setFilteredMessages(messages.filter(message => message.text.toLowerCase().includes(searchTerm.toLowerCase())));
    } else {
      setFilteredMessages(messages);
    }
  }, [searchTerm, messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { id: Date.now().toString(), text: newMessage, sender: 'Me', timestamp: new Date() }]);
      setNewMessage('');
    }
  };

  const handlePickDocument = async () => {
    try {
      let result = await DocumentPicker.getDocumentAsync({});
      if (result.type === 'success') {
        const fileName = result.name || 'Documento';
        setMessages([...messages, { id: Date.now().toString(), text: fileName, sender: 'Me', timestamp: new Date(), file: result.uri }]);
      }
    } catch (error) {
      console.error('Error picking document:', error);
    }
  };

  const handlePickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setMessages([...messages, { id: Date.now().toString(), text: 'Imagen', sender: 'Me', timestamp: new Date(), image: result.assets[0].uri }]);
    }
  };

  const handleTakePhoto = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status === 'granted') {
      let result = await ImagePicker.launchCameraAsync({
        allowsEditing: false,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setMessages([...messages, { id: Date.now().toString(), text: 'Foto', sender: 'Me', timestamp: new Date(), image: result.assets[0].uri }]);
      }
    }
  };

  const renderMessage = ({ item }) => (
    <View style={[styles.messageContainer, item.sender === 'Me' ? styles.myMessage : styles.otherMessage]}>
      <Text style={styles.senderName}>{item.sender}</Text>
      <Text style={styles.messageText}>{item.text}</Text>
      {item.file && <Text style={styles.fileText}>{item.file}</Text>}
      {item.image && <Image source={{ uri: item.image }} style={styles.image} />}
      <Text style={styles.timestamp}>{item.timestamp.toLocaleTimeString()} {item.timestamp.toLocaleDateString()}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.groupName}>{groupName}</Text>
        </View>
        <TouchableOpacity style={styles.searchIcon} onPress={() => setSearchModalVisible(true)}>
          <FontAwesome name="search" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredMessages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messagesContainer}
      />
      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.mediaButton} onPress={handlePickDocument}>
          <MaterialCommunityIcons name="paperclip" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.mediaButton} onPress={handlePickImage}>
          <MaterialCommunityIcons name="image" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.mediaButton} onPress={handleTakePhoto}>
          <MaterialCommunityIcons name="camera" size={24} color="black" />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Escribe un mensaje..."
          selectionColor="black"
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <MaterialCommunityIcons name="send" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <Modal visible={searchModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar mensajes..."
            value={searchTerm}
            onChangeText={setSearchTerm}
            selectionColor="black"
          />
          <Button title="Cerrar" onPress={() => setSearchModalVisible(false)} />
          <FlatList
            data={filteredMessages}
            renderItem={renderMessage}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.messagesContainer}
          />
        </View>
      </Modal>
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
  groupName: {
    fontSize: 18,
    fontWeight: 'bold',
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
  senderName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
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
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 20,
    padding: 10,
    marginLeft: 5,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ECECEC',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 16,
    marginBottom: 10,
  },
});

export default GroupChatRoomScreen;
