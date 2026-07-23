import {
  Text,
  Image,
  FlatList,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import theme from "../theme/theme.js";
import { useEffect, useState } from "react";
import api from "../api/api";
import { useAuth } from "@/context/AuthContext";
import { useNavigation } from "@react-navigation/native";

export default function Forum() {
  const { user, logout } = useAuth();
  const navigation = useNavigation<any>();

  const { width } = Dimensions.get("window");

  const [allUsersGames, setAllUsersGames] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
      api
        .get("/usergame")
        .then((res) => {
          setAllUsersGames(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  return (
    <View
      style={{
        backgroundColor: theme.colors.text,
        flex: 1,
      }}
    >
      <FlatList
        data={allUsersGames}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              margin: 10,
            }}
          >
            <View
              style={{
                backgroundColor: theme.colors.primary,
                borderRadius: 20,
                overflow: "hidden",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Singlegame", {
                    id: item?.game?._id,
                  })
                }
              >
                <Image
                  source={{ uri: item?.game?.coverImage }}
                  style={{
                    width: 250,
                    height: 300,
                    marginTop: 10,
                  }}
                />
              </TouchableOpacity>
              <View
                style={{
                  padding: 20,
                }}
              >
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Singlegame", {
                      id: item?.game?._id,
                    })
                  }
                >
                  <Text
                    style={{
                      color: theme.colors.text,
                      fontSize: 28,
                      fontWeight: "bold",
                    }}
                  >
                    {item?.game?.title}
                  </Text>
                </TouchableOpacity>
                <Text
                  style={{
                    color: theme.colors.secondary,
                    marginTop: 10,
                    fontSize: 20,
                  }}
                >
                  ⭐ {item?.game?.rating?.toFixed(2)}/100
                </Text>

                <Text
                  style={{
                    color: theme.colors.text,
                    marginTop: 10,
                  }}
                >
                  🎮 {item?.hoursPlayed}h giocate
                </Text>

                <Text
                  style={{
                    color: theme.colors.text,
                    marginTop: 10,
                  }}
                >
                  {item?.game?.genres?.join(" • ")}
                </Text>

                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 20,
                    gap: 10,
                  }}
                >
                  <Text
                    style={{
                      color: theme.colors.text,
                      textTransform: "uppercase",
                      fontWeight: "bold",
                    }}
                  >
                    {item?.user?.username}
                  </Text>
                  <Text
                    style={{
                      color: theme.colors.text,
                      fontStyle: "italic",
                    }}
                  >
                    "{item?.notes}"
                  </Text>
                </View>

                <Text
                  style={{
                    color: theme.colors.text,
                    marginTop: 20,
                    lineHeight: 22,
                  }}
                >
                  {item?.game?.summary}
                </Text>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
}
