import { Ionicons } from '@expo/vector-icons';
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from 'navigation/navigationTypes';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';

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
      <TouchableOpacity style={styles.containerVoltar} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back-circle" size={30} color="white" />
        <Text style={styles.voltar}>Voltar</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Relatório</Text>
      <View style={styles.projetoContainer}>
        <View  style={styles.cabeçalho}> 
          <Text style={styles.label}>Data: {new Date(relatorioDTO.data).toLocaleDateString()}</Text>
          <Text style={styles.label}>Curso: {relatorioDTO.projetosRelatorio.nome}</Text>
          <Text style={styles.label}>Professor: {relatorioDTO.projetosRelatorio.lider}</Text>
        </View>
        <Text style={styles.pergunta}>A aula ocorreu normalmente?</Text>
        <Text style={styles.resposta}>{relatorioDTO['A aula ocorreu normalmente?']}</Text>
        <Text style={styles.pergunta}>
          Algum(a) aluno(a) apresentou problemas de comportamento, aprendizagem, assistência social
          ou espiritual? Qual?'{' '}
        </Text>
        <Text style={styles.resposta}>
          {
            relatorioDTO[
              'Algum(a) aluno(a) apresentou problemas de comportamento, aprendizagem, assistência social ou espiritual? Qual?'
            ]
          }
        </Text>
        <Text style={styles.pergunta}>Houve dificuldade com o material das aulas?</Text>
        <Text style={styles.resposta}>
          {relatorioDTO['Houve dificuldade com o material das aulas?']}
        </Text>

        <Text style={styles.pergunta}>Alguma sugestão para a equipe de trabalho?</Text>
        <Text style={styles.resposta}>
          {relatorioDTO['Alguma sugestão para a equipe de trabalho?']}
        </Text>

        <Text style={styles.pergunta}>Mais alguma observação ou sugestão?</Text>
        <Text style={styles.resposta}> {relatorioDTO['Mais alguma observação ou sugestão?']}</Text>

        <Image source={{ uri: estacao }} style={styles.image} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#0b1f34',
  },
  cabeçalho:{

marginBottom:30
  },
  image: {
    width: '50%',
    height: 70,
    resizeMode: 'contain',
    marginBottom: 16,
    justifyContent:'center',
    alignItems:'center',
    alignSelf:'center'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color:'white'
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  pergunta: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: 'bold',
    backgroundColor:'#0b1f34',
    padding:10,
    color:'white'
  
  },
  resposta: {
    fontSize: 16,
    marginBottom: 8,
    paddingBottom:20
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
  projetoContainer: {
    marginTop: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    marginBottom:20
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
