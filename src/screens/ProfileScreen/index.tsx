import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileDetail from '../ProfileScreen/ProfileDetail';

const Stack = createNativeStackNavigator();

<Stack.Screen name="Settings" component={ProfileDetail} options={{ title: "Settings" }} />
