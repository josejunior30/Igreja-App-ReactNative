import React, { useState } from 'react';
import { Ionicons, Entypo, MaterialCommunityIcons, FontAwesome6 } from '@expo/vector-icons';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from 'navigation/navigationTypes';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Card } from 'react-native-paper';

const MenuSecretaria = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [activeCard, setActiveCard] = useState<string | null>(null);

  const handlePressIn = (card: string) => {
    setActiveCard(card);
  };

  const handlePressOut = () => {
    setActiveCard(null);
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.containerVoltar} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back-circle" size={30} color="white" />
        <Text style={styles.voltar}>Voltar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Alunos')}
        onPressIn={() => handlePressIn('PresençaExibir')}
        onPressOut={handlePressOut}
      >
        <Card style={[styles.card, activeCard === 'PresençaExibir' && styles.activeCard]}>
          <Text style={styles.textLink}>
            <FontAwesome6 name="users" size={30} color="#ed7947" /> Alunos
          </Text>
        </Card>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Relatorio')}
        onPressIn={() => handlePressIn('Relatorio')}
        onPressOut={handlePressOut}
      >
        <Card style={[styles.card, activeCard === 'Relatorio' && styles.activeCard]}>
          <Text style={styles.textLink}>
            <Entypo name="calculator" size={30} color="#ed7947" /> Financeiro
          </Text>
        </Card>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Relatorio')}
        onPressIn={() => handlePressIn('Relatorio')}
        onPressOut={handlePressOut}
      >
        <Card style={[styles.card, activeCard === 'Relatorio' && styles.activeCard]}>
          <Text style={styles.textLink}>
            <MaterialCommunityIcons name="file-document-edit" size={30} color="#ed7947" /> Relatório
          </Text>
        </Card>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('PresençaExibir')}
        onPressIn={() => handlePressIn('PresençaExibir')}
        onPressOut={handlePressOut}
      >
        <Card style={[styles.card, activeCard === 'PresençaExibir' && styles.activeCard]}>
          <Text style={styles.textLink}>
            <Ionicons name="document-text-sharp" size={30} color="#ed7947" /> Presença
          </Text>
        </Card>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('PresençaExibir')}
        onPressIn={() => handlePressIn('Avisos')}
        onPressOut={handlePressOut}
      >
        <Card style={[styles.card, activeCard === 'Avisos' && styles.activeCard]}>
          <Text style={styles.textLink}>
            <Ionicons name="notifications" size={30} color="#ed7947" /> Avisos
          </Text>
        </Card>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1, 
    paddingTop: 30,
    backgroundColor: '#0b1f34',
  },
  containerVoltar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    marginBottom: 20,
  },
  voltar: {
    fontSize: 16,
    marginLeft: 10,
    fontWeight: 'bold',
    color: 'white',
  },
  card: {
    borderStyle: 'solid',
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 15,
    height: 110,
    borderRadius: 20,
    marginBottom: 20,
    marginHorizontal: 60,
    justifyContent: 'center',
  },
  activeCard: {
    backgroundColor: '#d1d1d1',
  },
  textLink: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0b1f34',
  },
});

export default MenuSecretaria;

