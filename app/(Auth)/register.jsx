import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Overlay } from 'react-native-elements';
import { Link } from '@react-navigation/native';
import FormField from '../components/FormField';
import CustomButton from '../components/CustomButton';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import { useRouter } from 'expo-router';


const Register = () => {

  const router = useRouter();
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const submitDirect = () => {
    router.push('/Announcements');
  }
    

  const submit = async () => {
    console.log('Form:', form);

    setIsSubmitting(true);

    try {
      const response = await axios.post('http://localhost:8080/user/register', {
        email: form.email,
        username: form.username,
        password: form.password,
      });
      if (response.status === 201) {
        router.push('/Profile');
      } else {
        setErrorMessage('Registration failed. Please try again.');
        setErrorVisible(true);
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'An error occurred. Please try again.');
      setErrorVisible(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    // <ImageBackground
    //   source={background} 
    //   style={styles.background}
    // >
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
            <Text style={styles.heading}>Ready! Are you?</Text>
            <Text style={styles.headingText}>
            <Text style={styles.appName}>Unimate </Text> 
            : Your one-stop app for news, events, and campus life.
            </Text>

            <View style={styles.inputContainer}>
            <FormField
              value={form.username}
              handleChangeText={(text) => setForm({ ...form, username: text })}
              placeholder="Enter your username"
              otherStyles={styles.input}
            />
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

            {errorVisible && <Text style={styles.errorText}>{errorMessage}</Text>}
            <CustomButton
              // handlePress={submit}
              handlePress={submitDirect}
              containerStyles={styles.button}
              isLoading={isSubmitting}
              title="Sign Up"
            />

            <Text style={styles.middleText}>Already have an account?</Text>
            <Link to="/login" style={styles.linkText}>
              <Text>Log In</Text>
            </Link>

            <Text style={styles.middleText}>
              By clicking sign up, you agree to our Terms of Service and Privacy Policy
            </Text>

            <Text style={styles.footer}>Unimate</Text>
          </View>
        </ScrollView>
      </GestureHandlerRootView>

      <Overlay isVisible={errorVisible} onBackdropPress={() => setErrorVisible(false)}>
        <Text>{errorMessage}</Text>
      </Overlay>
    </SafeAreaView>
    </LinearGradient>
    //  </ImageBackground> 
  );
};

const styles = StyleSheet.create({
  gradient : {
    flex : 1
  }, 
  container: {
    flex: 1,
    alignItems: 'center',
  },
  heading: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
    top : -15
  },
  headingText: {
    fontSize: 22,
    padding : 10,
    color: '#fff',
    marginBottom: 20,
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
  inputContainer : {
    width : '100%',
    textAlign : 'center'
  },
  input: {
    height: 40,
    width: '80%',
    textAlign: 'center',
    marginLeft : 35,
    borderColor: '#ccc',
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
    fontSize: 30,
    fontWeight: 'bold',
  },
  middleText: {
    marginTop: 20,
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    padding : 10
  },
  linkText: {
    fontSize: 20,
    marginBottom: -5,
    marginTop: -5,
    color: '#ffff',
    textDecorationLine: 'underline',
  },
  footer: {
    marginBottom: 20,
    fontSize: 60,
    color: '#fff',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
  },
});

export default Register;
