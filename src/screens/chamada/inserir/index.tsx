import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation, useRoute, RouteProp, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from 'navigation/navigationTypes';
import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet, Switch, TouchableOpacity, Alert } from 'react-native';
import { Button } from 'react-native-paper';

import * as cursosService from '../../../service/cursosService';
import * as presencaService from '../../../service/presencaService';

import { cursosDTO } from '~/models/cursos';
import { PresencaDTO, Alunos } from '~/models/presenca';

type DetalheCursoRouteProp = RouteProp<RootStackParamList, 'Presença'>;

const Presença = () => {
  const route = useRoute<DetalheCursoRouteProp>();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const { id } = route.params;
  const [curso, setCurso] = useState<cursosDTO>();
  const [loading, setLoading] = useState(true);
  const [listaDeAlunos, setListaDeAlunos] = useState<Alunos[]>([]);
  const [presencas, setPresencas] = useState<PresencaDTO[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const loadCurso = (id: number) => {
    cursosService
      .findById(id)
      .then((response) => {
        console.log('Detalhes do curso:', response.data);
        setCurso(response.data);
        setListaDeAlunos(response.data.alunos);
        // Prepara as presenças baseado nos alunos do curso
        const initialPresencas = response.data.alunos.map((aluno: any) => ({
          id: 0,
          data: selectedDate,
          chamadaAluno: -1,
          alunos: { ...aluno },
          projetosChamada: { id: response.data.id, nome: response.data.nome },
        }));
        setPresencas(initialPresencas);
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
      const updatedPresencas = prevPresencas.map((presenca) => {
        if (presenca.alunos.id === alunoId) {
          if (tipoPresenca === 'presente') {
            return { ...presenca, chamadaAluno: isChecked ? 0 : -1 };
          } else if (tipoPresenca === 'ausente') {
            return { ...presenca, chamadaAluno: isChecked ? 1 : -1 };
          }
        }
        return presenca;
      });
      return updatedPresencas;
    });
  };

  const enviarListaDePresenca = () => {
    Promise.all(
      presencas.map((presenca) => {
        if (presenca.chamadaAluno !== -1) {
          return presencaService
            .insert(presenca)
            .then((response) => {
              console.log('Presença enviada com sucesso:', response.data);
            })
            .catch((error) => {
              console.error('Erro ao enviar presença:', error);
              throw error; // Propaga o erro para garantir que todos os envios são tratados
            });
        }
        return Promise.resolve(); // Retorna uma promessa resolvida para evitar erros de mapa vazio
      })
    ).then(() => {
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
        loadCurso(id); // Recarrega os dados após o envio
      }, 3000); // Esconde a mensagem após 3 segundos
  
      // Exibe o alerta de sucesso
      Alert.alert('Sucesso!', 'Presença enviada com sucesso.');
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
      setSelectedDate(date);
      // Atualiza as presenças com a nova data selecionada
      setPresencas((prevPresencas) =>
        prevPresencas.map((presenca) => ({ ...presenca, data: date }))
      );
    }
  };

  if (loading) {
    return <Text>Carregando...</Text>;
  }

  const formatDate = (date: Date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

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
            value={selectedDate}
            mode="date"
            display="default"
            onChange={handleConfirm}
          />
        )}
        <Text style={styles.labelDate}>{formatDate(selectedDate)}</Text>
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
      {showSuccessMessage && (
        <View style={styles.successMessage}>
          <Text style={styles.successMessageText}>Presença enviada com sucesso!</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#0b1f34',
    paddingBottom:50
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
  successMessage: {
    backgroundColor: '#4BB543',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  successMessageText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Presença;
