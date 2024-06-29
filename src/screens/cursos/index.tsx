import { Ionicons } from '@expo/vector-icons';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from 'navigation/navigationTypes';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ImageBackground,
  Vibration,
  TouchableOpacity,
} from 'react-native';
import { Button, Card } from 'react-native-paper';

import * as cursosService from '../../service/cursosService';

import { cursosDTO } from '~/models/cursos';

const Cursos = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [cursosDTO, setCursosDTO] = useState<cursosDTO[]>([]);
  const fotoCoordenador = 'https://i.postimg.cc/zGdVdHpN/gilson.png';
  useEffect(() => {
    cursosService
      .findAll()
      .then((response) => {
        console.log('Dados recebidos:', response.data);
        setCursosDTO(response.data);
      })
      .catch((error) => {
        console.error('Erro ao buscar dados:', error);
      });
  }, []);

  return (
    <ScrollView style={styles.containerTela}>
      <TouchableOpacity style={styles.containerVoltar} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back-circle" size={30} color="white" />
        <Text style={styles.voltar}>Voltar</Text>
      </TouchableOpacity>
      {cursosDTO.map((curso, index) => (
        <Card key={index} style={styles.container}>
          <ImageBackground source={{ uri: curso.foto_fundo }} style={styles.imagemFundo} />
          <View style={styles.containerImagem}>
            <Image style={styles.imagem} source={{ uri: curso.foto_lider }} />
            <View style={styles.textContainer}>
              <Text style={styles.curso}>
                {curso.nome}
                {'\n'}
                <Text style={styles.professor}>{curso.lider}</Text>
              </Text>
            </View>
          </View>
          <View>
            <Button
              mode="contained"
              style={styles.button}
              onPress={() => navigation.navigate('DetalheCurso', { id: curso.id })}>
              <Text style={styles.buttonText}>Entrar</Text>
            </Button>
          </View>
        </Card>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  containerTela: {
    backgroundColor: '#0b1f34',
  },

  container: {
    marginVertical: 20,
    marginHorizontal: 30,
    overflow: 'hidden',
    zIndex: 1,
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
    zIndex: 1,
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: '#0b1f34',
  },
  imagemFundo: {
    width: '100%',
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  curso: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'white',
    backgroundColor: '#0b1f34',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    marginHorizontal: '10%',
    justifyContent: 'center',
    alignSelf: 'center',
    textAlign: 'center',
  },
  textContainer: {
    marginLeft: 12,
  },
  button: {
    backgroundColor: '#ed7947',
    width: 100,

    position: 'absolute',
    bottom: 10,
    right: 45,
  },

  buttonText: {
    color: 'white',
  },

  professor: {
    fontSize: 12,
    justifyContent: 'center',
    alignSelf: 'center',
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
    marginBottom: 10,
    marginTop: 30,
  },
});

export default Cursos;
