import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { useState, useEffect } from 'react';


export default function App() {
  const [user, setUser] = useState(null); 
  const [error, setError] = useState(null); 
  const [loading, setLoading] = useState(false);  

  const configureGoogleSignIn = async () => {
    GoogleSignin.configure({
      iosClientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID_IOS,  
    });
  };

  useEffect(() => {
    configureGoogleSignIn();
  }, []);

  const signIn = async () => {
    try {
      setLoading(true);
      const user = await GoogleSignin.signIn();
      setUser(user);
    } catch (error) {
      setError(statusCodes[error.code]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text> React Native Practices - Google Sign In </Text>
      <TouchableOpacity 
        style={[styles.button, loading && styles.buttonDisabled]}
        disabled={loading}
        onPress={signIn}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Cargando...' : 'Iniciar sesión con Google'}
        </Text>
      </TouchableOpacity>

      {user && <Text style={styles.welcomeText}>Welcome {user.user?.name || user.data?.user?.name || 'Usuario'}</Text>}
      {error && <Text style={styles.errorText}>Error: {error}</Text>}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#4285F4',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
    marginTop: 20,
  },
  buttonDisabled: {
    backgroundColor: '#cccccc',
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  welcomeText: {
    marginTop: 20,
    fontSize: 16,
    color: '#333',
  },
  errorText: {
    marginTop: 20,
    fontSize: 14,
    color: '#d32f2f',
  },
});
