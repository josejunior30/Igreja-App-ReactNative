import { FontAwesome } from '@expo/vector-icons';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
const Header: React.FC<NativeStackHeaderProps> = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.containerLogo}>
        <Image style={styles.logo} source={require('../../../assets/estacao.png')} />
      </View>
      <View style={styles.containerUser}>
        <FontAwesome name="user-circle" size={30} color="white" />
        <Text style={styles.nome}>Olá, Junior!</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#14375B',
    borderBottomWidth: 1, // Adiciona a borda inferior
    borderBottomColor: 'white',
  },
  containerUser: {
    marginLeft: 80,
    flexDirection: 'row',
    marginTop: 40,
  },
  nome: {
    marginLeft: 10,
    fontSize: 18,
    color: 'white',
  },
  containerLogo: {
    marginBottom: 20,
    paddingBottom: 20,
  },
  logo: {
    width: 120,
    height: 50,
    marginLeft: 30,
    marginTop: 30,
  },
});

export default Header;
