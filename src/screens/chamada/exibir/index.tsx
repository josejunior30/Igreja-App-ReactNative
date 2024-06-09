import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Picker from 'react-native-picker-select';

import { PresencaDTO } from '~/models/presenca';
import { findDataAndProjeto } from '~/service/presencaService';

const PresençaExibir = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [cursoEscolhido, setCursoEscolhido] = useState<number | null>(null);
  const [presencas, setPresencas] = useState<PresencaDTO[]>([]);

  useEffect(() => {
    fetchPresencas();
  }, []);

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

  const handleConfirm = (date: Date) => {
    setSelectedDate(date);
    hideDatePicker();
  };

  return (
    <View>
      <Button title="Escolha a data" onPress={showDatePicker} />

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />

      <Text>Escolha o curso:</Text>
      <Picker
        onValueChange={(itemValue, itemIndex) => setCursoEscolhido(itemValue)}
        items={[
          { label: 'Artesanato', value: 1 },
          { label: 'Jiu-Jitsu', value: 2 },
          { label: 'Teclado', value: 3 },
          { label: 'Canto', value: 4 },
          { label: 'Bateria', value: 5 },
          
        ]}
      />

      <Button title="Buscar Presenças" onPress={fetchPresencas} />

      <View>
        <Text>Presenças para a data e curso selecionados:</Text>
        <FlatList
          data={presencas}
          renderItem={({ item }) => (
            <View>
              <Text>Aluno: {item.alunos?.nome}</Text>
              <Text>Projeto: {item.projetosChamada?.nome}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </View>
  );
};

export default PresençaExibir;
