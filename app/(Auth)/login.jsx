import React, { useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, GestureHandlerRootView } from 'react-native-gesture-handler';
import { Link, useRouter } from 'expo-router';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

import FormField from '../components/FormField';
import CustomButton from '../components/CustomButton';

const url = 'https://unimate-backend.onrender.com/';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [errorVisible, setErrorVisible] = useState(false);
  const router = useRouter();

  const submit = async () => {
    if (form.email === '' || form.password === '') {
      setErrorMessage('Email and password are required.');
      setErrorVisible(true);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post(url + 'user/login', {
        email: form.email,
        password: form.password,
      });

      if (response.status === 200) {
        // Store user ID in AsyncStorage
        await AsyncStorage.setItem('userId', response.data.userId);
        router.push('/Profile');
      } else {
        setErrorMessage('Login failed. Please try again.');
        setErrorVisible(true);
      }
    } catch (error) {
      setErrorMessage(error.message);
      setErrorVisible(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <LinearGradient
      colors={['#FFA500', '#D85401', '#1A1A1A']}
      style={styles.gradient}
      start={{ x: -2.7, y: -0.7 }}
      end={{ x: 0.2, y: 0.6 }}
    >
      <SafeAreaView style={styles.container}>
        <GestureHandlerRootView>
          <ScrollView contentContainerStyle={styles.scrollView}>
            <View style={styles.content}>
              <Text style={styles.heading}>Connect, Update, Manage</Text>
              <Text style={styles.headingText}>
                <Text style={styles.appName}>Unimate </Text> 
                : Your one-stop app for news, events, and campus life.
              </Text>

              {errorVisible && <Text style={styles.errorText}>{errorMessage}</Text>}

              <View style={styles.inputContainer}>
                <FormField
                  value={form.email}
                  handleChangeText={(text) => setForm({ ...form, email: text })}
                  placeholder="Enter your email"
                  otherStyles={styles.input}
                  keyboardType="email-address"
                />

                <FormField
                  value={form.password}
                  handleChangeText={(text) => setForm({ ...form, password: text })}
                  placeholder="Enter your password"
                  otherStyles={styles.input}
                  secureTextEntry
                />
              </View>

              <CustomButton
                title="Log in"
                handlePress={submit}
                containerStyles={styles.button}
                isLoading={isSubmitting}
              />

              {isSubmitting && <ActivityIndicator size="large" color="#000" />}

              <Text style={styles.middleText}>Don't have an account?</Text>
              <Link href="/register" style={styles.linkText}>
                <Text>Sign Up</Text>
              </Link>
              <Text style={styles.footer}>Unimate</Text>
            </View>
          </ScrollView>
        </GestureHandlerRootView>
      </SafeAreaView>
    </LinearGradient>
  );
};


const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 24,
  },
  heading: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  headingText: {
    fontSize: 22,
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  appName: {
    fontWeight: 'bold',
    color: '#D85401',
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    width: '100%',
  },
  inputContainer: {
    width: '100%',
    textAlign: 'center',
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: '#ccc',
    marginLeft: 35,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: 'white',
  },
  button: {
    width: '80%',
    backgroundColor: '#D85401',
    padding: 14,
    borderRadius: 8,
    marginTop: 24,
    minWidth: 180,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  middleText: {
    marginTop: 20,
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
  },
  linkText: {
    fontSize: 20,
    marginTop: 15,
    color: '#fff',
    textDecorationLine: 'underline',
  },
  footer: {
    marginTop: 140,
    fontSize: 65,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default Login;
