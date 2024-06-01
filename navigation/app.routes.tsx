import { NativeStackHeaderProps, createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import Inicio from '../src/screens/Inicio';

import Header from '~/screens/header';
import Cursos from '~/screens/cursos';

const Stack = createNativeStackNavigator();

function AppRoutes() {
  return (
    <Stack.Navigator
      screenOptions={{
        header: (props: NativeStackHeaderProps) => <Header {...props} />,
      }}>
      <Stack.Screen name="Inicio" component={Inicio} />
      <Stack.Screen name="Cursos" component={Cursos} />
    </Stack.Navigator>
  );
}

export default AppRoutes;
