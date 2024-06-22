import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { RouteProp, useNavigation, NavigationProp, useRoute } from '@react-navigation/native';
import axios from 'axios';
import { RootStackParamList } from 'navigation/navigationTypes';
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Modal,
  Platform,
  Button,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { BASE_URL } from '~/contexts/system';
import { alunosDTO, projetos } from '~/models/alunos';
import * as alunosService from '~/service/alunosService';

type EditarAlunosRouteProp = RouteProp<RootStackParamList, 'DetalheCurso'>;

const EditarAlunos = () => {
  const route = useRoute<EditarAlunosRouteProp>();
  const { id } = route.params;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
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
            setAlunoEdit({
              ...response.data,
              dataNascimento: new Date(response.data.dataNascimento),
            });
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

  const onChangeDate = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || alunoEdit.dataNascimento;
    setShowDatePicker(Platform.OS === 'ios');
    setAlunoEdit({ ...alunoEdit, dataNascimento: currentDate });
  };

  if (!alunoEdit) {
    return <Text>Carregando detalhes do aluno...</Text>;
  }

  const formatDate = (date: Date) => {
    if (date instanceof Date && !isNaN(date.getTime())) {
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    }
    return '';
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.containerVoltar} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back-circle" size={30} color="white" />
        <Text style={styles.voltar}>Voltar</Text>
      </TouchableOpacity>
      <Text style={styles.label}>Nome</Text>
      <TextInput
        style={styles.input}
        value={alunoEdit.nome}
        onChangeText={(text) => setAlunoEdit({ ...alunoEdit, nome: text })}
      />
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={alunoEdit.email}
        onChangeText={(text) => setAlunoEdit({ ...alunoEdit, email: text })}
      />

      <Text style={styles.label}>Data de Nascimento</Text>
      <View style={styles.dateContainer}>
        <TextInput
          style={styles.input}
          value={formatDate(alunoEdit.dataNascimento)}
          editable={false}
        />
        <Button title="Inserir Data" onPress={() => setShowDatePicker(true)} />
      </View>
      {showDatePicker && (
        <DateTimePicker
          value={alunoEdit.dataNascimento}
          mode="date"
          display="default"
          onChange={onChangeDate}
        />
      )}

      <Text style={styles.label}>Telefone</Text>
      <TextInput
        style={styles.input}
        value={alunoEdit.telefone}
        onChangeText={(text) => setAlunoEdit({ ...alunoEdit, telefone: text })}
      />

      <Text style={styles.label}>O Aluno possui alguma doença?</Text>
      <View style={styles.containerProjeto}>
        <Picker
          selectedValue={alunoEdit.AlunoDoenca}
          style={styles.picker}
          onValueChange={(itemValue) => setAlunoEdit({ ...alunoEdit, AlunoDoenca: itemValue })}>
          <Picker.Item label="Nenhuma" value={0} />
          <Picker.Item label="Diabetes" value={1} />
          <Picker.Item label="Hipertensão" value={2} />
          <Picker.Item label="Outras" value={3} />
        </Picker>
      </View>
      <Text style={styles.label}>Se sim, qual?</Text>
      <TextInput
        style={styles.input}
        value={alunoEdit.pergunta}
        onChangeText={(text) => setAlunoEdit({ ...alunoEdit, pergunta: text })}
      />
      <Text style={styles.label}>Projeto</Text>
      <View style={styles.containerProjeto}>
        <Picker
          selectedValue={alunoEdit.projetos.id}
          style={styles.picker}
          onValueChange={(itemValue) =>
            setAlunoEdit({ ...alunoEdit, projetos: { ...alunoEdit.projetos, id: itemValue } })
          }>
          {listaDeGrupos.map((projeto) => (
            <Picker.Item key={projeto.id} label={projeto.nome} value={projeto.id} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Identidade</Text>
      <TextInput
        style={styles.input}
        value={alunoEdit.rg}
        onChangeText={(text) => setAlunoEdit({ ...alunoEdit, rg: text })}
      />
      <Text style={styles.label}>Rua</Text>
      <TextInput
        style={styles.input}
        value={alunoEdit.rua}
        onChangeText={(text) => setAlunoEdit({ ...alunoEdit, rua: text })}
      />
      <Text style={styles.label}>Bairro</Text>
      <TextInput
        style={styles.input}
        value={alunoEdit.bairro}
        onChangeText={(text) => setAlunoEdit({ ...alunoEdit, bairro: text })}
      />
      <Text style={styles.label}>Cidade</Text>
      <TextInput
        style={styles.input}
        value={alunoEdit.cidade}
        onChangeText={(text) => setAlunoEdit({ ...alunoEdit, cidade: text })}
      />
      <Text style={styles.label}>Número</Text>
      <TextInput
        style={styles.input}
        value={alunoEdit.numero}
        onChangeText={(text) => setAlunoEdit({ ...alunoEdit, numero: text })}
      />
      <Text style={styles.label}>Cep</Text>
      <TextInput
        style={styles.input}
        value={alunoEdit.cep}
        onChangeText={(text) => setAlunoEdit({ ...alunoEdit, cep: text })}
      />
      <Text style={styles.label}>Complemento</Text>
      <TextInput
        style={styles.input}
        value={alunoEdit.complemento}
        onChangeText={(text) => setAlunoEdit({ ...alunoEdit, complemento: text })}
      />

      <TouchableOpacity style={styles.button} onPress={handleUpdateClick}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent
        visible={isModalVisible}
        onRequestClose={handleModalClose}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Aluno atualizado com sucesso!</Text>
            <TouchableOpacity style={styles.modalButton} onPress={handleModalClose}>
              <Text style={styles.modalButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#0b1f34',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: 'white',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  containerProjeto: {
    marginBottom: 15,
    borderColor: 'gray',
    borderWidth: 1,
  },
  datePickerButton: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  picker: {
    height: 30,
    width: '100%',
    marginBottom: 25,
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: '#ed7947',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
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
});

export default EditarAlunos;
