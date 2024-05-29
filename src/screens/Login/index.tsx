/* eslint-disable prettier/prettier */

import React, { useState } from "react"
import { View, Text, Image , StyleSheet, TouchableOpacity} from "react-native"
import { TextInput } from "react-native-gesture-handler"

import { useAuth } from "~/contexts/AuthContext";





export const LoginScreen: React.FC = () => {
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
        <Image
        style={styles.logo}
        source={require('../../../assets/estacao.png')}
      
        />
    <View style={styles.containerInput}>
        <TextInput
        style={styles.input}
        placeholder="Digite seu e-mail"
        value={username}
        onChangeText={setUsername}
        />
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
    </View>

    </View>
    
)

};
const styles = StyleSheet.create({
    container: {
      flex:1,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:'#0b1f34'
    
    },
    logo:{
        width:250,
        height:100,
        marginBottom:18
    },
    input:{
        width: '90%',
        height: 40,
        marginBottom: 20,
        borderRadius: 4,
        paddingHorizontal: 8,
        backgroundColor:'white'
    },
    containerInput:{
        width: '90%',
        justifyContent:'center',
        alignItems:'center',
    },
    button:{
        width: '90%',
        height:40,
        backgroundColor:'#ed7947',
        borderRadius:4,
        justifyContent:'center',
        alignItems:'center'
    },
    buttonText:{
        fontSize:18,
        fontWeight:'bold',
        color:'white'
    }
    });
