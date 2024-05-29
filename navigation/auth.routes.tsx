import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from '~/screens/Login';



const Stack = createNativeStackNavigator();

function AuthRoutes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
    </Stack.Navigator>
  );
}
export default AuthRoutes;
