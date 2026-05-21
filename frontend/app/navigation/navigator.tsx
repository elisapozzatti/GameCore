import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../pages/Login";
import Home from "../pages/Homepage";
import Register from "../pages/Register";
import Games from "../pages/Games";
import Forum from "../pages/Forum";
import Singlegame from "../pages/Singlegame/[id]";
import { AuthProvider } from "../../context/AuthContext";

const Stack = createNativeStackNavigator();
const GamesStack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <AuthProvider>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Games" component={Games} />
        <Stack.Screen name="Forum" component={Forum} />
        <Stack.Screen name="Singlegame" component={Singlegame} />
      </Stack.Navigator>
    </AuthProvider>
  );
}
