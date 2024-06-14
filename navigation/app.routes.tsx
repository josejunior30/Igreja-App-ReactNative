import { NativeStackHeaderProps, createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { RootStackParamList } from './navigationTypes';
import Inicio from '../src/screens/Inicio';

import PresençaExibir from '~/screens/chamada/exibir';
import Presença from '~/screens/chamada/inserir';
import Cursos from '~/screens/cursos';
import DetalheCurso from '~/screens/cursos/detalhe-curso';
import Header from '~/screens/header';
import DetalhesRelatorio from '~/screens/relatorio/detalhes';
import Relatorio from '~/screens/relatorio/exibir';
import AddRelatorio from '~/screens/relatorio/inserir';
import MenuSecretaria from '~/screens/secretaria';
import Alunos from '~/screens/alunos/exibir';
import DetalhesAlunos from '~/screens/alunos/detalhe';

const Stack = createNativeStackNavigator<RootStackParamList>();

function AppRoutes() {
  return (
    <Stack.Navigator
      screenOptions={{
        header: (props: NativeStackHeaderProps) => <Header {...props} />,
      }}>
      <Stack.Screen name="Inicio" component={Inicio} />
      <Stack.Screen name="Cursos" component={Cursos} />
      <Stack.Screen name="DetalheCurso" component={DetalheCurso} />
      <Stack.Screen name="Presença" component={Presença} />
      <Stack.Screen name="PresençaExibir" component={PresençaExibir} />
      <Stack.Screen name="Relatorio" component={Relatorio} />
      <Stack.Screen name="DetalhesRelatorio" component={DetalhesRelatorio} />
      <Stack.Screen name="AddRelatorio" component={AddRelatorio} />
      <Stack.Screen name="MenuSecretaria" component={MenuSecretaria} />
      <Stack.Screen name="Alunos" component={Alunos} />
      <Stack.Screen name="DetalhesAlunos" component={DetalhesAlunos} />
    </Stack.Navigator>
  );
}

export default AppRoutes;
