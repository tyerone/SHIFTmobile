import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AuthProvider } from './auth/AuthProvider';
import TopNav from './navigation/TopNav';
import SpotCameraScreen from './screens/SpotCameraScreen';
import NewSpotCardScreen from './screens/NewSpotCardScreen';
import LogInScreen from './screens/LogInScreen';
import ProfileScreen from './screens/ProfileScreen';

const Stack = createNativeStackNavigator();

function MainWithHeader() {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.tabsWrap}>
        <TopNav />
      </View>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="MainTabs" screenOptions={{ headerShown: false }}>
          {/* main app with headers + nav */}
          <Stack.Screen 
            name="MainTabs"
            component={MainWithHeader} 
          />

          {/* temp screens */}
          <Stack.Screen
            name="SpotCamera"
            component={SpotCameraScreen}
            options={{ presentation: 'fullScreenModal' }}
          />

          <Stack.Screen
            name="NewSpotCard"
            component={NewSpotCardScreen}
            options={{ presentation: 'fullScreenModal' }}
          />

          {/* auth */}
          <Stack.Screen
            name="Auth"
            component={LogInScreen}
            options={{ presentation: 'modal' }}
          />

          <Stack.Screen
            name="Profile"
            component={ProfileScreen}
            options={{ presentation: 'modal' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#efefef' 
  },

  header: {
    height: 72,
    paddingHorizontal: 16,
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  },

  tabsWrap: {
    flex: 1
  },
});