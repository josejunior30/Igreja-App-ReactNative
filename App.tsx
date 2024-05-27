import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native/Libraries/Components/StatusBar/StatusBar';

import Routes from './navigation';

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#1d1d2e" barStyle="light-content" translucent={false} />
      <Routes />;
    </NavigationContainer>
  );
}
