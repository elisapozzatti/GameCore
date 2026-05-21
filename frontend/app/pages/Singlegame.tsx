import { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import Svg, { Text as SvgText } from "react-native-svg";
import api from "../api/api";
import { useAuth } from "@/context/AuthContext";
import theme from "../theme/theme";

export default function Singlegame({ route }: any) {
  const { user } = useAuth();
  const { id } = route.params;

  const [game, setGame] = useState<any>();

  useEffect(() => {
    if (user) {
      api
        .get(`/usergame/single/${id}`)
        .then((res) => setGame(res.data))
        .catch((err) => console.log(err));
    }
  }, [user, id]);

  const title = game?.game?.title ?? "";
  const genres = game?.game?.genres.join(", ") ?? "";
  const notes = game?.notes ?? "";

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      {/*1 cerchio*/}
      <View
        style={{
          width: 380,
          height: 380,
          borderRadius: 190,
          backgroundColor: theme.colors.primary,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/*titolo curvo*/}
        <Svg width={380} height={380} style={{ position: "absolute" }}>
          {title.split("").map((char: string, i: number) => {
            const angle = (i / title.length) * 180 - 90;

            return (
              <SvgText
                key={i}
                x={190}
                y={190}
                fill="white"
                fontSize="14"
                transform={`rotate(${angle} 190 190) translate(0 -170)`}
                textAnchor="middle"
              >
                {char}
              </SvgText>
            );
          })}
        </Svg>

        {/*2 cerchio*/}
        <View
          style={{
            width: 310,
            height: 310,
            borderRadius: 155,
            backgroundColor: theme.colors.secondary,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/*generi curvo*/}
          <Svg width={310} height={310} style={{ position: "absolute" }}>
            {genres.split("").map((char: string, i: number) => {
              const angle = (i / genres.length) * 140 - 70;

              return (
                <SvgText
                  key={i}
                  x={155}
                  y={155}
                  fill="white"
                  fontSize="14"
                  transform={`rotate(${angle} 155 155) translate(0 -135)`}
                  textAnchor="middle"
                >
                  {char}
                </SvgText>
              );
            })}
          </Svg>
          {/*3 cerchio*/}
          <View
            style={{
              width: 240,
              height: 240,
              borderRadius: 120,
              flexDirection: "row",
              gap: 10,
              backgroundColor: theme.colors.primary,
              justifyContent: "center",
              alignItems: "center",
              padding: 10,
            }}
          >
            <Image
              style={{ width: 120, height: 120 }}
              source={{ uri: game?.game?.coverImage }}
            />

            <View>
              <Text style={{ color: theme.colors.text }}>{game?.status}</Text>
              <Text style={{ color: theme.colors.text }}>
                {game?.completionPercentage}
              </Text>
              <Text style={{ color: theme.colors.text }}>
                {game?.hoursPlayed}
              </Text>
              <Text style={{ color: theme.colors.text }}>
                {game?.wouldRecommend}
              </Text>
            </View>
          </View>
        </View>

        {/*note curvo*/}
        <Svg width={380} height={380} style={{ position: "absolute" }}>
          {notes.split("").map((char: string, i: number) => {
            const angle = 70 - (i / notes.length) * 150;

            return (
              <SvgText
                key={i}
                x={190}
                y={190}
                fill="white"
                fontSize="14"
                transform={`rotate(${angle} 190 190) translate(0 170)`}
                textAnchor="middle"
              >
                {char}
              </SvgText>
            );
          })}
        </Svg>
      </View>
    </View>
  );
}
