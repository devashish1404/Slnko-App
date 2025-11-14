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
import { useNavigation } from "@react-navigation/native";
import CustomHeader from "../../components/customHeader";
import { COLORS } from "../../theme/color";

const { width } = Dimensions.get("window");

const features = [
  {
    label: "My profile",
    icon: require("../../../assets/images/home_image/profile.png"),
  },
  {
    label: "Announcements",
    icon: require("../../../assets/images/home_image/announcement.png"),
  },
  {
    label: "TA Claim Bill",
    icon: require("../../../assets/images/home_image/baggage.png"),
  },
  {
    label: "DPR Submission",
    icon: require("../../../assets/images/home_image/TA_approval.png"),
  },
  {
    label: "Expense Claim",
    icon: require("../../../assets/images/home_image/expense_claim.png"),
  },
  {
    label: "Expense Approval",
    icon: require("../../../assets/images/home_image/approval.png"),
  },
  {
    label: "My Holiday",
    icon: require("../../../assets/images/home_image/calendar.png"),
  },
];

const CARD_WIDTH = (width - 32 - 16) / 2; // padding 16 + gap 16

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();

  const handlePress = (label: string) => {
    if (label === "My profile") {
      navigation.navigate("ProfileDetail" as never);
    } else if (label === "Expense Claim") {
      navigation.navigate("ExpenseDetail" as never);
    }else if (label === "DPR Submission") {
      navigation.navigate("DPRScreen" as never);
    }
  };

  const renderItem = ({ item }: { item: (typeof features)[0] }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.85}
      onPress={() => handlePress(item.label)}
    >
      <Image source={item.icon} style={styles.cardIcon} resizeMode="contain" />
      <Text style={styles.cardText}>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Top app header (hamburger + Home) */}
      <CustomHeader />

      {/* Blue section with title + search */}
      <View style={styles.blueSection}>
        <View style={styles.appTitleRow}>
          {/* Circle icon on left */}
          <View style={styles.appIconCircle}>
            <Image
              source={require("../../../assets/images/home_image/profile.png")}
              style={styles.appIcon}
              resizeMode="contain"
            />
          </View>

          <Text style={styles.appTitle}>IT Slnko</Text>
        </View>

        {/* Search bar */}
        <View style={styles.searchBar}>
          <Text style={styles.searchPlaceholder}>
            Search across Slnko Workplace..
          </Text>
          <Text style={styles.searchIcon}>🔍</Text>
        </View>
      </View>

      {/* White cards area */}
      <View style={styles.cardsWrapper}>
        <FlatList
          data={features}
          renderItem={renderItem}
          keyExtractor={(item) => item.label}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background, // light background
  },

  /* BLUE TOP PART */

  blueSection: {
    backgroundColor: COLORS.primary, // #003366 from theme
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 32,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  appTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  appIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.primarySoft,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  appIcon: {
    width: 24,
    height: 24,
    tintColor: COLORS.textOnPrimary,
  },
  appTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.textOnPrimary,
  },

  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surface,
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  searchPlaceholder: {
    flex: 1,
    color: COLORS.textMuted,
    fontSize: 14,
  },
  searchIcon: {
    fontSize: 18,
    color: COLORS.primaryLight,
  },

  /* CARDS AREA */

  cardsWrapper: {
    flex: 1,
    marginTop: -15, // slight overlap like screenshot
    paddingHorizontal: 16,
  },
  listContent: {
    paddingTop: 24,
    paddingBottom: 16,
  },
  columnWrapper: {
    justifyContent: "space-between",
    marginBottom: 16,
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: COLORS.surface,
    borderRadius: "25%",
    paddingVertical: 22,
    alignItems: "center",
    justifyContent: "center",
    // soft shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardIcon: {
    width: 40,
    height: 40,
    marginBottom: 10,
  },
  cardText: {
    fontSize: 13,
    textAlign: "center",
    color: COLORS.primary,
    fontWeight: "500",
  },
});
