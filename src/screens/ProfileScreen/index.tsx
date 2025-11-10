import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Pressable, Alert } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProfileDetail from "../ProfileScreen/ProfileDetail"; // <-- your screen import

const Stack = createNativeStackNavigator();

const colors = {
  bg: "#F5F7FB",
  text: "#111827",
};

async function handleLogout(navigation: any) {
  try {
    await AsyncStorage.multiRemove(["authToken", "userData"]);
    Alert.alert("Logged out", "Please login again.");
    // 👇 optional reset if you have a Login screen
    // navigation.reset({ index: 0, routes: [{ name: "Login" }] });
  } catch (error) {
    console.log("Logout error:", error);
  }
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: colors.bg },
          headerTitleStyle: { color: colors.text, fontWeight: "700" },
          headerShadowVisible: false,
          headerTitleAlign: "center",
        }}
      >
        <Stack.Screen
          name="Settings"
          component={ProfileDetail}
          options={({ navigation }) => ({
            title: "Settings",
            headerLeft: () => (
              <Pressable hitSlop={10} onPress={() => navigation.goBack()}>
                <Feather name="arrow-left" size={22} color={colors.text} />
              </Pressable>
            ),
            headerRight: () => (
              <Pressable hitSlop={10} onPress={() => handleLogout(navigation)}>
                <Feather name="power" size={22} color="#ea4335" />
              </Pressable>
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
