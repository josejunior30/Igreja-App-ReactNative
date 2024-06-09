import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from 'navigation/navigationTypes';
import { useEffect, useState } from 'react';

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

  const loadRelatorioDTO = (id: string) => {
    relatorioService
      .findById(Number(id))
      .then((response) => {
        console.log('Detalhes do relatorio:', response.data);
        setRelatorioDTO(response.data);
      })
      .catch((error) => {
        console.error('Erro ao buscar detalhes do relatorio:', error);
        // Trate o estado de erro (por exemplo, exiba uma mensagem de erro)
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
};
export default DetalhesRelatorio;
