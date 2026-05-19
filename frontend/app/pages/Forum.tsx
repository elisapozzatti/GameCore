import { View, Text, Image } from "react-native";
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
    <View
      style={{
        flexDirection: "column",
        gap: 10,
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      {allUsersGames.map((item: any) => (
        <View
          key={item.id}
          style={{ flexDirection: "column", gap: 10, alignItems: "center" }}
        >
          <Image
            source={{ uri: item?.game?.coverImage }}
            style={{ width: 200, height: 200 }}
          />
          <Text>{item?.user?.username}</Text>
          <Text>{item?.game?.genres}</Text>
        </View>
      ))}
    </View>
  );
}
