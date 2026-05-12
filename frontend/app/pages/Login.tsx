import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
} from "react-native";
import theme from "../theme/theme";

import api from "../api/api";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const navigation = useNavigation();

  const { login: authLogin, user } = useAuth();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [focused, setFocused] = useState(false);

  const handleLogin = async () => {
    try {
      const res = await api.post("http://localhost:3000/login", {
        username,
        email,
        password,
      });

      authLogin(res.data.token);

      navigation.navigate("Home" as never);
    } catch (err) {
      console.error(err);

      Alert.alert("Errore", "Login fallito");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        placeholder="username"
        value={username}
        onChangeText={setUsername}
        style={[styles.input, focused && styles.inputActive]}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />

      <TextInput
        placeholder="email"
        value={email}
        onChangeText={setEmail}
        style={[styles.input, focused && styles.inputActive]}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />

      <TextInput
        placeholder="password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={[styles.input, focused && styles.inputActive]}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />

      <Pressable style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Accedi</Text>
      </Pressable>

      <Pressable onPress={() => navigation.navigate("Register" as never)}>
        <Text style={styles.link}>Registrati</Text>
      </Pressable>
    </View>
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
