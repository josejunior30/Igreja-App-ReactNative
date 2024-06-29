import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from 'navigation/navigationTypes';
import { useEffect, useState } from 'react';
import { ScrollView, Text, View, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Button } from 'react-native-paper';

import * as cursosService from '../../../service/cursosService';

import { cursosDTO } from '~/models/cursos';

type DetalheCursoRouteProp = RouteProp<RootStackParamList, 'DetalheCurso'>;

const DetalheCurso = () => {
  const route = useRoute<DetalheCursoRouteProp>();
  const { id } = route.params;
  const [cursoDTO, setCursoDTO] = useState<cursosDTO>();
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const loadCursoDTO = (id: number) => {
    cursosService
      .findById(id)
      .then((response) => {
        console.log('Detalhes do curso:', response.data);
        setCursoDTO(response.data);
      })
      .catch((error) => {
        console.error('Erro ao buscar detalhes do curso', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (id) {
      loadCursoDTO(id);
    }
  }, [id]);

  const handleWhatsApp = (telefone: string) => {
    // Remova caracteres não numéricos do telefone
    const telefoneLimpo = telefone.replace(/\D/g, '');
    // Adicione o código do país (Brasil: +55) ao número de telefone
    const telefoneComCodigoPais = `+55${telefoneLimpo}`;
    Linking.openURL(`whatsapp://send?phone=${telefoneComCodigoPais}`);
  };

  if (loading) {
    return <Text>Carregando...</Text>;
  }

  if (!cursoDTO) {
    return <Text>Curso não encontrado</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.containerBtn}>
        <Button
          style={styles.button}
          onPress={() => navigation.navigate('Presença', { id: cursoDTO.id })}>
          <Text style={styles.buttonText}>Presença</Text>
        </Button>

        <Button style={styles.button} onPress={() => navigation.navigate('AddRelatorio')}>
          <Text style={styles.buttonText}>Relatório</Text>
        </Button>
      </View>
      <TouchableOpacity style={styles.containerVoltar} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back-circle" size={30} color="white" />
        <Text style={styles.voltar}>Voltar</Text>
      </TouchableOpacity>

      <View style={styles.table}>
        <View style={styles.header}>
          <Text style={[styles.indexCell, styles.headerText]} />
          <Text style={[styles.cell, styles.headerText]}>Nome</Text>
          <Text style={[styles.cell, styles.headerText]}>Telefone</Text>
        </View>
        {cursoDTO.alunos.map((aluno, index) => (
          <View key={index} style={styles.row}>
            <Text style={styles.indexCell}>{index + 1}</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('DetalhesAlunos', { id: aluno.id })}>
              <Text style={styles.nome}>{aluno.nome}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleWhatsApp(aluno.telefone)}>
              <Text style={styles.cell}>
                <FontAwesome name="whatsapp" size={16} color="green" /> {aluno.telefone}
              </Text>
            </TouchableOpacity>
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
  containerVoltar: {
    marginLeft: 30,
    flexDirection: 'row',
    marginBottom: 10,
  },
  containerBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 5,
    paddingVertical: 20,
  },
  voltar: {
    fontSize: 16,
    marginLeft: 10,
    fontWeight: 'bold',
    color: 'white',
  },
  button: {
    backgroundColor: '#ed7947',
    marginLeft: 15,
    marginRight: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
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
  row: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: 'white',
  },
  cell: {
    padding: 8,
    width: 170,
    fontWeight: 'bold',
  },
  nome: {
    padding: 8,
    width: 210,
    fontWeight: 'bold',
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
});

export default DetalheCurso;
