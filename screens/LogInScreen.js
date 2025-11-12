import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import { useAuth } from '../auth/AuthProvider';

export default function LogInScreen({ navigation }) {
  // take auth stuff from AuthProvider
  const { signIn, signUp } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setErr] = useState('');

  // called when user taps continue button
  const onContinue = async () => {
    setErr(''); // clears prev error
    try {
      await signIn(email, password); // try sign in
      navigation.goBack(); // go back to screen if succesful
    } catch {
      try {
        await signUp(email, password); // make new acc if sign in fails
        navigation.goBack();
      } catch {
        setErr('Check your email or password.'); // incorrect password
      }
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.root} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >

      <Text style={styles.title}>Log in or sign up</Text>

      {/* email input field */}
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholder="Email"
        placeholderTextColor="#9c9c9cff"
      />

      {/* password input field */}
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        placeholderTextColor="#9c9c9cff"
        secureTextEntry
      />

      {/* error msg */}
      {!!error && <Text style={styles.error}>{error}</Text>}

      <Pressable style={styles.button} onPress={onContinue}>
        <Text style={styles.buttonText}>Continue</Text>
      </Pressable>

      <View style={styles.line} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: { 
    flex: 1, 
    backgroundColor: '#fff', 
    padding: 20 
  },

  title: { 
    marginTop: 8, 
    marginBottom: 20, 
    textAlign: 'center', 
    fontSize: 16, 
    fontWeight: '700' 
  },

  input: { 
    height: 48, 
    borderColor: '#111', 
    borderWidth: 1, 
    borderRadius: 24, 
    paddingHorizontal: 16, 
    marginBottom: 12 
  },

  button: { 
    height: 52, 
    borderRadius: 26, 
    backgroundColor: '#111', 
    alignItems: 'center', 
    justifyContent: 'center', 
    marginTop: 8, 
    shadowColor: '#000', 
    shadowOpacity: 0.2, 
    shadowRadius: 10, 
    shadowOffset: { 
      width: 0, 
      height: 6 
    } 
  },

  buttonText: { 
    color: '#fff', 
    fontWeight: '700' 
  },

  line: { 
    height: 1, 
    backgroundColor: '#ddd', 
    marginTop: 16 
  },

  error: { 
    color: '#d00',
    marginBottom: 6 
  },
});