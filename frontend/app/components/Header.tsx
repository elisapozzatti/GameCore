import { Text, View, Image } from "react-native";
import theme from "../theme/theme.js";
import { useFonts } from "expo-font";

export default function Header() {
  useFonts({
    Audiowide: require("../../assets/fonts/Audiowide-Regular.ttf"),
    Oxanium: require("../../assets/fonts/Oxanium-Regular.ttf"),
    Asimovian: require("../../assets/fonts/Asimovian-Regular.ttf"),
  });
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        height: 60,
        backgroundColor: theme.colors.background,
        padding: 10,
        marginBottom: 5,
      }}
    >
      <Image
        source={require("../../assets/images/logo.webp")}
        style={{ width: 50, height: 50 }}
      />
      <Text
        style={{
          fontSize: theme.fontSize.title,
          color: theme.colors.primary,
          fontWeight: "bold",
          fontFamily: theme.fontFamily.as,
        }}
      >
        GameCore
      </Text>
    </View>
  );
}
