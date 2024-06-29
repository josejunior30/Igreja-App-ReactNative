import { Ionicons } from '@expo/vector-icons';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useNavigation } from '@react-navigation/native';

import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Button, Alert } from 'react-native';
import * as Updates from 'expo-updates';

import { useAuth } from '~/contexts/AuthContext';
import * as usuarioLogadoService from '~/service/usuarioLogadoService';



const ChangePasswordScreen = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigation = useNavigation();
  const { getAccessTokenPayload, logout } = useAuth();

  const handleChangePassword = async () => {
    if (newPassword !== confirmNewPassword) {
      setErrorMessage('As senhas não coincidem.');
      return;
    }

    try {
      const tokenPayload = await getAccessTokenPayload();
      if (!tokenPayload) {
        setErrorMessage('Usuário não autenticado.');
        return;
      }

      const credentialsDTO = {
        username: tokenPayload.user_name,
        oldPassword,
        newPassword,
      };

      await usuarioLogadoService.update(credentialsDTO);
      setSuccessMessage('Senha atualizada com sucesso!');
      Alert.alert('Sucesso', 'Senha atualizada com sucesso!', [
        {
          text: 'OK',
          onPress: async () => {
            await logout();
            await Updates.reloadAsync();
          },
        },
      ]);
      setOldPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(`Erro: ${error.message}`);
      } else {
        setErrorMessage('Erro ao atualizar a senha. Por favor, tente novamente.');
      }
      console.error('Erro ao atualizar a senha:', error);
    }
  };

  const toggleShowOldPassword = () => {
    setShowOldPassword(!showOldPassword);
  };

  const toggleShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.containerVoltar} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back-circle" size={30} color="white" />
        <Text style={styles.voltar}>Voltar</Text>
      </TouchableOpacity>

      <View style={styles.containerInput}>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.inputPassword}
            placeholder="Senha antiga"
            secureTextEntry={!showOldPassword}
            value={oldPassword}
            onChangeText={setOldPassword}
          />
          <TouchableOpacity style={styles.toggleButton} onPress={toggleShowOldPassword}>
            <FontAwesomeIcon icon={showOldPassword ? faEye : faEyeSlash} size={20} color="#333" />
          </TouchableOpacity>
        </View>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.inputPassword}
            placeholder="Nova senha"
            secureTextEntry={!showNewPassword}
            value={newPassword}
            onChangeText={setNewPassword}
          />
          <TouchableOpacity style={styles.toggleButton} onPress={toggleShowNewPassword}>
            <FontAwesomeIcon icon={showNewPassword ? faEye : faEyeSlash} size={20} color="#333" />
          </TouchableOpacity>
        </View>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.inputPassword}
            placeholder="Confirmar nova senha"
            secureTextEntry={!showConfirmPassword}
            value={confirmNewPassword}
            onChangeText={setConfirmNewPassword}
          />
          <TouchableOpacity style={styles.toggleButton} onPress={toggleShowConfirmPassword}>
            <FontAwesomeIcon icon={showConfirmPassword ? faEye : faEyeSlash} size={20} color="#333" />
          </TouchableOpacity>
        </View>
        {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
        {successMessage && <Text style={styles.success}>{successMessage}</Text>}
        <Button title="Salvar" onPress={handleChangePassword} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b1f34',
  },
  containerInput: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  inputPassword: {
    flex: 1,
    height: 50,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  success: {
    color: 'green',
    marginBottom: 10,
  },
  voltar: {
    fontSize: 16,
    marginLeft: 10,
    fontWeight: 'bold',
    color: 'white',
  },
  containerVoltar: {
    marginLeft: 30,
    flexDirection: 'row',
    marginBottom: 100,
    marginTop: 20,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    borderRadius: 4,
  },
  toggleButton: {
    padding: 10,
    backgroundColor: 'white',
    height: 50,
  },
});

export default ChangePasswordScreen;
