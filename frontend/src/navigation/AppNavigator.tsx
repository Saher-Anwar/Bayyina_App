// navigation/AppNavigator.tsx
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ApiTestScreen from '../screens/TestScreen';

export type RootStackParamList = {
  ApiTest: undefined;
  // Add other screens here later
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="ApiTest">
      <Stack.Screen 
        name="ApiTest" 
        component={ApiTestScreen}
        options={{ title: 'API Test Screen' }}
      />
    </Stack.Navigator>
  );
}