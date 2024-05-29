import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';

export default function Welcome({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.containerLogo}>
        <Animatable.Image
          animation="flipInY"
          style={styles.logo}
          source={require('../../../../assets/estacao.png')}
        />
      </View>

      <Animatable.View delay={800} animation="fadeInUp" style={styles.containerForm}>
        <Text style={styles.title}>
          Um Projeto da Segunda Igreja Batista de Pendotiba para transformar vidas!
        </Text>
        <Text style={styles.text}>Faça o login para começar</Text>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.buttonText}>Acessar</Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0b1f34',
  },
  containerForm: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: '6%',
    paddingEnd: '6%',
  },
  containerLogo: {
    flex: 2,

    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 350,
    height: 120,
  },
  title: {
    fontSize: 21,
    fontWeight: 'bold',
    marginTop: 28,
    marginBottom: 12,
    paddingLeft: 10,
    paddingRight: 10,
  },
  text: {
    color: '#a1a1a1',
    paddingLeft: 10,
  },

  button: {
    position: 'absolute',
    backgroundColor: '#38a69d',
    borderRadius: 50,
    paddingVertical: 8,
    width: '68%',
    alignSelf: 'center',
    bottom: '15%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});
