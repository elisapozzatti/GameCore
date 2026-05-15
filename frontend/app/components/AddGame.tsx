import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  Switch,
  ScrollView,
} from "react-native";
import theme from "../theme/theme.js";
import api from "../api/api";

export default function AddGame() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [selectedGame, setSelectedGame] = useState<any>(null);

  const [status, setStatus] = useState("wishlist");
  const [completion, setCompletion] = useState("");
  const [rating, setRating] = useState("");
  const [inspiration, setInspiration] = useState("");
  const [hours, setHours] = useState("");
  const [favorite, setFavorite] = useState(false);
  const [recommend, setRecommend] = useState(false);
  const [notes, setNotes] = useState("");

  async function handleSearch(value: string) {
    console.log("SEARCH:", value);
    setQuery(value);

    if (value.trim().length < 2) {
      setResults([]);
      return;
    }

    const res = api
      .get(`/games/search?q=${encodeURIComponent(value)}`)
      .then((res) => {
        setResults(res.data);
      });
  }

  function handleSelectGame(game: any) {
    setSelectedGame(game);
    setQuery(game.name);
    setResults([]);
  }

  async function handleSubmit() {
    if (!selectedGame) return;

    const payload = {
      igdbId: selectedGame.id,
      name: selectedGame.name,
      status,
      completion: Number(completion),
      rating: rating ? Number(rating) : null,
      inspiration: Number(inspiration),
      hours: Number(hours),
      favorite,
      recommend,
      notes,
    };

    await fetch("/api/user/games", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    //reset
    setQuery("");
    setSelectedGame(null);
    setResults([]);
    setCompletion("");
    setRating("");
    setInspiration("");
    setHours("");
    setFavorite(false);
    setRecommend(false);
    setNotes("");
  }

  return (
    <ScrollView
      style={{
        padding: 20,
        backgroundColor: theme.colors.secondary,
        borderRadius: 10,
        position: "absolute",
        top: "10%",
        left: "5%",
        right: "5%",
        zIndex: 10,
        height: "90%",
      }}
    >
      {/*ricerca del nome del gioco*/}
      <Text style={{ marginBottom: 8 }}>
        Aggiungi un gioco alla tua collezione
      </Text>

      <TextInput
        placeholder="Cerca un gioco..."
        value={query}
        onChangeText={handleSearch}
        style={{
          padding: 10,
          borderWidth: 1,
          borderRadius: 6,
          marginBottom: 10,
        }}
      />

      {results.map((game: any) => (
        <TouchableOpacity
          key={game.id}
          onPress={() => handleSelectGame(game)}
          style={{
            padding: 10,
            borderBottomWidth: 1,
          }}
        >
          <Text>{game.name}</Text>
        </TouchableOpacity>
      ))}

      {/*status*/}
      <Text style={{ marginTop: 20 }}>Stato del gioco</Text>

      {[
        "wishlist",
        "playing",
        "paused",
        "completed",
        "dropped",
        "replaying",
      ].map((s) => (
        <Pressable
          key={s}
          onPress={() => setStatus(s)}
          style={{
            padding: 8,
            marginVertical: 2,
            backgroundColor:
              status === s ? theme.colors.primary : "transparent",
          }}
        >
          <Text style={{ color: status === s ? "white" : "black" }}>{s}</Text>
        </Pressable>
      ))}

      {/*inputs*/}
      <Text style={{ marginTop: 20 }}>Percentuale completamento</Text>
      <TextInput
        keyboardType="numeric"
        value={completion}
        onChangeText={setCompletion}
        style={{ borderWidth: 1, padding: 8 }}
      />

      <Text style={{ marginTop: 20 }}>Valutazione (0-10)</Text>
      <TextInput
        keyboardType="numeric"
        value={rating}
        onChangeText={setRating}
        style={{ borderWidth: 1, padding: 8 }}
      />

      <Text style={{ marginTop: 20 }}>Ispirazione (0-10)</Text>
      <TextInput
        keyboardType="numeric"
        value={inspiration}
        onChangeText={setInspiration}
        style={{ borderWidth: 1, padding: 8 }}
      />

      <Text style={{ marginTop: 20 }}>Ore giocate</Text>
      <TextInput
        keyboardType="numeric"
        value={hours}
        onChangeText={setHours}
        style={{ borderWidth: 1, padding: 8 }}
      />

      {/*gioco preferito e se lo consigli (switch) */}
      <View style={{ marginTop: 20 }}>
        <Text>Gioco preferito?</Text>
        <Switch value={favorite} onValueChange={setFavorite} />
      </View>

      <View style={{ marginTop: 10 }}>
        <Text>Lo consiglieresti?</Text>
        <Switch value={recommend} onValueChange={setRecommend} />
      </View>

      {/*note*/}
      <Text style={{ marginTop: 20 }}>Note personali</Text>
      <TextInput
        multiline
        value={notes}
        onChangeText={setNotes}
        style={{
          borderWidth: 1,
          padding: 10,
          height: 100,
          marginBottom: 20,
        }}
      />

      {/*bottone aggiungi gioco*/}
      <Pressable
        onPress={handleSubmit}
        style={{
          backgroundColor: theme.colors.primary,
          padding: 15,
          borderRadius: 8,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>
          Aggiungi gioco
        </Text>
      </Pressable>
    </ScrollView>
  );
}
