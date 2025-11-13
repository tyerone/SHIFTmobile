import { useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  Image,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // used ionicons from https://ionic.io/ionicons

// header for each horizontal grid section
function SectionHeader({ title, onPress }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Pressable onPress={onPress} hitSlop={8}>
        <Ionicons name="chevron-forward" size={18} color="#000000ff" />
      </Pressable>
    </View>
  );
}

// look of build card. uses cardPlaceholder if no img provided
function BuildCard({ title, location, image }) {
  return (
    <Pressable style={styles.card} onPress={() => {}}>
      {image ? (
        <Image source={image} style={styles.cardImage} />
      ) : (
        <View style={styles.cardPlaceholder} />
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

// horizontal list wrapper
function HorizontalList({ data }) {
  const renderItem = ({ item }) => (
    <BuildCard title={item.title} location={item.location} image={item.image} />
  );
  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(i) => i.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
      contentContainerStyle={{ paddingHorizontal: 16 }}
    />
  );
}

// using placeholder information for now TODO integrate storage to load build cards
export default function BuildScreen() {
  const saved = useMemo(
    () => [
      {
        id: "s1",
        title: "Red Bull RB21",
        location: "Richmond Lordco, BC",
        image: null,
      },
      {
        id: "s2",
        title: "Mercedes CLS63",
        location: "Richmond Lordco, BC",
        image: null,
      },
      { id: "s3", title: "GR86", location: "Richmond, BC", image: null },
    ],
    []
  );

  const inProgress = useMemo(
    () => [
      {
        id: "p1",
        title: "RB21 Widebody",
        location: "Richmond Lordco, BC",
        image: null,
      },
      {
        id: "p2",
        title: "CLS63 Wheels",
        location: "Richmond Lordco, BC",
        image: null,
      },
      {
        id: "p3",
        title: "GR86 Exhaust",
        location: "Richmond, BC",
        image: null,
      },
    ],
    []
  );

  const completed = useMemo(
    () => [
      {
        id: "c1",
        title: "RB21 Wrap",
        location: "Richmond Lordco, BC",
        image: null,
      },
      {
        id: "c2",
        title: "CLS63 Tune",
        location: "Richmond Lordco, BC",
        image: null,
      },
      { id: "c3", title: "GR86 Tune", location: "Richmond, BC", image: null },
    ],
    []
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 32 }}
    >
      {/* page title */}
      <Text style={styles.pageTitle}>Your builds</Text>

      {/* saved cards */}
      <View style={styles.sectionBlock}>
        <SectionHeader title="Saved Build Cards" onPress={() => {}} />
        <HorizontalList data={saved} />
      </View>

      {/* in progress */}
      <View style={styles.sectionBlock}>
        <SectionHeader title="In Progress" onPress={() => {}} />
        <HorizontalList data={inProgress} />
      </View>

      {/* completed */}
      <View style={styles.sectionBlock}>
        <SectionHeader title="Completed" onPress={() => {}} />
        <HorizontalList data={completed} />
      </View>
    </ScrollView>
  );
}

const CARD_SIZE = 160;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffffff",
  },

  pageTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111",
    textAlign: "center",
    paddingTop: 8,
    paddingBottom: 8,
  },

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
    color: "#111",
  },

  card: {
    width: CARD_SIZE,
  },

  cardPlaceholder: {
    width: CARD_SIZE,
    height: CARD_SIZE,
    borderRadius: 16,
    backgroundColor: "#e6e6e6",
    marginBottom: 8,
  },

  cardImage: {
    width: CARD_SIZE,
    height: CARD_SIZE,
    borderRadius: 16,
    marginBottom: 8,
  },

  cardTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111",
  },

  cardMeta: {
    fontSize: 12,
    color: "#6A6A6A",
    marginTop: 2,
  }, // meta data info for build card TO BE ADDED
});
