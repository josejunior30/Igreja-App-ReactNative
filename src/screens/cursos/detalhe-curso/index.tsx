import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from 'navigation/navigationTypes';
import { useEffect, useState } from 'react';
import { ScrollView, Text, View, StyleSheet, TextInput } from 'react-native';

import * as cursosService from '../../../service/cursosService';

import { cursosDTO } from '~/models/cursos';
import { Button } from 'react-native-paper';

type DetalheCursoRouteProp = RouteProp<RootStackParamList, 'DetalheCurso'>;

const DetalheCurso = () => {
  const route = useRoute<DetalheCursoRouteProp>();
  const { id } = route.params;
  const [cursosDTO, setCursosDTO] = useState<cursosDTO>();
  const [loading, setLoading] = useState(true);

  const loadCursosDTO = (id: number) => {
    cursosService
      .findById(id)
      .then((response) => {
        console.log('Detalhes do curso:', response.data);
        setCursosDTO(response.data);
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
      loadCursosDTO(id);
    }
  }, [id]);

  if (loading) {
    return <Text>Carregando...</Text>;
  }

  if (!cursosDTO) {
    return <Text>Curso não encontrado</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <View>
        <Button>
          <Text>Presença</Text>
          </Button>
        <Button>
          <Text>Relatorio</Text>
        </Button>
      
      </View>
      <View style={styles.table}>
        <View style={styles.header}>
          <Text style={[styles.indexCell, styles.headerText]}>#</Text>
          <Text style={[styles.cell, styles.headerText]}>Nome</Text>
          <Text style={[styles.cell, styles.headerText]}>Telefone</Text>
        </View>
        {cursosDTO.alunos.map((aluno, index) => (
          <View key={index} style={styles.row}>
            <Text style={styles.indexCell}>{index + 1}</Text>
            <Text style={styles.nome}>{aluno.nome}</Text>
            <Text style={styles.cell}>{aluno.telefone}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  table: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#00D4FF',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  cell: {
    padding: 8,
    width: 200,
  },
  nome: {
    padding: 8,
    width: 200,
  },
  indexCell: {
    minWidth: 50,
    textAlign: 'center',
    padding: 8,
  },
  headerText: {
    fontWeight: 'bold',
  },
});

export default DetalheCurso;
