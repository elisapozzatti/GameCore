import { Text, Image, ScrollView, View } from "react-native";
import theme from "../theme/theme.js";
import { useEffect, useState } from "react";
import api from "../api/api";
import { useAuth } from "@/context/AuthContext";

export default function Forum() {
  const { user, logout } = useAuth();

  const [allUsersGames, setAllUsersGames] = useState([]);

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
    <ScrollView
      style={{
        flexDirection: "column",
        gap: 10,
        width: "100%",
        padding: 10,
      }}
      contentContainerStyle={{
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap",
      }}
    >
      {allUsersGames.map((item: any) => (
        <View
          style={{
            marginBottom: 10,
            backgroundColor: theme.colors.primary,
            padding: 10,
            flexDirection: "row",
            gap: 10,
            borderRadius: 10,
            width: "95%",
          }}
        >
          <View
            key={item._id}
            style={{
              flexDirection: "column",
              gap: 5,
            }}
          >
            <Image
              source={{ uri: item?.game?.coverImage }}
              style={{ width: 150, height: 150 }}
            />
            <Text
              style={{
                color: theme.colors.text,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              {item?.user?.username}
            </Text>
          </View>
          <View style={{ flexDirection: "column", gap: 5, width: "100%" }}>
            <Text
              style={{
                color: theme.colors.text,
                backgroundColor: theme.colors.card,
                width: "9%",
                padding: 5,
                borderRadius: 5,
              }}
            >
              Completato: {item?.completionPercentage}%
            </Text>
            <Text
              style={{
                color: theme.colors.text,
                padding: 5,
              }}
            >
              Ore giocate: {item?.hoursPlayed}h
            </Text>
            <Text
              style={{
                color: theme.colors.text,
                backgroundColor: theme.colors.card,
                width: "auto",
                maxWidth: "88%",
                padding: 5,
                borderRadius: 5,
              }}
            >
              Generi: {item?.game?.genres?.join(", ")}
            </Text>
            <Text
              style={{
                color: theme.colors.text,
                padding: 5,
              }}
            >
              {item?.game?.wouldRecommend ? "Non Consigliato" : "Consigliato"}
            </Text>
            <Text
              style={{
                color: theme.colors.text,
                backgroundColor: theme.colors.card,
                width: "5.5%",
                padding: 5,
                borderRadius: 5,
              }}
            >
              {item?.game?.rating?.toFixed(2)}/100
            </Text>
            <Text
              style={{
                color: theme.colors.text,
                padding: 5,
              }}
            >
              Note: {item?.notes}
            </Text>
            <Text
              style={{
                color: theme.colors.text,
                backgroundColor: theme.colors.card,
                padding: 5,
                width: "88%",
                borderRadius: 5,
              }}
            >
              {item?.game?.summary}
            </Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}
