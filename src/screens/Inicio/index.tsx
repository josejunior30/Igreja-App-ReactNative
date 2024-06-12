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
      <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerCard}>
        <TouchableHighlight onPress={() => handlePress('MenuSecretaria')} underlayColor="#DDDDDD">
          <View>
            <Card style={styles.secretaria} elevation={5}>
              <MaterialCommunityIcons name="file-document-edit" style={styles.icone} />
              <Text style={styles.titulo}>Secretaria</Text>
            </Card>
          </View>
        </TouchableHighlight>
        <TouchableHighlight  underlayColor="#DDDDDD">
          <View>
            <Card style={styles.calendario} elevation={5}>
              <MaterialIcons name="calendar-month" style={styles.icone} />
              <Text style={styles.titulo}>Calendário</Text>
            </Card>
          </View>
        </TouchableHighlight>
      </Animatable.View>
      
      <Animatable.View animation="fadeInRight" delay={600} style={styles.containerCard}>
        <TouchableHighlight  underlayColor="#DDDDDD">
          <View>
            <Card style={styles.avisos} elevation={5}>
              <Ionicons name="notifications" style={styles.icone} />
              <Text style={styles.titulo}>Avisos</Text>
            </Card>
          </View>
        </TouchableHighlight>
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
    backgroundColor: '#DCDCDC'
  },
  containerCard: {
    marginTop: 80,
    backgroundColor: '#DCDCDC',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
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
  },
  calendario: {
    borderStyle: 'solid',
    backgroundColor: 'white',
    paddingHorizontal: 28,
    paddingVertical: 30,
    borderRadius: 20,
    marginLeft: 10,
    height: 140,
  },
  cursos: {
    borderStyle: 'solid',
    backgroundColor: 'white',
    paddingVertical: 30,
    paddingHorizontal: 45,
    borderRadius: 20,
    marginLeft: 10,
    height: 140,
  },
  avisos: {
    borderStyle: 'solid',
    backgroundColor: 'white',
    paddingHorizontal: 45,
    paddingVertical: 30,
    borderRadius: 20,
    marginRight: 10,
    height: 140,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0b1f34',
  },
});