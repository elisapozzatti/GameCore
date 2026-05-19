import { View, Text, Pressable } from "react-native";
import theme from "../theme/theme.js";

export default function Message({ message, type, setMessage }: any) {
  return (
    <View
      style={{
        backgroundColor: theme.colors.text,
        borderRadius: 5,
        height: 100,
      }}
    >
      <View
        style={{
          backgroundColor: type === "error" ? "red" : "green",
          height: 30,
          flexDirection: "row",
        }}
      >
        <Text
          style={{
            color: theme.colors.text,
            fontWeight: "bold",
            padding: 5,
          }}
        >
          {type === "error" ? "Errore" : "Successo"}
        </Text>
        <Pressable onPress={setMessage}>
          <Text
            style={{
              color: theme.colors.text,
              fontWeight: "bold",
              padding: 5,
              marginLeft: "auto",
              marginRight: 5,
            }}
          >
            X
          </Text>
        </Pressable>
      </View>
      <Text
        style={{
          padding: 10,
        }}
      >
        {message}
      </Text>
    </View>
  );
}
