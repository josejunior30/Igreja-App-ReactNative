import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from 'navigation/navigationTypes';
import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, ScrollView, Image } from 'react-native';

import { RelatorioDTO } from '~/models/relatorio';
import * as relatorioService from '~/service/relatorioService';

type DetalhesRelatorioRouteProp = RouteProp<RootStackParamList, 'DetalhesRelatorio'>;

const DetalhesRelatorio = () => {
  const [relatorioDTO, setRelatorioDTO] = useState<RelatorioDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const estacao = 'https://i.postimg.cc/zX9nQ80Q/Esta-o-siba-250-x-150-mm-250-x-100-mm.png';
  const route = useRoute<DetalhesRelatorioRouteProp>();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { id } = route.params;

  const loadRelatorioDTO = (id: number) => {
    relatorioService
      .findById(id)
      .then((response) => {
        console.log('Detalhes do relatorio:', response.data);
        setRelatorioDTO(response.data);
      })
      .catch((error) => {
        console.error('Erro ao buscar detalhes do relatorio:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (id) {
      loadRelatorioDTO(id);
    }
  }, [id]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!relatorioDTO) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Erro ao carregar o relatório.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: estacao }} style={styles.image} />
      <Text style={styles.title}>Detalhes do Relatório</Text>
      <Text style={styles.label}>ID: {relatorioDTO.id}</Text>
      <Text style={styles.label}>Data: {new Date(relatorioDTO.data).toLocaleDateString()}</Text>
      <Text style={styles.label}>
        A aula ocorreu normalmente?: {relatorioDTO['A aula ocorreu normalmente?']}
      </Text>
      <Text style={styles.label}>
        Problemas apresentados por alunos:{' '}
        {
          relatorioDTO[
            'Algum(a) aluno(a) apresentou problemas de comportamento, aprendizagem, assistência social ou espiritual? Qual?'
          ]
        }
      </Text>
      <Text style={styles.label}>
        Dificuldade com o material das aulas?:{' '}
        {relatorioDTO['Houve dificuldade com o material das aulas?']}
      </Text>
      <Text style={styles.label}>
        Sugestões para a equipe: {relatorioDTO['Alguma sugestão para a equipe de trabalho?']}
      </Text>
      <Text style={styles.label}>
        Observações ou sugestões adicionais: {relatorioDTO['Mais alguma observação ou sugestão?']}
      </Text>
      <View style={styles.projetoContainer}>
        <Text style={styles.label}>Projeto:</Text>
        <Text style={styles.label}>ID: {relatorioDTO.projetosRelatorio.id}</Text>
        <Text style={styles.label}>Nome: {relatorioDTO.projetosRelatorio.nome}</Text>
        <Text style={styles.label}>Líder: {relatorioDTO.projetosRelatorio.lider}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'contain',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  projetoContainer: {
    marginTop: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
});

export default DetalhesRelatorio;
