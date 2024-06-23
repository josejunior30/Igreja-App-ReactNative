import { FontAwesome } from '@expo/vector-icons';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from 'navigation/auth.routes';
import { RootStackParamList } from 'navigation/navigationTypes';
import React, { useEffect, useState } from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  Pressable,
  ActivityIndicator,
} from 'react-native';

import { useAuth } from '../../contexts/AuthContext';

import { UsuarioDTO } from '~/models/usuario';
import * as usuarioLogadoService from '~/service/usuarioLogadoService';

const Header: React.FC<NativeStackHeaderProps> = (props) => {
  const { isAuthenticated, logout } = useAuth();
  const [userName, setUserName] = useState<UsuarioDTO | undefined>();
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [loading, setLoading] = useState(false); 

  const navigation = useNavigation<NavigationProp<RootStackParamList & AuthStackParamList>>();

  useEffect(() => {
   
    const fetchUserName = async () => {
      try {
        setLoading(true);
        const response = await usuarioLogadoService.findMe();
        setUserName(response.data);
      } catch (error) {
        console.error('Erro ao carregar nome do usuário:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserName();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigation.navigate('LoginScreen');
    } catch (error) {
      console.error('Erro durante o logout:', error);
    }
  };

  if (loading) {
    return <ActivityIndicator size="small" color="#fff" />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerLogo}>
        <Image style={styles.logo} source={require('../../../assets/estacao.png')} />
      </View>
      <View style={styles.containerUser}>
        <TouchableOpacity onPress={() => setShowSubMenu(true)}>
          <FontAwesome name="user-circle" size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setShowSubMenu(true)}>
          <Text style={styles.nome}>Olá, {userName?.nome}!</Text>
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent
          visible={showSubMenu}
          onRequestClose={() => setShowSubMenu(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Pressable style={styles.modalOption} onPress={handleLogout}>
                <Text style={styles.modalOptionText}>Sair</Text>
              </Pressable>
              <Pressable
                style={styles.modalOption}
                onPress={() => navigation.navigate('ChangePasswordScreen')}>
                <Text style={styles.modalOptionText}>Redefinir Senha</Text>
              </Pressable>
              <Pressable style={styles.modalOption} onPress={() => setShowSubMenu(false)}>
                <Text style={[styles.modalOptionText, { color: 'red' }]}>Fechar</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#14375B',
    borderBottomWidth: 1,
    borderBottomColor: 'white',
  },
  containerUser: {
    marginLeft: 80,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
  },
  nome: {
    marginLeft: 10,
    fontSize: 18,
    color: 'white',
  },
  containerLogo: {
    marginBottom: 20,
    paddingBottom: 20,
  },
  logo: {
    width: 120,
    height: 50,
    marginLeft: 30,
    marginTop: 30,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalOption: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
    alignItems: 'center',
  },
  modalOptionText: {
    fontSize: 18,
    color: '#333',
  },
});

export default Header;
