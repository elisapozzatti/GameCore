import { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import { useAuth } from "../../context/AuthContext";
import api from "../api/api";

export default function Games({ route }: any) {
  const { user, logout } = useAuth();

  const [sessionCompleted, setSessionCompleted] = useState([]);
  const [AllGames, setAllGames] = useState([]);

  const screen = route.params;

  useEffect(() => {
    if (user) {
      api
        .get(`/usergame/complete/${user.id}`)
        .then((res) => {
          setSessionCompleted(res.data);
        })
        .catch((err) => console.log(err));
      api
        .get(`/usergame/${user.id}`)
        .then((res) => {
          setAllGames(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  return screen === "Completedgames" ? (
    <View
      style={{
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      {sessionCompleted.map((item: any, index: any) => (
        <Image
          source={{ uri: item?.game?.coverImage }}
          style={{
            width: 100,
            height: 100,
            marginTop: 10,
            marginBottom: 10,
          }}
        />
      ))}
    </View>
  ) : (
    <View
      style={{
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      {AllGames.map((item: any, index: any) => (
        <Image
          source={{ uri: item?.game?.coverImage }}
          style={{
            width: 100,
            height: 100,
            marginTop: 10,
            marginBottom: 10,
          }}
        />
      ))}
    </View>
  );
}
