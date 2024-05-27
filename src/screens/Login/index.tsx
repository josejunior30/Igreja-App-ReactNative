/* eslint-disable prettier/prettier */

import React from "react"
import { View, Text, Image , StyleSheet, TouchableOpacity} from "react-native"
import { TextInput } from "react-native-gesture-handler"
import { useNavigation } from "@react-navigation/native"

export default function Login(){
    const navigation = useNavigation();

    const handleOnPress = ()=> {
        navigation.navigate('Inicio');
    }
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
        />
        <TextInput
        style={styles.input}
        placeholder="Digite sua senha"
        secureTextEntry
        />
       <TouchableOpacity style={styles.button} onPress={handleOnPress}>
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
