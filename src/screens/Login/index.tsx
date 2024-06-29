import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { AxiosError } from 'axios';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import * as Animatable from 'react-native-animatable';

import { useAuth } from '~/contexts/AuthContext';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { loginRequest, saveAccessToken, setIsAuthenticated } = useAuth();

  const handleLogin = async () => {
    try {
      const credentials = { username, password };
      const token = await loginRequest(credentials);
      saveAccessToken(token.access_token);
      setIsAuthenticated(true);
      setErrorMessage(null);
    } catch (error: unknown) {
      console.error('Error:', error);
  
      // Verifica se o erro é uma instância de AxiosError
      if (error instanceof AxiosError) {
        if (error.response) {
          if (error.response.status === 401) {
            setErrorMessage('Credenciais inválidas. Verifique seu e-mail e senha');
            Alert.alert('Erro de Login', 'Credenciais inválidas. Verifique seu e-mail e senha.');
          } else {
            setErrorMessage('Erro ao tentar fazer login. Tente novamente mais tarde.');
            Alert.alert('Erro de Login', 'Erro ao tentar fazer login. Tente novamente mais tarde.');
          }
        } else {
          setErrorMessage('Erro ao tentar fazer login. Verifique sua conexão.');
          Alert.alert('Erro de Login', 'Erro ao tentar fazer login. Verifique sua conexão.');
        }
      } else {
        // Tratamento genérico para outros tipos de erro
        setErrorMessage('Ocorreu um erro inesperado. Tente novamente mais tarde.');
        Alert.alert('Erro de Login', 'Ocorreu um erro inesperado. Tente novamente mais tarde.');
      }
    }
  };
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={styles.container}>
      <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader}>
        <Text style={styles.message}>Bem-Vindo(a)</Text>
      </Animatable.View>

      <Animatable.View animation="fadeInUp" style={styles.containerForm}>
        <Text style={styles.title}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu e-mail"
          value={username}
          onChangeText={setUsername}
        />
        <Text style={styles.title}>Senha</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.inputPassword}
            placeholder="Digite sua senha"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity style={styles.toggleButton} onPress={toggleShowPassword}>
            <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} size={20} color="#333" />
          </TouchableOpacity>
        </View>
        {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b1f34',
  },
  containerHeader: {
    marginTop: '14%',
    marginBottom: '8%',
    paddingStart: '5%',
  },
  message: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  title: {
    fontSize: 20,
    marginTop: 28,
  },
  input: {
    borderBottomWidth: 1,
    height: 40,
    marginBottom: 12,
    fontSize: 16,
  },
  containerForm: {
    backgroundColor: '#fff',
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: '5%',
    paddingEnd: '5%',
  },
  button: {
    width: '100%',
    backgroundColor: '#0b1f34',
    borderRadius: 4,
    paddingVertical: 8,
    marginTop: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  errorMessage: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 12,
    height: 40,
  },
  inputPassword: {
    flex: 1,
    fontSize: 16,
  },
  toggleButton: {
    padding: 10,
  },
});
