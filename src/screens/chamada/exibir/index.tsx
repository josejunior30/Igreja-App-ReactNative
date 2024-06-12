import { FontAwesome5, Ionicons } from '@expo/vector-icons'; // Importe o ícone FontAwesome5 ou o pacote de ícones que preferir
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import Picker from 'react-native-picker-select';

import { PresencaDTO } from '~/models/presenca';
import { findDataAndProjeto } from '~/service/presencaService';

function PresençaExibir({ initialDate = new Date(), initialCursoEscolhido = null }) {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [cursoEscolhido, setCursoEscolhido] = useState<number | null>(initialCursoEscolhido);
  const [presencas, setPresencas] = useState<PresencaDTO[]>([]);
  const navigation = useNavigation();
  useEffect(() => {
    fetchPresencas();
  }, [selectedDate, cursoEscolhido]);

  const fetchPresencas = () => {
    if (!selectedDate || cursoEscolhido === null) return;

    findDataAndProjeto(selectedDate, cursoEscolhido)
      .then((response) => {
        console.log('Presenças recebidas:', response.data);
        setPresencas(response.data);
      })
      .catch((error) => {
        console.error('Erro ao buscar presenças por data e curso:', error);
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
    }
  };

  return (
    <View style={styles.container}>
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
      <Text style={styles.labelDate}>{selectedDate.toISOString().split('T')[0]}</Text>
      <Text style={styles.labelCurso}>Escolha o curso:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          onValueChange={(itemValue) => setCursoEscolhido(itemValue)}
          items={[
            { label: 'Artesanato', value: 1 },
            { label: 'Jiu-Jitsu', value: 2 },
            { label: 'Teclado', value: 3 },
            { label: 'Canto', value: 4 },
            { label: 'Bateria', value: 5 },
          ]}
          style={{
            inputIOS: {
              color: 'white',
            },
            inputAndroid: {
              color: 'white',
            },
            iconContainer: {
              top: 15,
              right: 15,
            },
          }}
          Icon={() => {
            return <FontAwesome5 name="chevron-down" size={18} color="white" />;
          }}
        />
      </View>

      <View style={styles.labelList}>
        <Text style={styles.titulo}>Lista de Presença:</Text>
        <FlatList
          data={presencas}
          renderItem={({ item }) => (
            <View style={styles.lista}>
              <Text style={styles.aluno}>{item.alunos?.nome} </Text>
              <Text
                style={[styles.chamada, String(item.chamadaAluno) === 'AUSENTE' && styles.ausente]}>
                {item.chamadaAluno}
              </Text>
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b1f34',
  },

  labelList: {
    marginBottom: 20,
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

  labelDate: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: 30,
    marginBottom: 10,
    fontWeight: 'bold',
    color: 'white',
    borderWidth: 1,
    borderColor: '#ed7947',
    marginHorizontal: 90,
    borderRadius: 20,
    paddingVertical: 10,
  },
  aluno: {
    textAlign: 'center',
    marginLeft: 40,
    color: 'white',
  },
  chamada: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginLeft: 10,
    color: 'white',
  },
  pickerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 3,
    paddingVertical: 3,
    marginHorizontal: 50,
    marginBottom: 40,
    color: 'white',
  },
  ausente: {
    color: '#FE6262',
  },
  btnText: {
    color: 'white',
    width: 300,
  },
  titulo: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
  },
  labelCurso: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
  },
  lista: {
    flexDirection: 'row',
    textAlign: 'center',
  },
});

export default React.memo(PresençaExibir);
