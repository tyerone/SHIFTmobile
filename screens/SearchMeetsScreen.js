import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Pressable,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";

const SUGGESTED = [
  { id: "nearby", title: "Nearby", subtitle: "Find what's around you" },
  {
    id: "richmond1",
    title: "Richmond, British Columbia",
    subtitle: "Most popular meet location near you",
  },
  {
    id: "richmond2",
    title: "Richmond, British Columbia",
    subtitle: "Most popular meet location near you",
  },
  {
    id: "richmond3",
    title: "Richmond, British Columbia",
    subtitle: "Most popular meet location near you",
  },
];

export default function SearchMeetsScreen({ navigation }) {
  return (
    <View style={styles.root}>
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 49.1666,
            longitude: -123.1336,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
          provider="google"
        >
          <Marker
            coordinate={{ latitude: 49.1666, longitude: -123.1336 }}
            title="Richmond, BC"
            description="Popular meet location"
          />
        </MapView>
      </View>

      <View style={styles.card}>
        <Text style={styles.h1}>Where?</Text>

        <View style={styles.inputRow}>
          <Ionicons name="search" size={18} color="#111" />
          <TextInput
            style={styles.input}
            placeholder="Search cities"
            placeholderTextColor="#777"
            returnKeyType="search"
          />
        </View>

        <Text style={styles.label}>Suggested cities</Text>

        <FlatList
          data={SUGGESTED}
          keyExtractor={(i) => i.id}
          ItemSeparatorComponent={() => <View style={{ height: 14 }} />}
          renderItem={({ item }) => (
            <Pressable style={styles.suggestion} onPress={() => {}}>
              <View style={styles.avatar} />
              <View style={{ flex: 1 }}>
                <Text style={styles.title} numberOfLines={1}>
                  {item.title}
                </Text>
                <Text style={styles.subtitle} numberOfLines={1}>
                  {item.subtitle}
                </Text>
              </View>
            </Pressable>
          )}
        />
      </View>

      <View style={styles.datesRow}>
        <Text style={styles.when}>When</Text>
        <Pressable onPress={() => {}}>
          <Text style={styles.addDates}>Add dates</Text>
        </Pressable>
      </View>

      <View style={styles.footer}>
        <Pressable onPress={() => {}}>
          <Text style={styles.clear}>Clear all</Text>
        </Pressable>

        <Pressable
          style={styles.cta}
          onPress={() => navigation.navigate("MapResults")}
        >
          <Ionicons name="search" size={16} color="#fff" />
          <Text style={styles.ctaText}>Search</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#efefef", padding: 16 },
  mapContainer: {
    height: 200,
    borderRadius: 14,
    overflow: "hidden",
    marginBottom: 16,
    ...(Platform.OS === "ios"
      ? {
          shadowColor: "#000",
          shadowOpacity: 0.12,
          shadowRadius: 10,
          shadowOffset: { width: 0, height: 6 },
        }
      : { elevation: 6 }),
  },
  map: { flex: 1 },

  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 16,
    ...(Platform.OS === "ios"
      ? {
          shadowColor: "#000",
          shadowOpacity: 0.12,
          shadowRadius: 10,
          shadowOffset: { width: 0, height: 6 },
        }
      : { elevation: 6 }),
  },
  h1: { fontSize: 24, fontWeight: "800", marginBottom: 12, color: "#111" },

  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    height: 48,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#222",
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  input: { flex: 1, fontSize: 16, color: "#111" },

  label: { fontSize: 12, color: "#666", marginBottom: 8 },

  suggestion: { flexDirection: "row", alignItems: "center" },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: "#d9d9d9",
    marginRight: 12,
  },
  title: { fontSize: 14, fontWeight: "700", color: "#111" },
  subtitle: { fontSize: 12, color: "#6A6A6A", marginTop: 2 },

  datesRow: {
    marginTop: 16,
    backgroundColor: "#fff",
    borderRadius: 14,
    paddingHorizontal: 16,
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    ...(Platform.OS === "ios"
      ? {
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowRadius: 8,
          shadowOffset: { width: 0, height: 4 },
        }
      : { elevation: 4 }),
  },
  when: { fontSize: 14, color: "#111" },
  addDates: { fontSize: 14, color: "#111", fontWeight: "600" },

  footer: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  clear: { textDecorationLine: "underline", fontSize: 14, color: "#111" },
  cta: {
    height: 48,
    paddingHorizontal: 18,
    borderRadius: 10,
    backgroundColor: "#d1211c",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  ctaText: { color: "#fff", fontSize: 15, fontWeight: "700" },
});
