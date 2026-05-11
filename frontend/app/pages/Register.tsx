import React, { useState } from "react";
import { ScrollView, Text, TextInput, Pressable, Alert } from "react-native";
import api from "../api/api";
import { useNavigation } from "@react-navigation/native";

export default function Register() {
  const navigation = useNavigation();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      await api.post("http://localhost:3000/register", {
        username: username,
        email,
        password: password,
      });

      navigation.navigate("Login" as never);
    } catch (err) {
      console.error(err);

      Alert.alert("Errore", "Registrazione fallita");
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{
        padding: 20,
        gap: 12,
      }}
    >
      <Text>Registrazione</Text>

      <TextInput
        placeholder="username"
        value={username}
        onChangeText={setUsername}
      />

      <TextInput placeholder="email" value={email} onChangeText={setEmail} />

      <TextInput
        placeholder="password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Pressable onPress={handleRegister}>
        <Text>Registrati</Text>
      </Pressable>
    </ScrollView>
  );
}
