import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from 'navigation/navigationTypes';
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Platform, StyleSheet, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Button } from 'react-native-paper';
import Picker from 'react-native-picker-select';

import { RelatorioDTO, projetosRelatorio } from '~/models/relatorio';
import { findAll, findDataAndProjeto } from '~/service/relatorioService';

const Relatorio = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [projeto, setProjeto] = useState<number | null>(null);
  const [relatorio, setRelatorio] = useState<RelatorioDTO[]>([]);
  const [relatorioBuscado, setRelatorioBuscado] = useState<boolean>(false);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [projetoDTO, setProjetoDTO] = useState<projetosRelatorio | null>(null);

  useEffect(() => {
    fetchRelatorio();
  }, []);

  const fetchRelatorio = () => {
    findAll()
      .then((response) => {
        console.log('Relatórios recebidos:', response.data);
        setRelatorio(response.data);
      })
      .catch((error) => {
        console.error('Erro ao buscar relatórios:', error);
      });
  };

  const handleProjetoChange = (projetoId: number | null) => {
    if (projetoId !== null) {
      setProjeto(projetoId);
    } else {
      setProjeto(null);
    }
  };

  const buscarRelatorio = () => {
    if (!selectedDate) {
      console.error('Data não especificada.');
      return;
    }

    if (projeto === null) {
      console.error('Projeto não especificado.');
      return;
    }

    findDataAndProjeto(selectedDate, projeto) // Supondo que o ID seja um número
      .then((response) => {
        console.log('Relatórios recebidos:', response.data);
        setRelatorio(response.data);
        setRelatorioBuscado(true);
      })
      .catch((error) => {
        console.error('Erro ao buscar relatórios por data e projeto:', error);
      });
  };

  const handleLimparData = () => {
    setSelectedDate(new Date());
    setProjeto(null);
    setRelatorio([]);
    setRelatorioBuscado(false);
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (event: any, date?: Date) => {
    const currentDate = date || selectedDate;
    setDatePickerVisibility(Platform.OS === 'ios');
    setSelectedDate(currentDate);
  };
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
      <Text style={styles.labelCurso}>Escolha o Curso:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          onValueChange={(itemValue) => handleProjetoChange(itemValue)}
          items={[
            { label: 'Artesanato', value: 1 },
            { label: 'Jiu-Jitsu', value: 2 },
            { label: 'Teclado', value: 3 },
            { label: 'Canto', value: 4 },
            { label: 'Bateria', value: 5 },
          ]}
          style={{
            inputIOS: {
          
            },
            inputAndroid: {
          
            },
            iconContainer: {
              top: 15,
              right: 15,
            },
          }}
        />
      </View>
      <Button style={styles.btnData} onPress={buscarRelatorio}>
        <Text style={styles.btnDataText}>Buscar Relatório</Text>
      </Button>

      {!relatorioBuscado && (
        <View style={styles.labelList}>
          <Text style={styles.titulo}>Nenhum relatório encontrado</Text>
        </View>
      )}

      {relatorioBuscado && relatorio.length === 0 && (
        <View style={styles.labelList}>
          <Text style={styles.titulo}>Nenhum relatório encontrado</Text>
        </View>
      )}

      {relatorioBuscado && relatorio.length > 0 && (
        <View style={styles.labelList}>
          <Text style={styles.titulo}>Relatórios:</Text>
          {relatorio.map((item) => (
            <View style={styles.lista} key={item.id}>
              <TouchableOpacity
                onPress={() => navigation.navigate('DetalhesRelatorio', { id: item.id })}>
                <Text style={styles.professor}>
                  Professor: {item.projetosRelatorio.lider} - {item.projetosRelatorio.nome}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b1f34',
  },
  dataEscolhida: {
    marginTop: 20,
    marginBottom: 40,
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#ed7947',
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
  labelDate: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: 30,
    marginBottom: 10,
    fontWeight: 'bold',
    color: 'white',
    marginHorizontal: 90,
    borderRadius: 20,
    paddingVertical: 10,
    backgroundColor: '#00D4FF',
  },
  labelCurso: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
  },
  btnDataText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  btnData: {
    backgroundColor: '#ed7947',
    marginHorizontal: 90,
    marginTop: 30,
    paddingVertical: 10,
    borderRadius: 20,
  },
  labelList: {
    marginBottom: 20,
  },
  pickerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 3,
    paddingVertical: 3,
    marginHorizontal: 50,
    marginBottom: 40,
  },
  titulo: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
    marginTop: 30,
  },
  lista: {
    flexDirection: 'row',
    textAlign: 'center',
  },
  professor: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginLeft: 30,
    color: 'white',
    fontSize: 17,
  },
  curso: {
    textAlign: 'center',
    marginLeft: 40,
    color: 'white',
  },
});

export default Relatorio;
