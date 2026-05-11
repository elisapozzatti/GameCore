import { Text, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import theme from "../theme/theme";
import Header from "../components/Header";
import api from "../api/api";
import { useAuth } from "../../context/AuthContext";

export default function Homepage() {
  const { user, logout } = useAuth();
  const [sessionCompleted, setSessionCompleted] = useState<number>(0);
  const [sessionActive, setSessionActive] = useState<any>([]);

  useEffect(() => {
    if (user) {
      api
        .get<number>(`http://localhost:3000/usergame/complete/${user.id}`)
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
    }
  }, [user]);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: theme.colors.background2,
      }}
    >
      <Header />
      <View
        style={{
          flexDirection: "row",
          gap: 10,
          marginBottom: 10,
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: theme.colors.card,
            flex: 30,
            height: 20,
            borderRadius: 10,
          }}
        >
          <Text
            style={{
              color: theme.colors.text,
            }}
          >
            {sessionCompleted}
          </Text>
        </View>
        {sessionActive.map((item: any, index: any) => (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: theme.colors.card,
              flex: 70,
              height: 100,
              borderRadius: 10,
              overflowY: "scroll",
            }}
          >
            <Text key={index} style={{ color: theme.colors.text }}>
              {item.completionPercentage}%
            </Text>
            <Text key={index} style={{ color: theme.colors.text }}>
              {item.inspirationLevel}/10
            </Text>
            <Text key={index} style={{ color: theme.colors.text }}>
              {item.hoursPlayed}h
            </Text>
          </View>
        ))}
      </View>
      <View
        style={{
          flexDirection: "row",
          gap: 10,
          marginBottom: 10,
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: theme.colors.card,
            flex: 7,
            borderRadius: 10,
          }}
        >
          <Text
            style={{
              color: theme.colors.text,
            }}
          >
            gioco preferito
          </Text>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: theme.colors.card,
            flex: 3,
            borderRadius: 10,
          }}
        >
          <Text
            style={{
              color: theme.colors.text,
            }}
          >
            ore totali giocate
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          gap: 10,
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: theme.colors.card,
            flex: 3,
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
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: theme.colors.card,
            flex: 7,
            borderRadius: 10,
          }}
        >
          <Text
            style={{
              color: theme.colors.text,
            }}
          >
            tutti i miei giochi
          </Text>
        </View>
      </View>
    </View>
  );
}
