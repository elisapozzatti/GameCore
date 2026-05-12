import { Text, View, Image, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import theme from "../theme/theme";
import Header from "../components/Header";
import api from "../api/api";
import { useAuth } from "../../context/AuthContext";

export default function Homepage() {
  const { user, logout } = useAuth();
  const [sessionCompleted, setSessionCompleted] = useState<any>([]);
  const [sessionActive, setSessionActive] = useState<any>([]);
  const [prefer, setPrefer] = useState<any>({});
  const [hours, setHours] = useState<number>(0);
  const [allGames, setAllGames] = useState<any>([]);

  useEffect(() => {
    if (user) {
      api
        .get(`http://localhost:3000/usergame/complete/${user.id}`)
        .then((res) => {
          setSessionCompleted(res.data);
        })
        .catch((err) => console.log(err));
      api
        .get(`http://localhost:3000/usergame/play/${user.id}`)
        .then((res) => {
          setSessionActive(res.data);
        })
        .catch((err) => console.log(err));
      api
        .get(`http://localhost:3000/usergame/prefer/${user.id}`)
        .then((res) => {
          setPrefer(res.data);
        })
        .catch((err) => console.log(err));
      api
        .get<number>(`http://localhost:3000/usergame/hours/${user.id}`)
        .then((res) => {
          setHours(res.data);
        })
        .catch((err) => console.log(err));
      api
        .get(`http://localhost:3000/usergame/${user.id}`)
        .then((res) => {
          setAllGames(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: theme.colors.background,
      }}
    >
      <Header />
      <View
        style={{
          flexDirection: "row",
          gap: 10,
          marginBottom: 10,
          width: "100%",
          padding: 10,
        }}
      >
        <ScrollView
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center",
            gap: 10,
          }}
          style={{
            backgroundColor: theme.colors.card,
            width: "30%",
            height: 100,
            borderRadius: 10,
          }}
        >
          {sessionCompleted.map((item: any, index: any) => (
            <Image
              source={{ uri: item?.game?.coverImage }}
              style={{ width: 80, height: 80 }}
            />
          ))}
        </ScrollView>

        <ScrollView
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center",
            gap: 10,
          }}
          style={{
            backgroundColor: theme.colors.card,
            width: "30%",
            height: 100,
            borderRadius: 10,
          }}
        >
          {sessionActive.map((item: any, index: any) => (
            <View
              style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
            >
              <Image
                source={{ uri: item?.game?.coverImage }}
                style={{ width: 80, height: 80 }}
              />
              <View
                style={{
                  width: "80%",
                  backgroundColor: theme.colors.text,
                  borderRadius: 5,
                }}
              >
                <View
                  style={{
                    backgroundColor: theme.colors.primary,
                    width: `${item.completionPercentage}%`,
                    height: 10,
                    borderRadius: 5,
                  }}
                />
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
      <View
        style={{
          flexDirection: "row",
          gap: 10,
          marginBottom: 10,
          width: "100%",
          padding: 10,
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            backgroundColor: theme.colors.card,
            width: "67%",
            height: 100,
            borderRadius: 10,
            gap: 10,
          }}
        >
          <Image
            source={{ uri: prefer?.game?.coverImage }}
            style={{ width: 100, height: 100 }}
          />
          <View>
            <Text style={{ color: theme.colors.text }}>
              {prefer?.game?.title}
            </Text>
            <Text style={{ color: theme.colors.text }}>
              {prefer?._doc?.hoursPlayed}h
            </Text>
          </View>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: theme.colors.card,
            width: "30%",
            height: 100,
            borderRadius: 10,
          }}
        >
          <Text
            style={{
              color: theme.colors.text,
            }}
          >
            {hours}h totali giocate
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          gap: 10,
          width: "100%",
          padding: 10,
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: theme.colors.card,
            width: "30%",
            height: 100,
            borderRadius: 10,
          }}
        >
          <Text
            style={{
              color: theme.colors.text,
            }}
          >
            ?
          </Text>
        </View>
        <ScrollView
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center",
            gap: 10,
          }}
          style={{
            backgroundColor: theme.colors.card,
            width: "70%",
            height: 100,
            borderRadius: 10,
          }}
        >
          {allGames.map((item: any, index: any) => (
            <Image
              source={{ uri: item?.game?.coverImage }}
              style={{ width: 80, height: 80 }}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
}
