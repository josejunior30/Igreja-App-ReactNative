import { Picker } from '@react-native-picker/picker';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from 'react-native';

import { BASE_URL } from '~/contexts/system';
import { RelatorioDTO, projetosRelatorio } from '~/models/relatorio';
import * as relatorioService from '~/service/relatorioService';

const AddRelatorio = () => {
  const [projetos, setProjetos] = useState<projetosRelatorio[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const navigation = useNavigation<NavigationProp<any>>();

  const [relatorioDTO, setRelatorioDTO] = useState<RelatorioDTO>({
    id: 0,
    data: new Date(),
    'A aula ocorreu normalmente?': '',
    'Algum(a) aluno(a) apresentou problemas de comportamento, aprendizagem, assistência social ou espiritual? Qual?':
      '',
    'Houve dificuldade com o material das aulas?': '',
    'Alguma sugestão para a equipe de trabalho?': '',
    'Mais alguma observação ou sugestão?': '',
    projetosRelatorio: {
      id: 0,
      nome: '',
      lider: '',
    },
  });

  useEffect(() => {
    const fetchGrupos = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/projetos`);
        setProjetos(response.data);
      } catch (error) {
        console.error('Erro ao buscar projetos:', error);
      }
    };

    fetchGrupos();
  }, []);

  const handleChange = (name: string, value: string | number | Date) => {
    if (name === 'projetosRelatorio') {
      setRelatorioDTO((prevDTO) => ({
        ...prevDTO,
        projetosRelatorio: {
          ...prevDTO.projetosRelatorio,
          id: value as number,
        },
      }));
    } else if (name === 'data') {
      const data = value instanceof Date ? value : new Date(value);
      setRelatorioDTO((prevDTO) => ({
        ...prevDTO,
        [name]: data,
      }));
    } else {
      setRelatorioDTO((prevDTO) => ({
        ...prevDTO,
        [name]: value,
      }));
    }
  };
  

  const handleSubmit = async () => {
    try {
      console.log('relatorio Detail antes do POST:', relatorioDTO);
      await relatorioService.insert(relatorioDTO);
      setIsModalVisible(true);
      setRelatorioDTO({
        id: 0,
        data: new Date(),
        'A aula ocorreu normalmente?': '',
        'Algum(a) aluno(a) apresentou problemas de comportamento, aprendizagem, assistência social ou espiritual? Qual?':
          '',
        'Houve dificuldade com o material das aulas?': '',
        'Alguma sugestão para a equipe de trabalho?': '',
        'Mais alguma observação ou sugestão?': '',
        projetosRelatorio: {
          id: 0,
          nome: '',
          lider: '',
        },
      });
      Alert.alert('Relatório adicionado com sucesso!');
      navigation.goBack(); // Navega de volta após adicionar o relatório
    } catch (error) {
      console.error('Erro ao adicionar relatorio:', error);
      Alert.alert('Erro ao adicionar relatório. Tente novamente.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Data:</Text>
      <TextInput
        style={styles.input}
        value={relatorioDTO.data.toISOString().split('T')[0]}
        onChangeText={(value) => handleChange('data', new Date(value))}
      />
      <Text style={styles.label}>A aula ocorreu normalmente?</Text>
      <TextInput
        style={styles.input}
        value={relatorioDTO['A aula ocorreu normalmente?']}
        onChangeText={(value) => handleChange('A aula ocorreu normalmente?', value)}
      />
      <Text style={styles.label}>Problemas apresentados por alunos:</Text>
      <TextInput
        style={styles.input}
        value={
          relatorioDTO[
            'Algum(a) aluno(a) apresentou problemas de comportamento, aprendizagem, assistência social ou espiritual? Qual?'
          ]
        }
        onChangeText={(value) =>
          handleChange(
            'Algum(a) aluno(a) apresentou problemas de comportamento, aprendizagem, assistência social ou espiritual? Qual?',
            value
          )
        }
      />
      <Text style={styles.label}>Dificuldade com o material das aulas?</Text>
      <TextInput
        style={styles.input}
        value={relatorioDTO['Houve dificuldade com o material das aulas?']}
        onChangeText={(value) => handleChange('Houve dificuldade com o material das aulas?', value)}
      />
      <Text style={styles.label}>Sugestões para a equipe:</Text>
      <TextInput
        style={styles.input}
        value={relatorioDTO['Alguma sugestão para a equipe de trabalho?']}
        onChangeText={(value) => handleChange('Alguma sugestão para a equipe de trabalho?', value)}
      />
      <Text style={styles.label}>Observações ou sugestões adicionais:</Text>
      <TextInput
        style={styles.input}
        value={relatorioDTO['Mais alguma observação ou sugestão?']}
        onChangeText={(value) => handleChange('Mais alguma observação ou sugestão?', value)}
      />
      <Text style={styles.label}>Projeto:</Text>
      <Picker
        selectedValue={relatorioDTO.projetosRelatorio.id}
        onValueChange={(value) => handleChange('projetosRelatorio', value)}
        style={styles.picker}>
        {projetos.map((projeto) => (
          <Picker.Item key={projeto.id} label={projeto.nome} value={projeto.id} />
        ))}
      </Picker>
      <Button title="Adicionar Relatório" onPress={handleSubmit} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 16,
  },
});

export default AddRelatorio;
