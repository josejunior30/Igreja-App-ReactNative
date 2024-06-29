/* eslint-disable prettier/prettier */

import { Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "navigation/navigationTypes";
import React from "react";
import { View, Text, StyleSheet,  Vibration, TouchableHighlight } from "react-native";
import * as Animatable from 'react-native-animatable'
import { Card } from "react-native-paper";


export default function Inicio() {
 
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const handlePress = (screenName: keyof RootStackParamList) => {
    Vibration.vibrate(100);
    navigation.navigate(screenName);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Escolha uma seção! </Text>
      <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerCard}>
        <TouchableHighlight onPress={() => handlePress('MenuSecretaria')} underlayColor="#DDDDDD">
          <View>
            <Card style={styles.secretaria} elevation={5}>
              <MaterialCommunityIcons name="file-document-edit" style={styles.icone} />
              <Text style={styles.titulo}>Secretaria</Text>
            </Card>
          </View>
        </TouchableHighlight>
      </Animatable.View>
      
      <Animatable.View animation="fadeInRight" delay={600} style={styles.containerCard}>
      
        <TouchableHighlight onPress={() => handlePress('Cursos')} underlayColor="#DDDDDD">
          <View>
            <Card style={styles.cursos} elevation={5}>
              <Ionicons name="school" style={styles.icone} />
              <Text style={styles.titulo}>Cursos</Text>
            </Card>
          </View>
        </TouchableHighlight>
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: '#0b1f34'
  },
  containerCard: {
    marginTop: 60,
  
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  label:{
textAlign:'center',
color:'white', 
marginTop:30,
fontSize: 20
  },
  icone: {
    fontSize: 40,
    textAlign: 'center',
    color: '#ed7947',
  },
  secretaria: {
    borderStyle: 'solid',
    backgroundColor: 'white',
    paddingHorizontal: 28,
    paddingVertical: 30,
    height: 140,
    borderRadius: 20,
    marginRight: 10,
    width:180,
   
  },

  cursos: {
    
    width:180,
    borderStyle: 'solid',
    backgroundColor: 'white',
    paddingVertical: 30,
    paddingHorizontal: 45,
    borderRadius: 20,
    marginRight: 10,
    height: 140,
  },

  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0b1f34',
    textAlign:'center'
  },
});