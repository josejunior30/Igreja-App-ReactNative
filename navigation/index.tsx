/* eslint-disable prettier/prettier */
import React from 'react';
import { ActivityIndicator, View } from 'react-native';

import AppRoutes from './app.routes';
import AuthLogin from './auth.login';

function Routes() {
  const isAuthenticated = false;
  const loading = false;

  if(loading){
    return(
        <View
        style={{
            flex:1, backgroundColor:'black',
            justifyContent: 'center',
            alignItems: 'center'
        }}
        >
            <ActivityIndicator size={60} color="white"/>
            </View>
    )
  }

  return(isAuthenticated ? <AppRoutes /> : <AuthLogin />)
}

export default Routes;
