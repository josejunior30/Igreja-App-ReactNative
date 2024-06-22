import React, { useContext, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import * as UsuarioLogadoService from '~/service/usuarioLogadoService';
import { ContextToken } from '~/contexts/context-token';
import { getAccessTokenPayload, logout } from '~/service/authHelper';

function ChangePassword() {
    const [showPassword, setShowPassword] = useState(false);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const { contextTokenPayload, setContextTokenPayload } = useContext(ContextToken);
  
    const handleChangePassword = async () => {
      if (newPassword !== confirmNewPassword) {
        setErrorMessage('As senhas não coincidem.');
        return;
      }
  
      try {
        const tokenPayload = getAccessTokenPayload(); // Obter payload do token de acesso
        if (!tokenPayload) {
          // Tratar caso o payload do token não exista
          return;
        }
  
        const { user_name } = tokenPayload; // Extrair o username do payload do token
        const credentialsDTO = {
          username: user_name,
          oldPassword,
          newPassword,
        };
  
        const response = await UsuarioLogadoService.update(credentialsDTO);
        setSuccessMessage('Senha atualizada com sucesso!');
        setOldPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
        logout();
      } catch (error) {
        setErrorMessage('Erro ao atualizar a senha. Por favor, tente novamente.');
        console.error('Erro ao atualizar a senha:', error);
      }
    };
  
    return { handleChangePassword, oldPassword, setOldPassword, newPassword, setNewPassword, confirmNewPassword, setConfirmNewPassword, errorMessage, successMessage};
  }
  
  
  
  
  
  
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <FontAwesome name="lock" size={24} color="black" />
        <TextInput
          style={styles.input}
          placeholder="Senha antiga"
          secureTextEntry
          value={oldPassword}
          onChangeText={setOldPassword}
        />
      </View>
      <View style={styles.inputContainer}>
        <FontAwesome name="lock" size={24} color="black" />
        <TextInput
          style={styles.input}
          placeholder="Nova senha"
          secureTextEntry
          value={newPassword}
          onChangeText={setNewPassword}
        />
      </View>
      <View style={styles.inputContainer}>
        <FontAwesome name="lock" size={24} color="black" />
        <TextInput
          style={styles.input}
          placeholder="Confirmar nova senha"
          secureTextEntry
          value={confirmNewPassword}
          onChangeText={setConfirmNewPassword}
        />
      </View>
      <Text style={styles.errorMessage}>{errorMessage}</Text>
      <Text style={styles.successMessage}>{successMessage}</Text>
      <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
        <Text style={styles.buttonText}>Atualizar Senha</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 20,
    width: '100%',
  },
  input: {
    flex: 1,
    height: 40,
    marginLeft: 10,
    fontSize: 18,
  },
  errorMessage: {
    color: 'red',
    marginTop: 10,
  },
  successMessage: {
    color: 'green',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#14375B',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default ChangePasswordScreen;
