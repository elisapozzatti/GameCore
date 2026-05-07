import { Text, View, Image } from "react-native";
import theme from "./theme/theme.js";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.colors.background,
      }}
    >
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme.colors.primary,
        }}
      >
        <Text
          style={{
            color: theme.colors.text,
          }}
        >
          Edit app/index.tsx to edit this screen.
        </Text>
        <Text>Ciao Mondo</Text>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Image
          source={require("../assets/images/logo.svg")}
          style={{ width: 400, height: 400 }}
        />
        <Image
          source={require("../assets/images/nosfondo.png")}
          style={{ width: 400, height: 400 }}
        />
        <Image
          source={require("../assets/images/4.png")}
          style={{ width: 400, height: 400 }}
        />
      </View>
    </View>
  );
}
