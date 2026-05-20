import { Text, Image, FlatList, View, Dimensions } from "react-native";
import theme from "../theme/theme.js";
import { useEffect, useState } from "react";
import api from "../api/api";
import { useAuth } from "@/context/AuthContext";

export default function Forum() {
  const { user, logout } = useAuth();

  const { width, height } = Dimensions.get("window");

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
      }}
    >
      <FlatList
        data={allUsersGames}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              width,
              height: height - 150,
            }}
          >
            <View
              style={{
                backgroundColor: theme.colors.primary,
                borderRadius: 20,
                width,
                height: height - 150,
                overflow: "hidden",
              }}
            >
              <Image
                source={{ uri: item?.game?.coverImage }}
                style={{
                  width: "100%",
                  height: 300,
                }}
              />

              <View
                style={{
                  padding: 20,
                }}
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
