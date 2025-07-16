import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Image,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { styles } from "./styles";
import { getToken, saveToken } from "../../utils/auth";
import Icon from "react-native-vector-icons/Feather";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TextInput } from "react-native-paper";

interface UserDetails {
  name: string;
  email: string;
  phone: string;
  emp_id: string;
  role: string;
  department: string;
  createdAt: Date;
  userID: string;
}

const ProfileDetail: React.FC = () => {
  const [user, setUser] = useState<UserDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        const userData = await AsyncStorage.getItem("userData");

        if (!token || !userData) {
          Alert.alert("Error", "Session expired or invalid.");
          return;
        }

        const parsedUserData: UserDetails = JSON.parse(userData);
        const userId = parsedUserData.userID;

        const response = await axios.get(
          "https://dev.api.slnkoprotrac.com/v1/get-all-user-IT",
          {
            headers: {
              "x-auth-token": token,
            },
          }
        );

        const matchedUser = response?.data?.data.find(
          (item: any) => String(item._id) === String(userId)
        );

        if (!matchedUser) {
          Alert.alert("Error", "User not found.");
          return;
        }

        const userDetails: UserDetails = {
          name: matchedUser.name,
          email: matchedUser.email,
          phone: matchedUser.phone,
          emp_id: matchedUser.emp_id,
          role: matchedUser.role,
          department: matchedUser.department || "",
          createdAt: matchedUser.createdAt || "",
          userID: matchedUser._id,
        };

        setUser(userDetails);
        setEmail(userDetails.email);
        setPhone(userDetails.phone);
      } catch (error) {
        console.error("Failed to fetch user:", error);
        Alert.alert("Error", "Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleSave = async () => {
    if (!email || !phone) {
      Alert.alert("Validation Error", "Email and phone are required.");
      return;
    }

    try {
      const token = await AsyncStorage.getItem("authToken");
      if (!token) {
        Alert.alert("Error", "Missing token. Please login again.");
        return;
      }

      const response = await axios.put(
        `https://dev.api.slnkoprotrac.com/v1/edit-user/${user?.userID}`,
        {
          email,
          phone,
        },
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );

      if (response.status === 200) {
        const updatedUser = { ...user!, email, phone };
        setUser(updatedUser);
        await AsyncStorage.setItem("userData", JSON.stringify(updatedUser));
        setEditMode(false);
        Alert.alert("Success", "Profile updated successfully.");
      } else {
        Alert.alert("Error", "Failed to update profile. Try again later.");
      }
    } catch (error) {
      console.error("Update failed:", error);
      Alert.alert("Error", "Something went wrong while updating.");
    }
  };

  if (loading) {
    return (
      <ActivityIndicator size="large" color="#007bff" style={styles.loader} />
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.avatarContainer}>
          <Image
            source={require("../../../assets/images/slnko_blue_logo.png")}
            style={styles.avatar}
          />
        </View>
        <Text style={styles.name}>{user?.name}</Text>
        <Text style={styles.email}>{email}</Text>

        <View style={styles.infoContainer}>
          <InfoRow
            label="Phone"
            icon="phone"
            value={
              editMode ? (
                <TextInput
                  style={styles.input}
                  value={phone}
                  onChangeText={setPhone}
                  keyboardType="phone-pad"
                />
              ) : (
                <Text style={styles.value}>{phone}</Text>
              )
            }
          />
          <InfoRow
            label="Email"
            icon="mail"
            value={
              editMode ? (
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              ) : (
                <Text style={styles.value}>{email}</Text>
              )
            }
          />
          <InfoRow label="Employee ID" value={user?.emp_id} icon="hash" />
          <InfoRow
            label="Department"
            value={user?.department}
            icon="briefcase"
          />
          <InfoRow label="Role" value={user?.role} icon="user-check" />
          <InfoRow
            label="Type"
            value={<Badge text="Active" type="success" />}
            icon="tag"
          />
          <InfoRow label="Joined" value={user?.createdAt} icon="calendar" />
        </View>

        <TouchableOpacity
          onPress={editMode ? handleSave : () => setEditMode(true)}
          style={styles.editButton}
        >
          <Text style={styles.editButtonText}>
            {editMode ? "Save" : "Edit"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const InfoRow = ({
  label,
  value,
  icon,
}: {
  label: string;
  value: any;
  icon: string;
}) => (
  <View style={styles.row}>
    <View style={styles.rowLeft}>
      <Icon name={icon} size={16} color="#888" style={{ marginRight: 8 }} />
      <Text style={styles.label}>{label}</Text>
    </View>
    {typeof value === "string" ? (
      <Text style={styles.value}>{value}</Text>
    ) : (
      value
    )}
  </View>
);

const Badge = ({
  text,
  type,
}: {
  text: string;
  type: "success" | "warning";
}) => (
  <View
    style={[
      styles.badge,
      type === "success" ? styles.badgeSuccess : styles.badgeWarning,
    ]}
  >
    <Text style={styles.badgeText}>{text}</Text>
  </View>
);

export default ProfileDetail;
