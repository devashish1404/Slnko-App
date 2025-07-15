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
import { ActivityIndicator, Dialog, Portal, Button } from "react-native-paper";

import { styles } from "../LoginScreen/styles";
import { saveToken } from "../../utils/auth";
import type { RootStackParamList } from "../../../src/navigation/types";
import ButtonComp from "../../components/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";

type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Login"
>;

const LoginScreen: React.FC = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogMessage, setDialogMessage] = useState("");

  const showDialog = (title: string, message: string) => {
    setDialogTitle(title);
    setDialogMessage(message);
    setDialogVisible(true);
  };

  const hideDialog = () => setDialogVisible(false);

  const handleLogin = async () => {
    if (!name || !password) {
      showDialog(
        "Missing Fields",
        "Please enter both username/email and password"
      );
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "https://api.slnkoprotrac.com/v1/logiN-IT",
        {
          name,
          password,
        }
      );

      const token = response.data.token;
      const userId = response.data.userId;

      if (token) {
        await AsyncStorage.setItem("authToken", token);
      } else {
        Alert.alert("Error token");
      }

      const userResponse = await axios.get(
        `https://api.slnkoprotrac.com/v1/get-all-user-IT`,
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );

      const matchedUser = userResponse?.data?.data.find(
        (item: any) => String(item._id) === String(userId)
      );

      if (matchedUser) {
        const userDetails = {
          name: matchedUser.name,
          email: matchedUser.email,
          phone: matchedUser.phone,
          emp_id: matchedUser.emp_id,
          role: matchedUser.role,
          department: matchedUser.department || "",
          createdAt: matchedUser.createdAt || "",
          userID: matchedUser._id || "",
        };
        await AsyncStorage.setItem("userData", JSON.stringify(userDetails));
        showDialog("Success", `Welcome ${matchedUser.name || "User"}!`);
        navigation.navigate("Home");
      } else {
        showDialog("Error", "User not found in user list");
      }
    } catch (error) {
      console.error(error);
      showDialog(
        "Login Failed",
        "Please check your credentials and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/images/protrac_logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Name or Employee ID"
          placeholderTextColor="#999"
          value={name}
          onChangeText={setName}
        />
      </View>

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

      <ButtonComp onPress={handleLogin} title="Login" />

      <TouchableOpacity>
        <Text style={styles.forgotText}>Forget Password?</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.poweredBy}>Powered By</Text>
        <Image
          source={require("../../../assets/images/slnko_blue_logo.png")}
          style={styles.footerLogo}
          resizeMode="contain"
        />
      </View>

      <Portal>
        <Dialog
          visible={dialogVisible}
          onDismiss={hideDialog}
          style={{ backgroundColor: "lightsteelblue" }}
        >
          <Dialog.Title style={{ color: "black", fontWeight: "bold" }}>
            {dialogTitle}
          </Dialog.Title>
          <Dialog.Content>
            <Text>{dialogMessage}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              onPress={hideDialog}
              labelStyle={{ color: "#003366", fontWeight: "bold" }}
            >
              OK
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default LoginScreen;
