import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from 'navigation/navigationTypes';
import { View, Text, TouchableHighlight, Vibration, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Card } from 'react-native-paper';

const MenuSecretaria = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <View>
      <TouchableHighlight  onPress={() => navigation.navigate('Relatorio')} underlayColor="#DDDDDD">
        <View>
          <Card>
            <MaterialCommunityIcons name="file-document-edit" />
            <Text>Relatorio</Text>
          </Card>
        </View>
      </TouchableHighlight>
      <TouchableHighlight  onPress={() => navigation.navigate('PresençaExibir')} underlayColor="#DDDDDD">
        <View>
          <Card>
            <MaterialCommunityIcons name="file-document-edit" />
            <Text>Presença</Text>
          </Card>
        </View>
      </TouchableHighlight>
      
    </View>
  );
};
export default MenuSecretaria;
