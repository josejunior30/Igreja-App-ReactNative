import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import Inicio from '../src/screens/Inicio';

const Stack = createNativeStackNavigator();

function AppRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Inicio" component={Inicio} />
    </Stack.Navigator>
  )
}

export default AppRoutes;
