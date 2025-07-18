import "react-native-reanimated";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginScreen from "./src/screens/LoginScreen";
import HomeScreen from "./src/screens/HomeScreen";
import ProfileDetail from "./src/screens/ProfileScreen/ProfileDetail";
import ExpenseDetail from "./src/screens/ExpenseClaim/ExpenseDetail";
import { Provider as PaperProvider } from "react-native-paper";
import { View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomSidebar from "./src/components/customSidebar";
import { TabProvider } from "./src/store/tabContext";
// import ExpenseApprove from "./src/screens/ExpenseApproval/ExpenseApprove";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Home") iconName = "home";
          else if (route.name === "ProfileDetail") iconName = "person";
          else if (route.name === "ExpenseDetail") iconName = "cash";

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#003366",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />

      <Tab.Screen
        name="ProfileDetail"
        component={ProfileDetail}
        options={{
          title: "Profile Detail",
          headerStyle: {
            backgroundColor: "#003366",
          },
          headerTintColor: "#fff",
        }}
      />

      <Tab.Screen
        name="ExpenseDetail"
        component={ExpenseDetail}
        options={{
          title: "Expense Detail",
          headerStyle: {
            backgroundColor: "#003366",
          },
          headerTintColor: "#fff",
        }}
      />
     
    </Tab.Navigator>
  );
};

const DrawerLayout = () => {
  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: false }}
      drawerContent={() => <CustomSidebar />}
    >
      <Drawer.Screen name="Tabs" component={BottomTabs} />
      
    </Drawer.Navigator>
  );
};

const App = () => {
  return (
    <TabProvider>
      <PaperProvider>
        <NavigationContainer>
          <View style={{ flex: 1 }}>
            <Stack.Navigator initialRouteName="Login">
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen
                name="Main"
                component={DrawerLayout}
                options={{ headerShown: false }}
              />
              {/* <Stack.Screen
                name="ExpenseApprove"
                component={ExpenseApprove}
                options={{ title: "Expense Approval" }}
              /> */}
            </Stack.Navigator>
          </View>
        </NavigationContainer>
      </PaperProvider>
    </TabProvider>
  );
};

export default App;
