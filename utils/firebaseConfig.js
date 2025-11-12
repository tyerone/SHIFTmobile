// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAsSekBjbYlhan5jnay05rvCYg7vhiNWtA",
  authDomain: "shift-37798.firebaseapp.com",
  projectId: "shift-37798",
  storageBucket: "shift-37798.firebasestorage.app",
  messagingSenderId: "578258757047",
  appId: "1:578258757047:web:71e22bf73594b76ac47432"
};

// Initialize Firebase
// avoid re-initializing during fast refresh
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

// this is required in React Native
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});