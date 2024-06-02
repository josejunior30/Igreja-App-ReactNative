import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, ImageBackground } from 'react-native';
import { Button, Card } from 'react-native-paper';

const Cursos = () => {
  return (
    <ScrollView style={styles.containerTela}>
      <Card style={styles.container} >
        <ImageBackground source={require('../../../assets/bateria.jpg')}  style={styles.imagemFundo}/>
        <View style={styles.containerImagem}>
          <Image
            style={styles.imagem}
            source={{ uri: 'https://i.postimg.cc/zGdVdHpN/gilson.png' }}
          />
          <Text style={styles.curso}>
            Bateria e Percussão{'\n'}
            <Text style={styles.professor}>Professor: Alan Santos</Text>
          </Text>
        </View>
        <View>
          <Button style={styles.button}>
            <Text style={styles.buttonText}>Entrar</Text>
          </Button>
        </View>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  containerTela: {
    backgroundColor: '#D3D3D3',
  },

  container: {
    marginVertical: 20,
    marginHorizontal: 30,
  },
  containerImagem: {
    marginVertical: 20,
    marginHorizontal: 30,
    flexDirection: 'row',
  },
  imagem: {
    width: 110,
    height: 110,
    borderRadius: 60,
    zIndex: 1


  },
  imagemFundo: {
    width: 350,
    height: 200,
    resizeMode: 'cover', // para cobrir toda a área do Card com a imagem
    justifyContent: 'center', // centraliza os elementos no Card
    alignItems: 'center', // centraliza os elementos no Card
   
  },
  curso: {
    fontWeight: 'bold',
    marginLeft: 20,
    marginTop: 20,
    fontSize: 14,
    color: '#0b1f34',
  },
  button: {
    backgroundColor: '#0b1f34',
    width:200,
   marginLeft:100,
 marginBottom:10

  },

  buttonText: {
    color: 'white',
  },

  professor: {
    justifyContent: 'flex-end',
  },
});

export default Cursos;
