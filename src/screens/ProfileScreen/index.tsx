import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileDetail from '../ProfileScreen/ProfileDetail';

const Stack = createNativeStackNavigator();

<Stack.Screen name="ProfileDetail" component={ProfileDetail} options={{ title: "Profile" }} />
