import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, FlatList, Image } from 'react-native';
import { useAuth } from '../auth/AuthProvider';
import { loadSpots } from '../storage/spots'; 

export default function ProfileScreen({ navigation }) {
  const { user, signOutAll } = useAuth(); // access current user and logout fn from AuthProvider
  const [spots, setSpots] = useState([]); // storing saved car spots

  useEffect(() => { // load all local saved spot cards once when screen mounts
    const load = async () => setSpots(await loadSpots());
    load();
  }, []);

  if (!user) { // user not logged in
    return (
      <View style={styles.root}>
        <Text style={styles.h1}>Profile</Text>
        <Text style={styles.sub}>Log in and start tracking your builds and adding your spots.</Text>

        <Pressable style={styles.primary} onPress={() => navigation.navigate('Auth')}>
          <Text style={styles.primaryText}>Log in or sign up</Text>
        </Pressable>

        <View style={styles.divider} />

        <Text style={styles.h2}>Your spots</Text>
        <Text style={styles.note}>You must be logged in to view.</Text>
        <View style={styles.line} />

        <Text style={styles.h2}>Your builds</Text>
        <Text style={styles.note}>You must be logged in to view.</Text>
        <View style={styles.line} />
      </View>
    );
  }

  return ( // user logged in
    <View style={styles.root}>
      <View style={styles.row}>
        <Text style={styles.h1}>Profile</Text>
        <Pressable onPress={signOutAll}><Text style={styles.logout}>Log out</Text></Pressable>
      </View>
      <Text style={styles.sub}>Log in and start tracking your builds and adding your spots.</Text>

      <View style={styles.card}>
        <View style={styles.avatar} />
        <View style={{ marginLeft: 16 }}>
          <Text style={styles.name}>{user.email?.split('@')[0] || 'Username'}</Text>
          <Text style={styles.role}>Granny Shifter</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <Text style={styles.h2}>Your spots</Text>
      <FlatList
        horizontal
        data={spots.map(s => ({ id: s.id, uri: s.uri, title: 'Car name', location: 'Car location' }))}
        keyExtractor={(i) => i.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 10 }}
        ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
        renderItem={({ item }) => (
          <View style={{ width: 156 }}>
            {item.uri ? (
              <Image source={{ uri: item.uri }} style={{ width: 156, height: 156, borderRadius: 16, backgroundColor: '#eee' }} />
            ) : (
              <View style={{ width: 156, height: 156, borderRadius: 16, backgroundColor: '#e6e6e6' }} />
            )}
            <Text style={styles.cardTitle} numberOfLines={1}>{item.title}</Text>
            <Text style={styles.cardMeta} numberOfLines={1}>{item.location}</Text>
          </View>
        )}
      />

      <View style={styles.line} />
      <Text style={styles.h2}>Your builds</Text>
      <View style={{ height: 156, borderRadius: 16, backgroundColor: '#f0f0f0', marginTop: 10 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#efefef',
    paddingHorizontal: 16,
    paddingTop: 16 
  },

  h1: {
    fontSize: 22,
    fontWeight: '800',
    color: '#111111ff' 
  },

  sub: {
    color: '#454545ff',
    marginTop: 6,
    marginBottom: 12 
  },

  primary: {
    height: 52,
    borderRadius: 26,
    backgroundColor: '#000000ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 } 
  },

  primaryText: {
    color: '#ffffffff',
    fontWeight: '700' 
  },

  divider: {
    height: 1,
    backgroundColor: '#d9d9d9',
    marginVertical: 18 
  },

  h2: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000000ff' 
  },

  note: {
    color: '#666',
    marginTop: 6,
    marginBottom: 16 
  },

  line: {
    height: 1,
    backgroundColor: '#d9d9d9',
    marginVertical: 12 
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  logout: {
    color: '#000000ff'
  },

  card: {
    marginTop: 10,
    backgroundColor: '#e3e3e3ff',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000000ff',
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },

  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#ddddddff'
  },

  name: {
    fontSize: 20,
    fontWeight: '800',
    color: '#000000ff' 
  },

  role: {
    color: '#777',
    marginTop: 2 
  },

  cardTitle: {
    fontSize: 13.5,
    fontWeight: '700',
    color: '#000000ff', 
    marginTop: 8 
  },

  cardMeta: {
    fontSize: 12,
    color: '#6A6A6A',
    marginTop: 2 
  },
});