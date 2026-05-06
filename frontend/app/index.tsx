import { Text, View, Image } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <Text>Ciao Mondo</Text>
      <Image
        source={require("../assets/images/1.png")}
        style={{ width: 150, height: 150 }}
      />
    </View>
  );
}
