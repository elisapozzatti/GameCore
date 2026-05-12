import React, { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  Pressable,
  Alert,
  StyleSheet,
} from "react-native";
import api from "../api/api";
import { useNavigation } from "@react-navigation/native";
import theme from "../theme/theme";

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
      <Text style={styles.title}>Registrazione</Text>

      <TextInput
        placeholder="username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />

      <TextInput
        placeholder="email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />

      <TextInput
        placeholder="password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <Pressable style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrati</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    gap: 12,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: theme.colors.primary,
  },

  input: {
    borderWidth: 1,
    borderColor: theme.colors.primary,
    padding: 12,
    borderRadius: 8,
    color: theme.colors.primary,
  },

  inputActive: {
    borderWidth: 1,
    borderColor: theme.colors.secondary,
    padding: 12,
    borderRadius: 8,
    color: theme.colors.secondary,
  },

  button: {
    backgroundColor: theme.colors.primary,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
  },

  link: {
    color: theme.colors.primary,
    textAlign: "center",
  },
});
