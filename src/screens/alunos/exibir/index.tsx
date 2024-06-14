import { Ionicons } from '@expo/vector-icons';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import navigation from 'navigation';
import { RootStackParamList } from 'navigation/navigationTypes';
import { useEffect, useState } from 'react';
import { ScrollView, View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';

import { alunoDTO } from '~/models/alunos';
import * as alunosService from '~/service/alunosService';

const Alunos = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [alunosDTO, setAlunosDTO] = useState<alunoDTO[]>([]);
  const [alunos, setAlunos] = useState<alunoDTO[]>([]);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  useEffect(() => {
    alunosService
      .findAll()
      .then((response) => {
        setAlunosDTO(response.data);
      })
      .catch((error) => {
        console.error('Erro ao buscar dados:', error);
        // Trate o estado de erro (por exemplo, exiba uma mensagem de erro)
      });
  }, []);
  const handleSearch = async () => {
    try {
      const response = await alunosService.findByNome(searchTerm);
      setAlunosDTO(response.data);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
      // Trate o estado de erro (por exemplo, exiba uma mensagem de erro)
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.containerVoltar} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back-circle" size={30} color="white" />
        <Text style={styles.voltar}>Voltar</Text>
      </TouchableOpacity>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Pesquisar por nome"
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
        <Button style={styles.btn} onPress={handleSearch}>
          <Text style={styles.btnText}>Pesquisar</Text>
        </Button>
      </View>
      <View style={styles.resultsContainer}>
        {alunosDTO.map((aluno, index) => (
          <View key={aluno.id} style={styles.alunoContainer}>
            <Text style={styles.alunoIndex}>{index + 1}.</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('DetalhesAlunos', { id: aluno.id })}>
              <Text style={styles.alunoNome}>{aluno.nome}</Text>
            </TouchableOpacity>

            <View style={styles.alunoEmailContainer}>
              <TouchableOpacity
                onPress={() => navigation.navigate('DetalheCurso', { id: aluno.id })}>
                <Text style={styles.alunoEmail}>{aluno.email}</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#0b1f34',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    marginRight: 8,
    backgroundColor: 'white',
  },
  resultsContainer: {
    marginTop: 16,
  },
  alunoContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  alunoIndex: {
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 8,
  },
  alunoNome: {
    fontSize: 12,
    fontWeight: 'bold',
    flex: 1,
  },
  alunoEmailContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  alunoEmail: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  btn: {
    backgroundColor: '#ed7947',
  },
  btnText: {
    color: 'white',
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
    marginTop: 20,
  },
});

export default Alunos;
