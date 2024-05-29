/* eslint-disable prettier/prettier */

import React, { useState } from "react"
import { View, Text, Image , StyleSheet, TouchableOpacity} from "react-native"
import * as Animatable from 'react-native-animatable';
import { TextInput } from "react-native-gesture-handler"

import { useAuth } from "~/contexts/AuthContext";





export default function LoginScreen() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const { loginRequest, saveAccessToken, setIsAuthenticated } = useAuth();
  

  
    const handleLogin = async () => {
      try {
        const credentials = { username, password };
        const token = await loginRequest(credentials);
        saveAccessToken(token.access_token);
        setIsAuthenticated(true);
        setErrorMessage(null);

      } catch (error) {
        console.error('Error:', error);
        setErrorMessage('Login failed. Please check your credentials.');
      }
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
        <TextInput
        style={styles.input}
        placeholder="Digite sua senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        />
       <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
       </TouchableOpacity>
    </Animatable.View>

    </View>
    
)

};
const styles = StyleSheet.create({
    container: {
      flex:1,
      backgroundColor:'#0b1f34'
    
    },
    containerHeader:{
      marginTop:'14%',
      marginBottom:'8%',
      paddingStart:'5%'
    },
    message:{
      fontSize:28,
      fontWeight: 'bold',
      color:'#fff'
    },
    logo:{
        width:250,
        height:100,
        marginBottom:18
    },
    title:{
      fontSize:20,
      marginTop:28,
    },

    input:{
      borderBottomWidth:1,
      height:40,
      marginBottom: 12,
      fontSize: 16,
    },
    containerForm:{
      backgroundColor:'#fff',
      flex:1,
       borderTopLeftRadius:25,
       borderTopRightRadius:25,
       paddingStart: '5%',
        paddingEnd: '5%'
    },
  
    button:{
        width: '100%',
        backgroundColor:'#0b1f34',
        borderRadius:4,
        paddingVertical:8,
        marginTop:14,
        justifyContent:'center',
        alignItems:'center'
    },
    buttonText:{
        fontSize:18,
        fontWeight:'bold',
        color:'white'
    }
    });
