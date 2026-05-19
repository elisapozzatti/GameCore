import { Text, View, Image, ScrollView, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import theme from "../theme/theme";
import Header from "../components/Header";
import api from "../api/api";
import { useAuth } from "../../context/AuthContext";
import Footer from "../components/Footer";
import AddGame from "../components/AddGame";

export default function Homepage() {
  const { user, logout } = useAuth();
  const [sessionCompleted, setSessionCompleted] = useState<any>([]);
  const [sessionActive, setSessionActive] = useState<any>([]);
  const [prefer, setPrefer] = useState<any>({});
  const [hours, setHours] = useState<number>(0);
  const [allGames, setAllGames] = useState<any>([]);
  const [addGame, setAddGame] = useState(false);

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    if (!user) return;
    try {
      api
        .get(`/usergame/complete/${user.id}`)
        .then((res) => {
          setSessionCompleted(res.data);
        })
        .catch((err) => console.log(err));
      api
        .get(`/usergame/play/${user.id}`)
        .then((res) => {
          setSessionActive(res.data);
        })
        .catch((err) => console.log(err));
      api
        .get(`/usergame/prefer/${user.id}`)
        .then((res) => {
          setPrefer(res.data);
        })
        .catch((err) => console.log(err));
      api
        .get<number>(`/usergame/hours/${user.id}`)
        .then((res) => {
          setHours(res.data);
        })
        .catch((err) => console.log(err));
      api
        .get(`/usergame/${user.id}`)
        .then((res) => {
          setAllGames(res.data);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log("Errore nel recupero dei dati:", err);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: theme.colors.background,
      }}
    >
      <Header />
      {/*prima riga con giochi completati*/}
      <View
        style={{
          backgroundColor: theme.colors.card,
          width: "95%",
          height: 100,
          borderRadius: 10,
          marginBottom: 10,
          justifyContent: "center",
          alignItems: "center",
          gap: 10,
          flexDirection: "column",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
            width: "95%",
          }}
        >
          <View
            style={{
              backgroundColor: theme.colors.secondary,
              padding: 5,
              borderRadius: 5,
              alignItems: "center",
            }}
          >
            <Image
              source={require("../../assets/images/checklist.webp")}
              style={{ width: 15, height: 15 }}
            />
          </View>
          <Text
            style={{
              color: theme.colors.text,
              fontFamily: theme.fontFamily.ox,
            }}
          >
            GIOCHI COMPLETATI
          </Text>
          <Text
            style={{
              backgroundColor: theme.colors.secondary,
              color: theme.colors.text,
              padding: 5,
              borderRadius: 5,
              fontFamily: theme.fontFamily.ox,
              marginLeft: "auto",
            }}
          >
            + altri 3
          </Text>
        </View>
        <View style={{ flexDirection: "row", gap: 10 }}>
          {sessionCompleted.map((item: any, index: any) => (
            <Image
              key={index}
              source={{ uri: item?.game?.coverImage }}
              style={{ width: 50, height: 50 }}
            />
          ))}
        </View>
      </View>
      {/*seconda riga con i giochi in corso*/}
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          backgroundColor: theme.colors.card,
          width: "95%",
          height: 100,
          borderRadius: 10,
          marginBottom: 10,
        }}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
          gap: 10,
        }}
      >
        <View
          style={{
            flexDirection: "column",
            gap: 10,
            alignItems: "center",
            padding: 10,
            width: "95%",
            height: 100,
          }}
        >
          {sessionActive.map((item: any, index: any) => (
            <View
              key={index}
              style={{
                flexDirection: "row",
                gap: 10,
                alignItems: "center",
                backgroundColor: theme.colors.secondary,
                padding: 5,
                borderRadius: 5,
                width: "100%",
              }}
            >
              <Image
                source={{ uri: item?.game?.coverImage }}
                style={{ width: 70, height: 70 }}
              />
              <View style={{ gap: 5 }}>
                <Text
                  style={{
                    color: theme.colors.text,
                    width: "95%",
                  }}
                >
                  {item?.game?.title}
                </Text>
                <View
                  style={{ flexDirection: "row", gap: 5, alignItems: "center" }}
                >
                  <View
                    style={{
                      width: "40%",
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
                        alignItems: "flex-end",
                        justifyContent: "center",
                        paddingRight: 5,
                      }}
                    ></View>
                  </View>
                  <Text style={{ color: theme.colors.text, fontSize: 12 }}>
                    {item.completionPercentage}%
                  </Text>
                </View>
                <Text style={{ color: theme.colors.text, fontSize: 12 }}>
                  Tempo di gioco: {item.hoursPlayed}h
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      {/*terza riga con il gioco preferito*/}
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          backgroundColor: theme.colors.card,
          width: "95%",
          height: 100,
          borderRadius: 10,
          gap: 10,
          marginBottom: 5,
          padding: 10,
        }}
      >
        <Image
          source={{ uri: prefer?.game?.coverImage }}
          style={{ width: 80, height: 80 }}
        />
        <View
          style={{
            flexDirection: "row",
            gap: 5,
            alignItems: "center",
            backgroundColor: theme.colors.gold,
            padding: 3,
            borderRadius: 10,
            position: "absolute",
            right: 5,
            top: 5,
          }}
        >
          <Text style={{ color: theme.colors.text, fontSize: 12 }}>
            PREFERITO
          </Text>
          <Image
            source={require("../../assets/images/star.webp")}
            style={{ width: 15, height: 15 }}
          />
        </View>
        <View>
          <Text
            style={{
              color: theme.colors.text,
            }}
          >
            {prefer?.game?.title}
          </Text>
          {prefer?._doc?.hoursPlayed != null && (
            <Text style={{ color: theme.colors.text }}>
              {prefer?._doc?.hoursPlayed}h giocate
            </Text>
          )}
        </View>
      </View>
      {/*4 riga con ore giocate e tutti i giochi*/}
      <View
        style={{
          flexDirection: "row",
          gap: 10,
          width: "95%",
          padding: 10,
          boxSizing: "border-box",
          margin: 0,
          height: 100,
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: theme.colors.card,
            width: "50%",
            height: 100,
            borderRadius: 10,
          }}
        >
          <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
            <Image source={require("../../assets/images/clock.webp")} />
            <Text
              style={{
                color: theme.colors.text,
                fontSize: theme.fontSize.lg,
                fontWeight: "bold",
              }}
            >
              {hours}h
            </Text>
          </View>
          <Text
            style={{
              color: theme.colors.text,
            }}
          >
            ore totali giocate
          </Text>
        </View>
        <View
          style={{
            backgroundColor: theme.colors.card,
            width: "50%",
            height: 100,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
            gap: 10,
            flexDirection: "row",
          }}
        >
          {allGames.map((item: any, index: any) => (
            <Image
              source={{ uri: item?.game?.coverImage }}
              style={{ width: 50, height: 50, marginTop: 20 }}
            />
          ))}
          <Text
            style={{
              backgroundColor: theme.colors.secondary,
              color: theme.colors.text,
              padding: 5,
              borderRadius: 5,
              fontFamily: theme.fontFamily.ox,
              position: "absolute",
              right: 5,
              top: 5,
            }}
          >
            Vedi tutti
          </Text>
        </View>
      </View>
      {/*quinta riga con bottone per aggiungere gioco*/}
      <View
        style={{
          width: "95%",
          padding: 10,
          borderRadius: 10,
          height: 70,
        }}
      >
        <Text
          style={{
            color: theme.colors.text,
            backgroundColor: theme.colors.secondary,
            fontSize: theme.fontSize.xl,
            fontWeight: "bold",
            marginLeft: "auto",
            padding: 5,
            borderRadius: 5,
            aspectRatio: 1,
            textAlign: "center",
          }}
          onPress={() => setAddGame(true)}
        >
          +
        </Text>
      </View>
      <Footer />
      {addGame && <AddGame fetchData={fetchData} setAddGame={setAddGame} />}
    </View>
  );
}
