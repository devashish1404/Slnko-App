import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import axios from "axios";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { styles } from "./styles";
import { saveToken } from "../../utils/auth";
import type { RootStackParamList } from "../../../src/navigation/types";



const LoginScreen: React.FC = () => {
  const [userId, setUserId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
 const navigation = useNavigation<LoginScreenNavigationProp>();

 type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Login"
>;


  const handleLogin = async () => {
    try {
      if (!userId || !password) {
        Alert.alert("Missing Fields", "Please enter both ID and password");
        return;
      }

      const response = await axios.post("https://api.slnkoprotrac.com/v1/logiN-IT", {
        userId,
        password,
      });

      const token = response.data.token;
      if (token) {
        await saveToken(token);
        Alert.alert("Success", "Logged in!");
        navigation.navigate("Home");
      } else {
        Alert.alert("Error", "Token not received");
      }
    } catch (err) {
      console.error(err);
      Alert.alert("Login Failed", "Please check your credentials and try again.");
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image
        source={require("../../../assets/images/protrac_logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Name/ID Field */}
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Name or Employee ID"
          placeholderTextColor="#999"
          value={userId}
          onChangeText={setUserId}
        />
      </View>

      {/* Password Field */}
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#999"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Icon
            name={showPassword ? "eye-off" : "eye"}
            size={22}
            color="#666"
          />
        </TouchableOpacity>
      </View>

      {/* Login Button */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      {/* Forgot Password */}
      <TouchableOpacity>
        <Text style={styles.forgotText}>Forget Password?</Text>
      </TouchableOpacity>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.poweredBy}>Powered By</Text>
        <Image
          source={require("../../../assets/images/slnko_blue_logo.png")}
          style={styles.footerLogo}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

export default LoginScreen;
