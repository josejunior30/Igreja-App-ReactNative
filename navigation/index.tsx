import React from 'react';
import { ActivityIndicator, View } from 'react-native';

import AppRoutes from './app.routes';
import AuthRoutes from './auth.routes';

import { useAuth } from '~/contexts/AuthContext';

function Routes() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'black',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator size={60} color="white" />
      </View>
    );
  }

  return isAuthenticated ? <AppRoutes /> : <AuthRoutes />;
}

export default Routes;
