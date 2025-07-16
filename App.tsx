import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./src/screens/LoginScreen";
import HomeScreen from "./src/screens/HomeScreen";
import ProfileDetail from "./src/screens/ProfileScreen/ProfileDetail";
import ExpenseDetail from "./src/screens/ExpenseClaim/ExpenseDetail";
import { Provider as PaperProvider } from "react-native-paper";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{headerShown:false}}
            />
            <Stack.Screen name="ProfileDetail" component={ProfileDetail} />
            <Stack.Screen name="ExpenseDetail" component={ExpenseDetail} />
        </Stack.Navigator>
      
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
