import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import api from "../../api/api";
import { useAuth } from "@/context/AuthContext";
import { useLocalSearchParams } from "expo-router";

export default function Singlegame() {
  const { user, logout } = useAuth();
  const { id } = useLocalSearchParams();

  const [game, setGame] = useState<any>();

  useEffect(() => {
    if (user) {
      api
        .get(`/usergame/single/${id}`)
        .then((res) => {
          setGame(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  return (
    <View>
      <Text>{game?.game?.title}</Text>
    </View>
  );
}
