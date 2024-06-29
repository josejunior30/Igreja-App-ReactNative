import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { registerForPushNotificationsAsync } from '../../service/notificationService'; // Importe a função para obter o token de notificação
import { sendNotification } from '../../service/sendNotificationService';
import Constants from 'expo-constants';

const NotificationScreen = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [token, setToken] = useState<string|null>('');

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const expoPushToken = await registerForPushNotificationsAsync();
        setToken(expoPushToken);
      } catch (error) {
        console.error('Erro ao obter token de notificação:', error);
        Alert.alert('Erro ao obter token de notificação. Por favor, tente novamente.');
      }
    };

    fetchToken();
  }, []);

  const handleSendNotification = async () => {
    try {
      if (!token) {
        Alert.alert('Token de notificação não encontrado. Por favor, tente novamente mais tarde.');
        return;
      }

      await sendNotification(title, body, token);
      Alert.alert('Notificação enviada com sucesso!');
      setTitle('');
      setBody('');
    } catch (error) {
      console.error('Erro ao enviar notificação:', error);
      Alert.alert('Erro ao enviar notificação. Por favor, tente novamente.');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TextInput
        style={{
          height: 40,
          width: '80%',
          borderColor: 'gray',
          borderWidth: 1,
          marginBottom: 20,
          paddingHorizontal: 10,
        }}
        placeholder="Título da notificação"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={{
          height: 80,
          width: '80%',
          borderColor: 'gray',
          borderWidth: 1,
          marginBottom: 20,
          paddingHorizontal: 10,
        }}
        placeholder="Corpo da notificação"
        value={body}
        onChangeText={setBody}
        multiline
      />
      <Button title="Enviar Notificação" onPress={handleSendNotification} />
    </View>
  );
};

export default NotificationScreen;
