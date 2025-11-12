import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = '@shift_spots';

export async function loadSpots() {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export async function addSpot(spot) {
  const list = await loadSpots();
  const next = [spot, ...list];
  await AsyncStorage.setItem(KEY, JSON.stringify(next));
  return next;
}







