import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ExpenseDetail from "../ExpenseClaim/ExpenseDetail";

const Stack = createNativeStackNavigator();

<Stack.Screen
  name="ExpenseDetailsss"
  component={ExpenseDetail}
  options={{ title: "Expense Detailss" }}
/>;
