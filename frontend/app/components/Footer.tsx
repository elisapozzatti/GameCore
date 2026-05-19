import { Text, View, Image, Pressable } from "react-native";
import theme from "../theme/theme.js";
import { useNavigation } from "@react-navigation/native";

export default function Footer() {
  const navigation = useNavigation();

  return (
    <View
      style={{
        backgroundColor: theme.colors.card,
        padding: 10,
        borderRadius: 10,
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 50,
        height: 80,
      }}
    >
      <Pressable onPress={() => navigation.navigate("Register" as never)}>
        <Image
          source={require("../../assets/images/group.webp")}
          style={{ width: 50, height: 50 }}
        />
      </Pressable>
      <Pressable onPress={() => navigation.navigate("Home" as never)}>
        <Image
          source={require("../../assets/images/dashboard.webp")}
          style={{ width: 40, height: 40 }}
        />
      </Pressable>
    </View>
  );
}
