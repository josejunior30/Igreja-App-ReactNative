import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { RootStackParamList } from 'navigation/navigationTypes';
import React, { useEffect, useState } from 'react';
import { ScrollView, TextInput, View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';

import { BASE_URL } from '~/contexts/system';
import { alunosDTO } from '~/models/alunos';
import { cursosDTO } from '~/models/cursos';
import { insertAluno } from '~/service/alunosService';

const AddAlunos = () => {
  const [projetos, setProjetos] = useState<cursosDTO[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [aluno, setAluno] = useState<alunosDTO>({
    id: 0,
    nome: '',
    dataNascimento: new Date(),
    telefone: '',

    rg: '',
    cpfResponsavel: '',
    responsavel: '',
    email: '',
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
    const fetchGrupos = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/projetos`);
        setProjetos(response.data);
      } catch (error) {
        console.error('Erro ao obter a lista de grupos:', error);
      }
    };

    fetchGrupos();
  }, []);

  const handleChange = (name: string, value: string | number) => {
    if (name === 'projetos') {
      const projetoId = parseInt(value as string, 10);
      setAluno((prevAluno) => ({
        ...prevAluno,
        projetos: {
          ...prevAluno.projetos,
          id: projetoId,
        },
      }));
    } else if (name === 'dataNascimento') {
      const [day, month, year] = (value as string).split('-').map(Number);
      const dataNascimento = new Date(year, month - 1, day);
      if (!isNaN(dataNascimento.getTime())) {
        setAluno((prevAluno) => ({
          ...prevAluno,
          [name]: dataNascimento,
        }));
      } else {
        console.error('Data inválida:', value);
      }
    } else {
      setAluno((prevAluno) => ({
        ...prevAluno,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async () => {
    try {
      console.log('Membro Detail antes do POST:', aluno);
      await insertAluno(aluno);
      setIsModalVisible(true);
      Alert.alert('Sucesso', 'Aluno adicionado com sucesso!');
      setAluno({
        id: 0,
        nome: '',
        dataNascimento: new Date(),
        telefone: '',
        rg: '',
        cpfResponsavel: '',
        responsavel: '',
        email: '',
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
    } catch (error) {
      console.error('Erro ao adicionar aluno:', error);
      Alert.alert('Erro', 'Houve um erro ao adicionar o aluno.');
    }
  };

  const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nome</Text>
        <TextInput
          style={styles.input}
          value={aluno.nome}
          placeholder="Digite o nome"
          onChangeText={(text) => handleChange('nome', text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Data de Nascimento</Text>
        <TextInput
          style={styles.input}
          value={formatDate(aluno.dataNascimento)}
          placeholder="Digite a data de nascimento (dd-mm-yyyy)"
          onChangeText={(text) => handleChange('dataNascimento', text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Telefone</Text>
        <TextInput
          style={styles.input}
          value={aluno.telefone}
          placeholder="Digite o telefone"
          onChangeText={(text) => handleChange('telefone', text)}
        />
      </View>
    
      <View style={styles.inputContainer}>
        <Text style={styles.label}>RG</Text>
        <TextInput
          style={styles.input}
          value={aluno.rg}
          placeholder="Digite o RG"
          onChangeText={(text) => handleChange('rg', text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>CPF do Responsável</Text>
        <TextInput
          style={styles.input}
          value={aluno.cpfResponsavel}
          placeholder="Digite o CPF do responsável"
          onChangeText={(text) => handleChange('cpfResponsavel', text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Responsável</Text>
        <TextInput
          style={styles.input}
          value={aluno.responsavel}
          placeholder="Digite o nome do responsável"
          onChangeText={(text) => handleChange('responsavel', text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={aluno.email}
          placeholder="Digite o email"
          onChangeText={(text) => handleChange('email', text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>O aluno possui alguma doença ?</Text>
        <Picker
          selectedValue={aluno.AlunoDoenca}
          style={styles.input}
          onValueChange={(itemValue) => handleChange('AlunoDoenca', itemValue)}>
          <Picker.Item label="Não" value={0} />
          <Picker.Item label="Sim" value={1} />
        </Picker>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Se sim, qual ?

        </Text>
        <TextInput
          style={styles.input}
          value={aluno.pergunta}
          placeholder="responda a pergunta"
          onChangeText={(text) => handleChange('pergunta', text)}
        />
      </View>

      <Picker
        selectedValue={aluno.projetos.id}
        style={styles.input}
        onValueChange={(itemValue) => handleChange('projetos', itemValue as unknown as string)}>
        {projetos.map((projeto) => (
          <Picker.Item key={projeto.id} label={projeto.nome} value={projeto.id} />
        ))}
      </Picker>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Rua</Text>
        <TextInput
          style={styles.input}
          value={aluno.rua}
          placeholder="Digite a rua"
          onChangeText={(text) => handleChange('rua', text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Bairro</Text>
        <TextInput
          style={styles.input}
          value={aluno.bairro}
          placeholder="Digite o bairro"
          onChangeText={(text) => handleChange('bairro', text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>CEP</Text>
        <TextInput
          style={styles.input}
          value={aluno.cep}
          placeholder="Digite o CEP"
          onChangeText={(text) => handleChange('cep', text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Número</Text>
        <TextInput
          style={styles.input}
          value={aluno.numero}
          placeholder="Digite o número"
          onChangeText={(text) => handleChange('numero', text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Cidade</Text>
        <TextInput
          style={styles.input}
          value={aluno.cidade}
          placeholder="Digite a cidade"
          onChangeText={(text) => handleChange('cidade', text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Complemento</Text>
        <TextInput
          style={styles.input}
          value={aluno.complemento}
          placeholder="Digite o complemento"
          onChangeText={(text) => handleChange('complemento', text)}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button onPress={handleSubmit}>
          <Text>Adicionar</Text>
        </Button>
      </View>
      <TouchableOpacity style={styles.containerVoltar} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back-circle" size={30} color="white" />
        <Text style={styles.voltar}>Voltar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 40,
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

export default AddAlunos;
