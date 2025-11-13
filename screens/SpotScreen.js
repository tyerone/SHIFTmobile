import { useMemo, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  Image,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import { loadSpots } from "../storage/spots";

function SectionHeader({ title, onPress }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Pressable onPress={onPress} hitSlop={8}>
        <Ionicons name="chevron-forward" size={18} color="#111" />
      </Pressable>
    </View>
  );
}

function SpotCard({ title, location, image, size = 156 }) {
  return (
    <Pressable style={[styles.card, { width: size }]}>
      {image ? (
        <Image
          source={image}
          style={[styles.cardImage, { width: size, height: size }]}
        />
      ) : (
        <View style={[styles.cardPlaceholder, { width: size, height: size }]} />
      )}
      <Text style={styles.cardTitle} numberOfLines={1}>
        {title}
      </Text>
      <Text style={styles.cardMeta} numberOfLines={1}>
        {location}
      </Text>
    </Pressable>
  );
}

function HorizontalList({ data, size }) {
  const renderItem = ({ item }) => (
    <SpotCard
      title={item.title}
      location={item.location}
      image={item.image}
      size={size}
    />
  );
  return (
    <FlatList
      horizontal
      data={data}
      renderItem={renderItem}
      keyExtractor={(i) => i.id}
      showsHorizontalScrollIndicator={false}
      ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
      contentContainerStyle={{ paddingHorizontal: 16 }}
    />
  );
}

function Chip({ label }) {
  return (
    <View style={styles.chip}>
      <Text style={styles.chipText}>{label}</Text>
    </View>
  );
}

export default function SpotScreen({ navigation }) {
  const [viewMode, setViewMode] = useState("grid"); // 'grid' | 'list'
  const [savedSpots, setSavedSpots] = useState([]);
  const route = useRoute();

  useFocusEffect(
    useCallback(() => {
      let mounted = true;
      (async () => {
        const data = await loadSpots();
        if (mounted) setSavedSpots(data);
        if (route.params?.toList) setViewMode("list");
      })();
      return () => {
        mounted = false;
      };
    }, [route.params])
  );

  const mk = (id) => ({
    id,
    title: "Car name",
    location: "Car location",
    image: null,
  });
  const recent = useMemo(() => [mk("r1"), mk("r2"), mk("r3"), mk("r4")], []);
  const favorites = useMemo(() => [mk("f1"), mk("f2"), mk("f3")], []);
  const yours = useMemo(
    () => [
      ...savedSpots.map((s) => ({
        id: s.id,
        title: s.title,
        location: s.location,
        image: { uri: s.uri },
      })),
      mk("y1"),
      mk("y2"),
      mk("y3"),
    ],
    [savedSpots]
  );

  const feed = useMemo(
    () => [
      ...savedSpots.map((s) => ({
        id: s.id,
        author: s.author || "You",
        image: { uri: s.uri },
      })),
      { id: "p1", author: "Username", image: null },
      { id: "p2", author: "Username", image: null },
    ],
    [savedSpots]
  );

  const cardSize = 156;

  // list view
  if (viewMode === "list") {
    return (
      <View style={styles.container}>
        <View style={styles.feedTop}>
          <Ionicons
            name="grid"
            size={18}
            color="transparent"
            style={{ width: 34 }}
          />
          <Text style={styles.feedTitle}>Your feed</Text>
          <View style={styles.viewToggles}>
            <Pressable
              onPress={() => setViewMode("grid")}
              style={styles.toggleBtn}
              hitSlop={6}
            >
              <Ionicons name="grid" size={18} color="#666" />
            </Pressable>
            <Pressable
              onPress={() => setViewMode("list")}
              style={[styles.toggleBtn, styles.toggleBtnActive]}
              hitSlop={6}
            >
              <Ionicons name="reorder-three" size={22} color="#111" />
            </Pressable>
          </View>
        </View>

        <FlatList
          data={feed}
          keyExtractor={(i) => i.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
          renderItem={({ item }) => (
            <View style={styles.feedItem}>
              <View style={styles.feedHeader}>
                <View style={styles.avatar} />
                <Text style={styles.author}>{item.author}</Text>
              </View>
              {item.image ? (
                <Image source={item.image} style={styles.feedImage} />
              ) : (
                <View style={styles.feedPlaceholder} />
              )}
              <View style={styles.tagsRow}>
                <Chip label="Location" />
                <Chip label="Car Origin" />
                <Chip label="Additional Tags" />
              </View>
            </View>
          )}
        />
      </View>
    );
  }

  // explore feed
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 32 }}
    >
      <View style={styles.actionsRow}>
        <View style={styles.centerWrap} pointerEvents="box-none">
          <Pressable
            onPress={() => navigation.navigate("SpotCamera")}
            style={styles.primaryPill}
          >
            <Text style={styles.primaryPillText}>Spot a car</Text>
          </Pressable>
        </View>

        <View style={styles.viewToggles}>
          <Pressable
            onPress={() => setViewMode("grid")}
            style={[styles.toggleBtn, styles.toggleBtnActive]}
            hitSlop={6}
          >
            <Ionicons name="grid" size={18} color="#111" />
          </Pressable>
          <Pressable
            onPress={() => setViewMode("list")}
            style={styles.toggleBtn}
            hitSlop={6}
          >
            <Ionicons name="reorder-three" size={22} color="#666" />
          </Pressable>
        </View>
      </View>

      <View style={styles.sectionBlock}>
        <SectionHeader title="Recent spots in your area" onPress={() => {}} />
        <HorizontalList data={recent} size={cardSize} />
      </View>

      <View style={styles.sectionBlock}>
        <SectionHeader
          title="Community favorites this week"
          onPress={() => {}}
        />
        <HorizontalList data={favorites} size={cardSize} />
      </View>

      <View style={styles.sectionBlock}>
        <SectionHeader title="Your spots" onPress={() => {}} />
        <HorizontalList data={yours} size={cardSize} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#efefef",
  },

  actionsRow: {
    paddingTop: 8,
    paddingBottom: 12,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },

  centerWrap: {
    position: "absolute",
    left: 0,
    right: 0,
    alignItems: "center",
  },

  primaryPill: {
    height: 48,
    paddingHorizontal: 22,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffffff",
  },

  primaryPillText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000000ff",
  },

  viewToggles: {
    flexDirection: "row",
    gap: 10,
  },

  toggleBtn: {
    width: 34,
    height: 34,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000000",
  },

  toggleBtnActive: {
    backgroundColor: "#ffffffff",
  },

  // sections
  sectionBlock: {
    marginTop: 8,
  },

  sectionHeader: {
    paddingHorizontal: 16,
    marginBottom: 8,
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000000ff",
  },

  // grid cards
  cardPlaceholder: {
    borderRadius: 16,
    backgroundColor: "#e6e6e6",
    marginBottom: 8,
  },

  cardImage: {
    borderRadius: 16,
    marginBottom: 8,
    backgroundColor: "#eaeaeaff",
  },

  cardTitle: {
    fontSize: 13.5,
    fontWeight: "700",
    color: "#000000ff",
  },

  cardMeta: {
    fontSize: 12,
    color: "#6A6A6A",
    marginTop: 2,
  },

  // list header
  feedTop: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 12,
    flexDirection: "row",
    alignItems: "center",
  },

  feedTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700",
    color: "#111",
  },

  // list items
  feedItem: {
    marginBottom: 18,
  },

  feedHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },

  avatar: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#dbdadaff",
    marginRight: 8,
  },

  author: {
    fontSize: 14,
    color: "#000000ff",
  },

  feedImage: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 18,
    backgroundColor: "#eaeaeaff",
  },

  feedPlaceholder: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 18,
    backgroundColor: "#e6e6e6",
  },

  tagsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 10,
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
    color: "#323232ff",
  },
});
