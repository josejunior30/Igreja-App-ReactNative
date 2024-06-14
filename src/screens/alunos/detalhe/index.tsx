import { Ionicons } from '@expo/vector-icons';
import { useNavigation, NavigationProp, RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from 'navigation/navigationTypes';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  Image,
} from 'react-native';

import { alunoDTO } from '~/models/alunos';
import * as alunosService from '~/service/alunosService';

type DetalheCAlunoRouteProp = RouteProp<RootStackParamList, 'DetalheCurso'>;

const DetalhesAlunos = () => {
  const route = useRoute<DetalheCAlunoRouteProp>();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { id } = route.params;
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [alunosDTO, setAlunosDTO] = useState<alunoDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const loadAlunosDTO = (id: number) => {
    alunosService
      .findById(id) // Converte id para número
      .then((response) => {
        console.log('Detalhes do Aluno:', response.data);
        setAlunosDTO(response.data);
      })
      .catch((error) => {
        console.error('Erro ao buscar detalhes do aluno:', error);
        // Trate o estado de erro (por exemplo, exiba uma mensagem de erro)
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (id) {
      loadAlunosDTO(id);
    }
  }, [id]);

  const handleDeleteClick = () => {
    setShowDeleteConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    if (id !== undefined) {
      await alunosService.deleteAluno(Number(id));
      setIsModalVisible(true);
      setShowDeleteConfirmation(false);
      navigation.goBack();
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!alunosDTO) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Erro ao carregar os detalhes do aluno.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.containerVoltar} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back-circle" size={30} color="white" />
        <Text style={styles.voltar}>Voltar</Text>
      </TouchableOpacity>
      <View style={styles.detailsContainer}>
        {alunosDTO.url && <Image source={{ uri: alunosDTO.url }} style={styles.image} />}
        <Text style={styles.label}>
          Nome: <Text style={styles.value}>{alunosDTO.nome}</Text>
        </Text>
        <Text style={styles.label}>
          Email: <Text style={styles.value}>{alunosDTO.email}</Text>
        </Text>

        <Text style={styles.label}>
          Telefone: <Text style={styles.value}>{alunosDTO.telefone}</Text>
        </Text>

        <Text style={styles.label}>
          Identidade: <Text style={styles.value}>{alunosDTO.rg}</Text>
        </Text>

        <Text style={styles.label}>
          Data de Nascimento:{' '}
          <Text style={styles.value}>
            {new Date(alunosDTO.dataNascimento).toLocaleDateString('pt-BR')}
          </Text>
        </Text>
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteClick}>
          <Text style={styles.deleteButtonText}>Deletar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.editarButton} onPress={handleDeleteClick}>
          <Text style={styles.deleteButtonText}>Editar</Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent
        visible={showDeleteConfirmation}
        onRequestClose={() => setShowDeleteConfirmation(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Tem certeza que deseja deletar este aluno?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalButton} onPress={handleConfirmDelete}>
                <Text style={styles.modalButtonText}>Confirmar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={handleCancelDelete}>
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#0b1f34',
  },
  containerVoltar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  voltar: {
    fontSize: 16,
    marginLeft: 10,
    fontWeight: 'bold',
    color: 'white',
  },
  detailsContainer: {
    marginVertical: 20,
  marginHorizontal:35,

    padding: 20,
    backgroundColor: 'white',
    borderRadius: 8,
    textAlign: 'center',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 8,
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 30,
  },
  btnContainer:{
    flexDirection:'row',
    justifyContent:'center',
    alignSelf:'center'
  },
  editarButton:{
    backgroundColor:'#00D4FF',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginRight:10,
    marginLeft:30,
    fontSize:18,
    width:80

  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
  },

  value: {
    fontSize: 16,
    marginBottom: 15,
    fontWeight: 'normal',
  },
  deleteButton: {
    backgroundColor: '#ed7947',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    fontSize:18,
    width:80

  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 8,
    alignItems: 'center',
  },
  modalText: {
    marginBottom: 20,
    fontSize: 16,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    backgroundColor: '#ed7947',
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 10,
  },
  modalButtonText: {
    color: 'white',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
  },
});

export default DetalhesAlunos;
