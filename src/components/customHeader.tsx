import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { styles } from "./customHeaderStyles";

interface CustomHeaderProps {
  onMenuPress?: () => void;
  onHomePress?: () => void;
  title?: string;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({ title = "Home" }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <TouchableOpacity
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        style={{ marginTop: "5%" }}
      >
        <MaterialCommunityIcons name="menu" size={30} color="#fff" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
};

export default CustomHeader;
