import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { styles } from "../HomeScreen/styles";
import CustomHeader from "../../components/customHeader";
const { width } = Dimensions.get("window");

const features = [
  { label: "My profile", icon: "account-circle-outline" },
  { label: "Announcements", icon: "bullhorn-outline" },
  { label: "TA Claim Bill", icon: "briefcase-outline" },
  { label: "TA Claim Approval", icon: "file-check-outline" },
  { label: "Expense Claim", icon: "cash-multiple" },
  { label: "Expense Approval", icon: "clipboard-check-outline" },
  { label: "My Holiday", icon: "calendar-month-outline" },
];

const HomeScreen: React.FC = () => {
  const renderItem = ({ item }: { item: (typeof features)[0] }) => (
    <TouchableOpacity style={styles.card}>
      <Icon name={item.icon} size={30} color="#003366" />
      <Text style={styles.cardText}>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <CustomHeader
        title="Profile"
        profileInitial="R"
        onMenuPress={() => console.log("Menu clicked")}
        onHomePress={() => console.log("Go to Home")}
      />

      {/* Logo & subtitle */}
      <View style={styles.logoContainer}>
        <Image
          source={require("../../../assets/images/slnko_blue_logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.subtitle}>The Next Level Engineering</Text>
      </View>

      {/* Grid menu */}
      <FlatList
        data={features}
        renderItem={renderItem}
        keyExtractor={(item) => item.label}
        numColumns={2}
        contentContainerStyle={styles.grid}
        columnWrapperStyle={{ justifyContent: "space-between" }}
      />

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Powered By</Text>
        <Image
          source={require("../../../assets/images/slnko_blue_logo.png")}
          style={styles.footerLogo}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

export default HomeScreen;
