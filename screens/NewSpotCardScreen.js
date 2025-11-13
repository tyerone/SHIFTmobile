import { useState } from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { addSpot } from "../storage/spots";

export default function NewSpotCardScreen({ navigation, route }) {
  const uri = route?.params?.uri;
  const [tags] = useState(["Location", "Car Origin", "Additional Tags"]);

  // upload handler when red button is pressed
  const onUpload = async () => {
    const spot = {
      // create a new spot object
      id: String(Date.now()),
      author: "You",
      uri,
      title: "Car name",
      location: "Car location",
      tags,
      createdAt: Date.now(),
    };

    await addSpot(spot); // save new spot using local storage

    // bring back to main app view
    navigation.replace("MainTabs", {
      screen: "Spot",
      params: { toList: true },
    });
  };

  // back button to return to spot screen without uploading
  const onBackToTabs = () => {
    navigation.replace("MainTabs", { screen: "Spot" });
  };

  return (
    <SafeAreaView style={styles.root}>
      {/* top bar with back button */}
      <View style={styles.topBar}>
        <Pressable style={styles.backBtn} onPress={onBackToTabs}>
          <Ionicons name="chevron-back" size={20} color="#000000ff" />
        </Pressable>
        <Text style={styles.title}>New Spot Card</Text>
        <View style={{ width: 36 }} />
      </View>

      {/* spot card preview */}
      <View style={styles.card}>
        <View style={styles.mediaWrap}>
          {uri ? (
            <Image source={{ uri }} style={styles.media} />
          ) : (
            <View style={styles.mediaPlaceholder} />
          )}
        </View>

        <View style={styles.tagsRow}>
          {tags.map((t) => (
            <View key={t} style={styles.chip}>
              <Text style={styles.chipText}>{t}</Text>
            </View>
          ))}
        </View>
      </View>

      <Pressable style={styles.uploadFab} onPress={onUpload}>
        <Ionicons name="arrow-up" size={32} color="#ffffffff" />
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#efefefff",
  },

  topBar: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    justifyContent: "space-between",
  },

  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.92)",
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#000000ff",
  },

  card: {
    marginTop: 4,
    marginHorizontal: 16,
    backgroundColor: "#ffffffff",
    borderRadius: 16,
    padding: 16,
  },

  mediaWrap: {
    borderRadius: 16,
    overflow: "hidden",
  },

  media: {
    width: "100%",
    aspectRatio: 1,
    backgroundColor: "#eaeaeaff",
  },

  mediaPlaceholder: {
    width: "100%",
    aspectRatio: 1,
    backgroundColor: "#e6e6e6",
  },

  tagsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 12,
  },

  chip: {
    height: 28,
    paddingHorizontal: 10,
    borderRadius: 14,
    backgroundColor: "#e0e0e0",
    alignItems: "center",
    justifyContent: "center",
  },

  chipText: {
    fontSize: 12,
    color: "#333333ff",
  },

  uploadFab: {
    position: "absolute",
    bottom: 28,
    alignSelf: "center",
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: "#d1211c",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 10,
  },
});
