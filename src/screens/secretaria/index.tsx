import { Entypo, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { NavigationProp, useNavigation } from '@react-navigation/native';

import { RootStackParamList } from 'navigation/navigationTypes';
import {
  View,
  Text,
  TouchableHighlight,
  Vibration,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Card } from 'react-native-paper';

const MenuSecretaria = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity onPress={() => navigation.navigate('Relatorio')}>
          <Card style={styles.card}>
            <MaterialCommunityIcons name="file-document-edit" />
            <Text style={styles.textLink}>Relatorio</Text>
          </Card>
        </TouchableOpacity>
        <TouchableHighlight
          onPress={() => navigation.navigate('PresençaExibir')}
          underlayColor="#DDDDDD">
          <Card style={styles.card}>
          <Entypo name="text-document" size={40} color="black"  style={styles.icons}/>
            <Text style={styles.textLink}>Presença</Text>
          </Card>
        </TouchableHighlight>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 2,
    paddingTop: 30,
    backgroundColor: '#0b1f34',
  },
  card: {
    borderStyle: 'solid',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 20,
    height: 110,
    borderRadius: 20,
    marginBottom: 20,
    marginHorizontal: 60,
justifyContent:'center'
  },
  icons:{

  },
  textLink: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight:'bold'
  },
});
export default MenuSecretaria;
