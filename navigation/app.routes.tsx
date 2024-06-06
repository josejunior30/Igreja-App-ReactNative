import { NativeStackHeaderProps, createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import Inicio from '../src/screens/Inicio';

import Header from '~/screens/header';
import Cursos from '~/screens/cursos';
import DetalheCurso from '~/screens/cursos/detalhe-curso';
import { RootStackParamList } from './navigationTypes';



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
    </Stack.Navigator>
  );
}

export default AppRoutes;
