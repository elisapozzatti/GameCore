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
  const [statusOpen, setStatusOpen] = useState(false);

  const [completion, setCompletion] = useState("");
  const [rating, setRating] = useState("");
  const [inspiration, setInspiration] = useState("");
  const [hours, setHours] = useState("");
  const [favorite, setFavorite] = useState(false);
  const [recommend, setRecommend] = useState(false);
  const [notes, setNotes] = useState("");

  async function handleSearch(value: string) {
    setQuery(value);

    if (value.trim().length < 2) {
      setResults([]);
      return;
    }

    try {
      const res = await api.get(`/games/search/${encodeURIComponent(value)}`);

      setResults(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.log("SEARCH ERROR:", err);
      setResults([]);
    }
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
      completionPercentage: Number(completion),
      personalRating: rating ? Number(rating) : null,
      inspirationLevel: Number(inspiration),
      hoursPlayed: Number(hours),
      isFavorite: favorite ? Number(favorite) : null,
      wouldRecommend: recommend ? Number(recommend) : null,
      notes,
    };

    const res = await api.post(`/usergame/${selectedGame.id}`, payload);

    console.log("GAME SAVED:", res.data);

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
    <View
      style={{
        height: "90%",
        position: "absolute",
        top: "10%",
        left: "5%",
        right: "5%",
        backgroundColor: theme.colors.secondary,
      }}
    >
      {/* AUTOCOMPLETE DROPDOWN */}
      {results.length > 0 && (
        <View
          style={{
            position: "absolute",
            top: 120,
            left: 20,
            right: 20,
            backgroundColor: "white",
            borderRadius: 8,
            borderWidth: 1,
            borderColor: "#ddd",
            zIndex: 9999,
            elevation: 20,
            maxHeight: 200,
          }}
        >
          {results.map((game: any) => (
            <TouchableOpacity
              key={game.id}
              onPress={() => handleSelectGame(game)}
              style={{
                padding: 10,
                borderBottomWidth: 1,
                borderColor: "#eee",
              }}
            >
              <Text>{game.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <ScrollView
        style={{
          padding: 20,
          backgroundColor: theme.colors.secondary,
        }}
      >
        <Text style={{ marginBottom: 8 }}>
          Aggiungi un gioco alla tua collezione
        </Text>

        {/* SEARCH */}
        <TextInput
          placeholder="Cerca un gioco..."
          value={query}
          onChangeText={handleSearch}
          style={{
            padding: 10,
            borderWidth: 1,
            borderRadius: 6,
            marginBottom: 10,
            backgroundColor: "white",
          }}
        />

        {/* STATUS DROPDOWN */}
        <Text style={{ marginTop: 20 }}>Stato del gioco</Text>

        <Pressable
          onPress={() => setStatusOpen(!statusOpen)}
          style={{
            padding: 10,
            borderWidth: 1,
            borderRadius: 6,
            marginTop: 10,
            backgroundColor: "white",
          }}
        >
          <Text>{status}</Text>
        </Pressable>

        {statusOpen && (
          <View
            style={{
              borderWidth: 1,
              borderColor: "#ddd",
              borderRadius: 6,
              backgroundColor: "white",
              marginTop: 5,
            }}
          >
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
                onPress={() => {
                  setStatus(s);
                  setStatusOpen(false);
                }}
                style={{
                  padding: 10,
                  borderBottomWidth: 1,
                  borderColor: "#eee",
                }}
              >
                <Text
                  style={{
                    color: status === s ? theme.colors.primary : "black",
                  }}
                >
                  {s}
                </Text>
              </Pressable>
            ))}
          </View>
        )}

        {/* INPUTS */}
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

        {/* SWITCHES */}
        <View style={{ marginTop: 20 }}>
          <Text>Gioco preferito?</Text>
          <Switch value={favorite} onValueChange={setFavorite} />
        </View>

        <View style={{ marginTop: 10 }}>
          <Text>Lo consiglieresti?</Text>
          <Switch value={recommend} onValueChange={setRecommend} />
        </View>

        {/* NOTES */}
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
            backgroundColor: "white",
          }}
        />

        {/* SUBMIT */}
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
    </View>
  );
}
