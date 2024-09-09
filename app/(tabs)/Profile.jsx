import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Modal, TextInput, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';


const Profile = () => {
  const [userData, setUserData] = useState({
    name: 'Ethan Blake',
    username: 'ethanWizard',
    email: 'ethan78@gmail.com',
    bio: 'Sophomore at Scaler School of Technology. Currently crafting an mobile app that leverages AI for personalized learning experiences. A keen eye for emerging tech and a love for problem-solving,',
    profileImage: 'https://avatarfiles.alphacoders.com/207/thumb-1920-207641.jpg' 
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [imageUri, setImageUri] = useState(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      // Uncomment this when you're ready to fetch from the backend
      // const response = await axios.get('http://localhost:8080//user/profile');
      // setUserData(response.data);

      // For now, we'll use dummy data
      setUserData({
        name: 'Ethan Blake',
    username: 'ethanWizard',
    email: 'ethan78@gmail.com',
    bio: 'Sophomore at Scaler School of Technology. Currently crafting an mobile app that leverages AI for personalized learning experiences. A keen eye for emerging tech and a love for problem-solving,',
    profileImage: 'https://img.freepik.com/premium-photo/close-up-man-cartoon-character-smiling_1086710-10977.jpg?ga=GA1.1.1013454858.1723968449&semt=ais_hybrid' 
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
      // Alert.alert('Error', 'Failed to load user data');
    }
  };

  const updateUserData = async () => {
    try {
      // Uncomment this when you're ready to update to the backend
      // const response = await axios.get('http://localhost:8080//user/profile', { ...editedData, profileImage: imageUri });
      
      // For now, we'll just update the local state
      setUserData({ ...userData, ...editedData, profileImage: imageUri });
      setIsEditing(false);
      Alert.alert('Success', 'Profile updated successfully');
    } catch (error) {
      console.error('Error updating user data:', error);
      Alert.alert('Error', 'Failed to update profile');
    }
  };

  const handleEdit = () => {
    setEditedData({ ...userData });
    setImageUri(userData.profileImage); 
    setIsEditing(true);
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  return (
    <LinearGradient
      colors={['#FFA500', '#D85401', '#1A1A1A']}
      style={styles.container}
      start={{ x: -2.7, y: -0.7 }}
      end={{ x: 0.2, y: 0.6 }}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: userData.profileImage }}
            style={styles.profileImage}
          />
          <TouchableOpacity style={styles.editImageButton} onPress={handleEdit}>
            <Feather name="edit-2" size={24} color="#D85401" />
          </TouchableOpacity>
        </View>

        <Text style={styles.welcomeText}>
          Hi {userData.name},{'\n'}
          Welcome to Unimate
        </Text>

        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>
            Here you are known as <Text style={styles.highlight}>{userData.username} </Text> 
            marking your digital footprint with <Text style={styles.highlight}>{userData.email}</Text>
          </Text>
          <View style={styles.divider}>
          <Text style={styles.bioTitle}>Legend's Spotlight:</Text>
          <Text style={styles.bioText}>{userData.bio}</Text>
          </View>
        </View>

        <Text style={styles.otherwelcomeText}>
          Let's become 1% better every day.
        </Text>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isEditing}
        onRequestClose={() => setIsEditing(false)}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Edit Profile</Text>
          <TouchableOpacity style={styles.imagePickerButton} onPress={pickImage}>
            <Text style={styles.imagePickerText}>Pick an Image</Text>
          </TouchableOpacity>
          {imageUri && <Image source={{ uri: imageUri }} style={styles.modalProfileImage} />}
          <TextInput
            style={[styles.input, styles.modalInput]}
            value={editedData.name}
            onChangeText={(text) => setEditedData({ ...editedData, name: text })}
            placeholder="Name"
          />
          <TextInput
            style={[styles.input, styles.modalInput]}
            value={editedData.username}
            onChangeText={(text) => setEditedData({ ...editedData, username: text })}
            placeholder="Username"
          />
          <TextInput
            style={[styles.input, styles.modalInput]}
            value={editedData.email}
            onChangeText={(text) => setEditedData({ ...editedData, email: text })}
            placeholder="Email"
            keyboardType="email-address"
          />
          <TextInput
            style={[styles.input, styles.modalBioInput]}
            value={editedData.bio}
            onChangeText={(text) => setEditedData({ ...editedData, bio: text })}
            placeholder="Bio"
            multiline
          />
          <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={updateUserData}>
            <Text style={styles.buttonText}>Save Changes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={() => setIsEditing(false)}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
    top: 50,
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  editImageButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'left',
    left : -60,
    marginBottom: 20,
    lineHeight: 30,
  },
  infoContainer: {
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  infoText: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'left',
    left : -20,
    marginBottom: 30,
  },
  highlight: {
    fontWeight: 'bold',
    color: '#D85401',
  },
  divider: {
    backgroundColor: '#3B3631',
    padding: 20,
    paddingBottom : 50,
    borderRadius: 30,
  },
  bioTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 5,
  },
  bioText: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 24,
  },
  otherwelcomeText: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 250,
    fontStyle: 'italic',
  },
  modalView: {
    margin: 20,
    top: 100,
    backgroundColor: '#1A1A1A',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFA500',
    marginBottom: 15,
  },
  imagePickerButton: {
    backgroundColor: '#D85401',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginBottom: 15,
  },
  imagePickerText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalProfileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  input: {
    width: '90%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#2E2E2E',
    color: 'white',
  },
  modalInput: {
    backgroundColor: '#2E2E2E',
  },
  modalBioInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#D85401',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  saveButton: {
    backgroundColor: '#D85401',
  },
  cancelButton: {
    backgroundColor: '#5C5555',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  }
});

export default Profile;
