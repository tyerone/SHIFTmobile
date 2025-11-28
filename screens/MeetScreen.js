import { useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

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

function EventCard({ title, date, location, image }) {
  return (
    <Pressable style={styles.card} onPress={() => {}}>
      <Image source={image} style={styles.cardImage} />
      <Text style={styles.cardTitle} numberOfLines={1}>
        {title}
      </Text>
      <Text style={styles.cardMeta} numberOfLines={1}>
        {date}
      </Text>
      <Text style={styles.cardMeta} numberOfLines={1}>
        {location}
      </Text>
    </Pressable>
  );
}

function HorizontalList({ data }) {
  const renderItem = ({ item }) => (
    <EventCard
      title={item.title}
      date={item.date}
      location={item.location}
      image={item.image}
    />
  );
  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
      contentContainerStyle={{ paddingHorizontal: 16 }}
    />
  );
}

export default function MeetScreen({ navigation }) {
  const meets = useMemo(
    () => [
      {
        id: "1",
        title: "Supermotion",
        date: "Nov 22",
        location: "Richmond Lordco, BC",
        image: require("../assets/images/sample1.png"),
      },
      {
        id: "2",
        title: "Lowermainland",
        date: "Nov 14",
        location: "Richmond Home Depot, BC",
        image: require("../assets/images/sample1.png"),
      },
      {
        id: "3",
        title: "Elevated",
        date: "Nov 9",
        location: "Vancouver, BC",
        image: require("../assets/images/sample1.png"),
      },
    ],
    []
  );

  const trackDays = useMemo(
    () => [
      {
        id: "4",
        title: "BCDA",
        date: "Nov 8",
        location: "Richmond Lordco, BC",
        image: require("../assets/images/sample1.png"),
      },
      {
        id: "5",
        title: "Speedy Goat",
        date: "Nov 22",
        location: "Richmond Home Depot, BC",
        image: require("../assets/images/sample1.png"),
      },
      {
        id: "6",
        title: "NHRA",
        date: "Jun 11",
        location: "Mission Raceway, BC",
        image: require("../assets/images/sample1.png"),
      },
    ],
    []
  );

  const others = useMemo(() => meets, [meets]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 32 }}
      bounces
    >
      <View style={styles.searchWrap}>
        <Pressable
          onPress={() => navigation.navigate("SearchMeets")}
          style={styles.searchPill}
        >
          <Ionicons
            name="search"
            size={18}
            color="#333"
            style={{ marginRight: 8 }}
          />
          <Text style={styles.searchText}>Search for meets</Text>
        </Pressable>
      </View>

      <View style={styles.sectionBlock}>
        <SectionHeader
          title="Meets near Richmond"
          // onPress={() => navigation.navigate('MapResults')} TO BE ADDED
        />
        <HorizontalList data={meets} />
      </View>

      <View style={styles.sectionBlock}>
        <SectionHeader
          title="Track Days near Richmond"
          onPress={() => navigation.navigate("MapResults")}
        />
        <HorizontalList data={trackDays} />
      </View>

      <View style={styles.sectionBlock}>
        <SectionHeader
          title="Other Events near Richmond"
          onPress={() => navigation.navigate("MapResults")}
        />
        <HorizontalList data={others} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#efefef" },

  // Search
  searchWrap: { paddingHorizontal: 16, paddingTop: 12, paddingBottom: 16 },
  searchPill: {
    flexDirection: "row",
    alignItems: "center",
    height: 52,
    borderRadius: 26,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  searchText: { color: "#666", fontSize: 16 },

  // Sections
  sectionBlock: { marginTop: 8 },
  sectionHeader: {
    paddingHorizontal: 16,
    marginBottom: 8,
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: { fontSize: 18, fontWeight: "700", color: "#111" },

  // Cards
  card: {
    width: 220,
    backgroundColor: "transparent",
    borderRadius: 16,
    padding: 0,
    marginVertical: 2,
  },
  cardImage: {
    width: "100%",
    height: 160,
    borderRadius: 16,
    marginBottom: 8,
    backgroundColor: "transparent",
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111",
    paddingHorizontal: 4,
  },
  cardMeta: {
    fontSize: 12,
    color: "#6A6A6A",
    marginTop: 2,
    paddingHorizontal: 4,
  },
});
