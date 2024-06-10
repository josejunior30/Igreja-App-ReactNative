import { Picker } from '@react-native-picker/picker';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from 'navigation/navigationTypes';
import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DateTimePickerModal from 'react-native-modal-datetime-picker'; // Importe o componente DateTimePickerModal

import { RelatorioDTO, projetosRelatorio } from '~/models/relatorio';
import { findAll, findDataAndProjeto } from '~/service/relatorioService';

const Relatorio = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [projeto, setProjeto] = useState<number | null>(null);
  const [relatorio, setRelatorio] = useState<RelatorioDTO[]>([]);
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
        console.log('Presenças recebidas:', response.data);
        setRelatorio(response.data);
      })
      .catch((error) => {
        console.error('Erro ao buscar relatórios por data e projeto:', error);
      });
  };
  const handleLimparData = () => {
    setSelectedDate(new Date());
    setProjeto(null);
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
      <DateTimePickerModal // Renderize o componente DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />

      <Text>Data Escolhida: {selectedDate.toISOString().split('T')[0]}</Text>

      <Text>Escolha o projeto:</Text>
      <Picker
        selectedValue={projeto}
        onValueChange={(itemValue: any) => handleProjetoChange(itemValue)}>
        <Picker.Item label="Selecione um projeto" value={null} />
        <Picker.Item label="Artesanato" value={1} />
        <Picker.Item label="Jiu-Jitsu" value={2} />
        <Picker.Item label="Teclado" value={3} />
        <Picker.Item label="Canto" value={4} />
        <Picker.Item label="Bateria" value={5} />
      </Picker>

      <Button title="Buscar Relatório" onPress={buscarRelatorio} />

      <Button title="Limpar" onPress={handleLimparData} />

      <View>
        <Text>Relatórios:</Text>
        <FlatList
          data={relatorio}
          renderItem={({ item }) => (
            <View>
              <TouchableOpacity
                onPress={() => navigation.navigate('DetalhesRelatorio', { id: item.id })}>
                <Text>Projeto: {item.projetosRelatorio.nome}</Text>
              </TouchableOpacity>
              <Text>Professor: {item.projetosRelatorio.lider}</Text>
              {/* Adicione aqui os outros campos do relatório */}
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </View>
  );
};

export default Relatorio;
