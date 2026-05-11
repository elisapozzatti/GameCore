import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../pages/Login";
import Home from "../pages/Homepage";
import Register from "../pages/Register";
import { AuthProvider } from "../../context/AuthContext";

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <AuthProvider>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Register" component={Register} />
      </Stack.Navigator>
    </AuthProvider>
  );
}
