import React, { useState } from "react";
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
import { useNavigation } from "@react-navigation/native";
import { Button, TextInput } from "react-native-paper";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
// import TestingApp from "../../components/notifyUser";
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
    label: "TA Claim Approval",
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

  const dispatch = useAppDispatch()
  const count = useAppSelector((s) => s.counter.value)
  const [step, setStep] = useState('5')

export const Counter =() =>{
  return(
     <View style={styles.container}>
      <Text style={styles.title}>Counter: {count}</Text>

      <View style={styles.row}>
        <Btn label="-1" onPress={() => dispatch(decrement())} />
        <Btn label="+1" onPress={() => dispatch(increment())} />
        <TextInput
          value={step}
          onChangeText={setStep}
          keyboardType="numeric"
          placeholder="step"
          style={styles.input}
        />
        <Btn
          label={`+${step || 0}`}
          onPress={() => dispatch(addBy(Number(step) || 0))}
        />
        <Btn label="Reset" onPress={() => dispatch(reset())} />
      </View>
    </View>
  )
}

function Btn({ label, onPress }: { label: string; onPress: () => void }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.btn}>
      <Text style={styles.btnText}>{label}</Text>
    </TouchableOpacity>
  )
}

const HomeScreen: React.FC = () => {

  const navigation = useNavigation();


  const renderItem = ({ item }: { item: (typeof features)[0] }) => (
    <TouchableOpacity
    style={styles.card}
    onPress={() => {
      if (item.label === "My profile") {
        navigation.navigate("ProfileDetail" as never);
      } else if (item.label === "Expense Claim"){
          navigation.navigate("ExpenseDetail" as never)
      }
    }}
  >
    <Image source={item.icon} style={styles.iconImage} resizeMode="contain" />
    <Text style={styles.cardText}>{item.label}</Text>
  </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <CustomHeader />

      <View style={styles.logoContainer}>
        <Image
          source={require("../../../assets/images/slnko_blue_logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        {/* <Text style={styles.subtitle}>The Next Level Engineering</Text> */}
      </View>
      {/* <TestingApp /> */}

      <FlatList
        data={features}
        renderItem={renderItem}
        keyExtractor={(item) => item.label}
        numColumns={2}
        contentContainerStyle={styles.grid}
        columnWrapperStyle={{ justifyContent: "space-between" }}
      />

      {/* <View style={styles.footer}>
        <Text style={styles.footerText}>Powered By</Text>
        <Image
          source={require("../../../assets/images/slnko_blue_logo.png")}
          style={styles.footerLogo}
          resizeMode="contain"
        />
      </View> */}
    </View>
  );
};

export default HomeScreen;
