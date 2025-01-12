import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Chat from './Chat';
import ChatRoomScreen from './ChatRoomScreen';
import CrearChatScreen from './CrearChatScreen';
import CrearGrupoScreen from './CrearGrupoScreen';
import GroupChatRoomScreen from './GroupChatRoomScreen';

const Stack = createStackNavigator();

function ChatStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#4CAF50' }, // Color de fondo del encabezado
        headerTintColor: '#fff', // Color del texto del encabezado
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen name="Chat" component={Chat} options={{ title: 'Chat Principal' }} />
      <Stack.Screen name="ChatRoom" component={ChatRoomScreen} options={{ title: 'Sala de Chat' }} />
      <Stack.Screen name="GroupChatRoom" component={GroupChatRoomScreen} options={{ title: 'Sala de Chat Grupal' }} />
      <Stack.Screen name="CrearChatScreen" component={CrearChatScreen} options={{ title: 'Crear Chat' }} />
      <Stack.Screen name="CrearGrupoScreen" component={CrearGrupoScreen} options={{ title: 'Crear Grupo de Chat' }} />
    </Stack.Navigator>
  );
}

export default ChatStackNavigator;
