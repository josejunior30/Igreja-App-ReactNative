import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import navigation from 'navigation';
import { RootStackParamList } from 'navigation/navigationTypes';
import { useEffect, useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { Button } from 'react-native-paper';

import { alunoDTO } from '~/models/alunos';
import * as alunosService from '~/service/alunosService';

const Alunos = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [alunosDTO, setAlunosDTO] = useState<alunoDTO[]>([]);
  const [alunos, setAlunos] = useState<alunoDTO[]>([]);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    alunosService
      .findAll()
      .then((response) => {
        setAlunosDTO(response.data);
      })
      .catch((error) => {
        console.error('Erro ao buscar dados:', error);
        // Trate o estado de erro (por exemplo, exiba uma mensagem de erro)
      });
  }, []);
  const handleSearch = async () => {
    try {
      const response = await alunosService.findByNome(searchTerm);
      setAlunosDTO(response.data);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
      // Trate o estado de erro (por exemplo, exiba uma mensagem de erro)
    }
  };
  const handleWhatsApp = (telefone: string) => {
    // Remova caracteres não numéricos do telefone
    const telefoneLimpo = telefone.replace(/\D/g, '');
    // Adicione o código do país (Brasil: +55) ao número de telefone
    const telefoneComCodigoPais = `+55${telefoneLimpo}`;
    Linking.openURL(`whatsapp://send?phone=${telefoneComCodigoPais}`);
  };

  if (!alunosDTO) {
    return <Text>Curso não encontrado</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.containerVoltar} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back-circle" size={30} color="white" />
        <Text style={styles.voltar}>Voltar</Text>
      </TouchableOpacity>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Pesquisar por nome"
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
        <Button style={styles.btnPesquisa} onPress={handleSearch}>
          <Text style={styles.btnText}>Pesquisar</Text>
        </Button>
      </View>
      <Button style={styles.btn} onPress={() => navigation.navigate('AddAlunos')}>
        <Text style={styles.btnText}>Adicionar Aluno</Text>
      </Button>
      <View style={styles.table}>
        <View style={styles.header}>
          <Text style={[styles.indexCell, styles.headerText]} />
          <Text style={[styles.cell, styles.headerText]}>Nome</Text>
          <Text style={[styles.cell, styles.headerText]}>Telefone</Text>
        </View>
        {alunosDTO.map((aluno, index) => (
          <View key={aluno.id} style={styles.alunoContainer}>
            <Text style={styles.alunoIndex}>{index + 1}.</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('DetalhesAlunos', { id: aluno.id })}>
              <Text style={styles.alunoNome}>{aluno.nome}</Text>
            </TouchableOpacity>

            <View style={styles.alunoTelefoneContainer}>
              <TouchableOpacity onPress={() => handleWhatsApp(aluno.telefone)}>
                <Text style={styles.alunoTelefone}>
                  <FontAwesome name="whatsapp" size={16} color="green" /> {aluno.telefone}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#0b1f34',
  },
  table: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#4c5d67',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 8,
  },
  indexCell: {
    minWidth: 40,
    textAlign: 'center',
    padding: 8,
    fontWeight: 'bold',
  },
  headerText: {
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 20,
  },
  cell: {
    padding: 8,
    width: 170,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    padding: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    marginRight: 8,
    backgroundColor: 'white',
  },
  resultsContainer: {
    marginTop: 16,
    marginBottom: 40,
  },
  alunoContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  alunoIndex: {
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 8,
  },
  alunoNome: {
    fontSize: 12,
    fontWeight: 'bold',
    flex: 1,
  },
  alunoTelefoneContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  alunoTelefone: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  btn: {
    backgroundColor: '#00D4FF',
    width: 200,
    marginLeft: 20,
    marginBottom: 20,
  },
  btnPesquisa: {
    backgroundColor: '#ed7947',
  },
  btnText: {
    color: 'white',
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

export default Alunos;
