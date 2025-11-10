import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles, colors } from "./styles";
import axios from "axios";

type User = {
  name: string;
  emp_id?: string;
  userID?: string;
  email?: string;
  avatarUrl?: string;
};

const ProfileDetail: React.FC<{ onViewProfile?: () => void }> = ({
  onViewProfile,
}) => {
  const [user, setUser] = useState<User>({
    name: "",
    emp_id: "",
    email: "",
  });

 useEffect(() => {
  const fetchUserProfile = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      if (!token) {
        console.warn("No token found");
        return;
      }

      const response = await axios.get(
        "https://dev.api.slnkoprotrac.com/v1/get-all-user-IT",
        {
          headers: { "x-auth-token": token },
        }
      );

      const userData = await AsyncStorage.getItem("userData");
      const parsed = userData ? JSON.parse(userData) : null;
      const userId = parsed?.userID;

      const matched = response?.data?.data?.find(
        (item: any) => String(item._id) === String(userId)
      );

      if (matched) {
        setUser({
          name: matched.name,
          emp_id: matched.emp_id,
          email: matched.email,
          avatarUrl: matched.avatar || "",
        });
      }
    } catch (error) {
      console.log("Error fetching user:", error);
    }
  };

  fetchUserProfile();
}, []);

  

  return (
    <SafeAreaView style={styles.safe}>
      {/* Top bar */}
      {/* <View style={styles.topBar}>
        <Pressable hitSlop={10}>
          <Feather name="arrow-left" size={22} color={colors.text} />
        </Pressable>
        <Text style={styles.topTitle}>Settings</Text>
        <Pressable hitSlop={10}>
          <Feather name="power" size={22} color="#ea4335" />
        </Pressable>
      </View> */}

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile card */}
        <View style={styles.card}>
          <View style={styles.profileRow}>
            <Image
              source={
                user.avatarUrl
                  ? { uri: user.avatarUrl }
                  : require("../../../assets/images/slnko_blue_logo.png")
              }
              style={styles.avatar}
            />
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{user.name || "-"}</Text>
              <Text style={styles.sub}>User Id :{user.emp_id || "-"}</Text>
              <Text style={styles.sub}>{user.email || "-"}</Text>
            </View>
          </View>

          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.primaryBtn}
            onPress={onViewProfile}
          >
            <Text style={styles.primaryBtnText}>View Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Organization */}
        <View style={styles.card}>
          <View style={styles.titleRow}>
            <View style={styles.iconBadge}>
              <Feather name="building" size={18} color={colors.primary} />
            </View>
            <Text style={styles.cardTitle}>Organization</Text>
            <Feather
              name="chevron-down"
              size={18}
              color={colors.muted}
              style={{ marginLeft: "auto" }}
            />
          </View>
          <Text style={styles.valueText}>SLNKO ENERGY PVT LTD</Text>
        </View>

        {/* Theme */}
        <Pressable style={styles.card}>
          <View style={styles.titleRow}>
            <View style={styles.iconBadge}>
              <Feather name="square" size={18} color={colors.primary} />
            </View>
            <Text style={styles.cardTitle}>Theme</Text>
            <Feather
              name="chevron-right"
              size={18}
              color={colors.muted}
              style={{ marginLeft: "auto" }}
            />
          </View>
          <Text style={styles.valueText}>System Default</Text>
        </Pressable>

        {/* Language */}
        <Pressable style={styles.card}>
          <View style={styles.titleRow}>
            <View style={styles.iconBadge}>
              <Feather name="type" size={18} color={colors.primary} />
            </View>
            <Text style={styles.cardTitle}>Language</Text>
            <Feather
              name="chevron-right"
              size={18}
              color={colors.muted}
              style={{ marginLeft: "auto" }}
            />
          </View>
          <Text style={styles.valueText}>English</Text>
        </Pressable>

        {/* Location Settings */}
        <Pressable style={styles.card}>
          <View style={styles.titleRow}>
            <View style={styles.iconBadge}>
              <Feather name="map-pin" size={18} color={colors.primary} />
            </View>
            <Text style={styles.cardTitle}>Location Settings</Text>
            <Feather
              name="chevron-right"
              size={18}
              color={colors.muted}
              style={{ marginLeft: "auto" }}
            />
          </View>
        </Pressable>

        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileDetail;

 