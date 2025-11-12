import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View, Text, Pressable, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../auth/AuthProvider';

import MeetScreen from '../screens/MeetScreen';
import SpotScreen from '../screens/SpotScreen';
import BuildScreen from '../screens/BuildScreen';

const Tab = createMaterialTopTabNavigator(); // creates a top tab navigator (found in React Navigation documentation)

export default function TopNav() {
  const navigation = useNavigation();
  const { user } = useAuth() || {}; // accesses user auth from AuthProvider
  // if user exists, be logged in, otherwise be guest

  return (
    <View style={{ flex: 1 }}>
      {/* centered logo */}
      <View style={styles.headerRow}>
        <Image
          source={require('../assets/images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        {/* login/profile button */}
        <Pressable
          onPress={() => navigation.navigate(user ? 'Profile' : 'Auth')}
          hitSlop={8}
          style={styles.loginBtn}
        >
          <Text style={styles.loginText}>{user ? 'Profile' : 'Log in'}</Text>
        </Pressable>
      </View>

      {/* main navigation */}
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: { fontSize: 13, fontWeight: '600' },
          tabBarIndicatorContainerStyle: { alignItems: 'center' },
          tabBarIndicatorStyle: {
            height: 3,
            width: 150,
            borderRadius: 3,
            backgroundColor: '#111',
          },
          tabBarActiveTintColor: '#111',
          tabBarInactiveTintColor: '#999',
          tabBarStyle: { backgroundColor: 'transparent', elevation: 0 },
          tabBarItemStyle: { paddingVertical: 4 },
        }}
      >
        <Tab.Screen name="Meet" component={MeetScreen} />
        <Tab.Screen name="Spot" component={SpotScreen} />
        <Tab.Screen name="Build" component={BuildScreen} />
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },

  logo: {
    width: 32,
    height: 32,
  },
  
  loginBtn: {
    position: 'absolute',
    right: 16,
    top: '50%',
    transform: [{ translateY: -17 }],
    backgroundColor: '#000000ff',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 18,
  },

  loginText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 13,
  },
});