import { NativeStackHeaderProps, createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { RootStackParamList } from './navigationTypes';
import Inicio from '../src/screens/Inicio';

import Presença from '~/screens/chamada';
import Cursos from '~/screens/cursos';
import DetalheCurso from '~/screens/cursos/detalhe-curso';
import Header from '~/screens/header';

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
    </Stack.Navigator>
  );
}

export default AppRoutes;
