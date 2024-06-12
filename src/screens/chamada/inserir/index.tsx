import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation, useRoute, RouteProp, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from 'navigation/navigationTypes';
import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';

import * as cursosService from '../../../service/cursosService';
import * as presencaService from '../../../service/presencaService';

import { cursosDTO } from '~/models/cursos';
import { PresencaDTO, Alunos } from '~/models/presenca';

type DetalheCursoRouteProp = RouteProp<RootStackParamList, 'Presença'>;

const Presença = () => {
  const route = useRoute<DetalheCursoRouteProp>();
  const { id } = route.params;
  const [curso, setCurso] = useState<cursosDTO>();
  const [loading, setLoading] = useState(true);
  const [listaDeAlunos, setListaDeAlunos] = useState<Alunos[]>([]);
  const [presencas, setPresencas] = useState<PresencaDTO[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const loadCurso = (id: number) => {
    cursosService
      .findById(id)
      .then((response) => {
        console.log('Detalhes do curso:', response.data);
        setCurso(response.data);
        setListaDeAlunos(response.data.alunos);
      })
      .catch((error) => {
        console.error('Erro ao buscar detalhes do curso:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (id) {
      loadCurso(id);
    }
  }, [id]);

  const handleSwitchChange = (
    alunoId: number,
    tipoPresenca: 'presente' | 'ausente',
    isChecked: boolean
  ) => {
    setPresencas((prevPresencas) => {
      const updatedPresencas = [...prevPresencas];
      let index = updatedPresencas.findIndex((p) => p.alunos.id === alunoId);

      if (index === -1) {
        updatedPresencas.push({
          id: 0,
          data: new Date(selectedDate),
          chamadaAluno: 0,
          alunos: {
            id: alunoId,
            nome: '',
          },
          projetosChamada: {
            id: curso?.id ?? 0,
            nome: '',
          },
        });
        index = updatedPresencas.length - 1;
      }

      if (tipoPresenca === 'presente') {
        updatedPresencas[index].chamadaAluno = isChecked ? 0 : -1;
      } else if (tipoPresenca === 'ausente') {
        updatedPresencas[index].chamadaAluno = isChecked ? 1 : -1;
      }

      return updatedPresencas;
    });
  };

  const enviarListaDePresenca = () => {
    presencas.forEach((presenca) => {
      presencaService
        .insert(presenca)
        .then((response) => {
          console.log('Presença enviada com sucesso:', response.data);
        })
        .catch((error) => {
          console.error('Erro ao enviar presença:', error);
        });
    });
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (event: any, date: Date | undefined) => {
    setDatePickerVisibility(false);
    if (date) {
      setSelectedDate(date.toISOString().split('T')[0]);
    }
  };

  if (loading) {
    return <Text>Carregando...</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.containerVoltar} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back-circle" size={30} color="white" />
        <Text style={styles.voltar}>Voltar</Text>
      </TouchableOpacity>
      <View>
        <Button style={styles.btnData} onPress={showDatePicker}>
          <Text style={styles.btnDataText}>Escolha a data</Text>
        </Button>
        {isDatePickerVisible && (
          <DateTimePicker
            value={new Date(selectedDate)}
            mode="date"
            display="default"
            onChange={handleConfirm}
          />
        )}
        <Text style={styles.labelDate}>{selectedDate.toString().split('T')[0]}</Text>
      </View>
      {curso && (
        <View style={styles.table}>
          <View style={styles.header}>
            <Text style={[styles.cell, styles.headerText]}>Nome</Text>
            <Text style={[styles.cellBox, styles.headerText]}>Presente</Text>
            <Text style={[styles.cellBox, styles.headerText]}>Ausente</Text>
          </View>
          {listaDeAlunos.map((aluno) => (
            <View key={aluno.id} style={styles.row}>
              <Text style={styles.nome}>{aluno.nome}</Text>
              <Switch
                style={styles.box}
                value={presencas.some((p) => p.alunos.id === aluno.id && p.chamadaAluno === 0)}
                onValueChange={(isChecked: boolean) =>
                  handleSwitchChange(aluno.id, 'presente', isChecked)
                }
              />
              <Switch
                style={styles.box}
                value={presencas.some((p) => p.alunos.id === aluno.id && p.chamadaAluno === 1)}
                onValueChange={(isChecked: boolean) =>
                  handleSwitchChange(aluno.id, 'ausente', isChecked)
                }
              />
            </View>
          ))}
        </View>
      )}
      <Button style={styles.btnEnviar} onPress={enviarListaDePresenca}>
        <Text style={styles.btnEnviarText}>Enviar</Text>
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#0b1f34',
  },
  table: {
    marginTop: 16,
    padding: 3,
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    paddingBottom: 8,
    backgroundColor: '#00D4FF',
    borderBottomColor: '#ccc',
  },
  voltar: {
    fontSize: 16,
    marginLeft: 10,
    fontWeight: 'bold',
    color: 'white',
  },
  containerVoltar: {
    marginLeft: 20,
    flexDirection: 'row',
    marginBottom: 10,
    marginTop: 40,
  },
  btnData: {
    backgroundColor: '#ed7947',
    marginHorizontal: 90,
    marginTop: 30,
    paddingVertical: 10,
    borderRadius: 20,
  },
  btnDataText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  btnEnviar : {
    backgroundColor: '#00D4FF',
    marginHorizontal: 90,
    marginTop: 30,
    paddingVertical: 10,
    borderRadius: 20,
    marginBottom:30
  },
  btnEnviarText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  labelDate: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: 30,
    marginBottom: 10,
    fontWeight: 'bold',
    color: 'white',
    borderWidth: 1,
    borderColor: '#00D4FF',
    marginHorizontal: 90,
    borderRadius: 20,
    paddingVertical: 10,
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 8,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#4c5d67',
  },
  cell: {
    padding: 8,
    paddingHorizontal: 8,
    width: 210,
  },
  cellBox: {
    flex: 1,
    paddingHorizontal: 9,
    alignItems: 'center',
    fontSize: 12,
    padding: 8,
  },
  headerText: {
    fontWeight: 'bold',
  },
  nome: {
    flex: 3,
    paddingHorizontal: 8,
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
  box: {
    width: 90,
  },
});

export default Presença;
