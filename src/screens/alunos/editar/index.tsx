import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Modal } from 'react-native';
import { RouteProp, useNavigation, NavigationProp, useRoute } from '@react-navigation/native';
import axios from 'axios';

import { RootStackParamList } from 'navigation/navigationTypes';
import { alunosDTO, projetos } from '~/models/alunos';
import * as alunosService from '~/service/alunosService';
import { BASE_URL } from '~/contexts/system';

type EditarAlunosRouteProp = RouteProp<RootStackParamList, 'DetalheCurso'>;

const EditarAlunos = () => {
  const route = useRoute<EditarAlunosRouteProp>();
  const { id } = route.params;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [listaDeGrupos, setListaDeGrupos] = useState<projetos[]>([]);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [alunoEdit, setAlunoEdit] = useState<alunosDTO>({
    id: 0,
    nome: '',
    dataNascimento: new Date(), 
    telefone: '',
    rg: '',
    cpfResponsavel: '',
    email: '',
    responsavel: '',
    sangue: '',
    pergunta: '',
    AlunoDoenca: 0,
    rua: '',
    bairro: '',
    cep: '',
    numero: '',
    cidade: '',
    complemento: '',
    projetos: {
      id: 0,
      nome: '',
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Carregar os detalhes do aluno ao montar o componente
        if (id) {
          const response = await alunosService.findById(Number(id));
          if (response.data) {
            setAlunoEdit(response.data); // Inicialize com os dados do ID escolhido
          }
        }
      } catch (error) {
        console.error('Erro ao carregar detalhes do aluno:', error);
      }
    };

    fetchData();

    const fetchGrupos = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/projetos`);
        setListaDeGrupos(response.data);
      } catch (error) {
        console.error('Erro ao obter a lista de grupos:', error);
      }
    };

    fetchGrupos();
  }, [id]);

  const handleUpdateClick = async () => {
    try {
      if (id && alunoEdit) {
        await alunosService.updateAluno(Number(id), alunoEdit);
        console.log('Aluno atualizado com sucesso!');
        setIsModalVisible(true);
      }
    } catch (error) {
      console.error('Erro ao atualizar aluno:', error);
      Alert.alert('Erro', 'Houve um erro ao atualizar o aluno.');
    }
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    navigation.goBack();
  };

  if (!alunoEdit) {
    return <Text>Carregando detalhes do aluno...</Text>;
  }
  const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome</Text>
      <TextInput
        style={styles.input}
        value={alunoEdit.nome}
        onChangeText={(text) => setAlunoEdit({ ...alunoEdit, nome: text })}
      />

      <Text style={styles.label}>Data de Nascimento</Text>
      <TextInput
        style={styles.input}
        value={formatDate(alunoEdit.dataNascimento)}
        onChangeText={(text) => setAlunoEdit({ ...alunoEdit, dataNascimento: text })}
   
      />

      <Text style={styles.label}>Telefone</Text>
      <TextInput
        style={styles.input}
        value={alunoEdit.telefone}
        onChangeText={(text) => setAlunoEdit({ ...alunoEdit, telefone: text })}
      />

    

      <TouchableOpacity style={styles.button} onPress={handleUpdateClick}>
        <Text style={styles.buttonText}>Atualizar Aluno</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent
        visible={isModalVisible}
        onRequestClose={handleModalClose}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Aluno atualizado com sucesso!</Text>
            <TouchableOpacity style={styles.modalButton} onPress={handleModalClose}>
              <Text style={styles.modalButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#0b869b',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
    elevation: 5,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
  modalButton: {
    backgroundColor: '#0b869b',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default EditarAlunos;


