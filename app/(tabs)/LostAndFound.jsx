import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, StyleSheet, ScrollView, Alert, TouchableOpacity, Pressable, Modal } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';

const LostandFound = () => {
  const [photo, setPhoto] = useState(null);
  const [caption, setCaption] = useState('');
  const [entries, setEntries] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    loadEntries();
    requestPermissions();
  }, []);

  const requestPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Sorry, we need camera roll permissions to make this work!');
    }
  };

  const loadEntries = async () => {
    try {
      const savedEntries = await AsyncStorage.getItem('entries');
      if (savedEntries) {
        const parsedEntries = JSON.parse(savedEntries);
        setEntries(parsedEntries.sort((a, b) => b.timestamp - a.timestamp));
      }
    } catch (error) {
      console.log('Failed to load entries:', error);
    }
  };

  const saveEntries = async (newEntries) => {
    try {
      await AsyncStorage.setItem('entries', JSON.stringify(newEntries));
    } catch (error) {
      console.log('Failed to save entries:', error);
    }
  };

  const selectImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPhoto({ uri: result.assets[0].uri });
    }
  };

  const addEntry = () => {
    if (photo && caption) {
      const newEntry = { photo, caption, timestamp: Date.now() };
      const newEntries = [newEntry, ...entries];
      setEntries(newEntries);
      saveEntries(newEntries);
      setPhoto(null);
      setCaption('');
    } else {
      Alert.alert('Please select a photo and write a caption.');
    }
  };

  const openImageModal = (image) => {
    setSelectedImage(image);
    setModalVisible(true);
  };

  const closeImageModal = () => {
    setModalVisible(false);
    setSelectedImage(null);
  };

  return (
    <LinearGradient
      colors={['#FFA500','#D85401', '#1A1A1A']}
      style={styles.gradient}
      start={{ x: -2.7, y: -0.7 }}
      end={{ x: 0.2, y: 0.6 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Lost and Found</Text>
        <Pressable
          onPress={selectImage}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? '#D86F02' : '#D85401',
              transform: pressed ? [{ scale: 0.95 }] : [{ scale: 1 }],
            },
            styles.button,
          ]}
        >
          <Text style={styles.buttonText}>Add Photo</Text>
        </Pressable>
        {photo && <Image source={photo} style={styles.image} />}
        <TextInput
          style={styles.input}
          placeholder="Write a caption..."
          placeholderTextColor="#D85401"
          value={caption}
          onChangeText={setCaption}
        />
        <Pressable
          onPress={addEntry}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? '#D86F02' : '#D85401',
              transform: pressed ? [{ scale: 0.95 }] : [{ scale: 1 }],
            },
            styles.button,
          ]}
        >
          <Text style={styles.buttonText}>Submit</Text>
        </Pressable>
        <View style={styles.entries}>
          {entries.map((entry, index) => (
            <View key={index} style={styles.entry}>
              <TouchableOpacity onPress={() => openImageModal(entry.photo)}>
                <Image source={entry.photo} style={styles.entryImage} />
              </TouchableOpacity>
              <Text style={styles.entryCaption}>{entry.caption}</Text>
            </View>
          ))}
        </View>

        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={closeImageModal}
        >
          <View style={styles.modalContainer}>
            <TouchableOpacity style={styles.modalCloseButton} onPress={closeImageModal}>
              <Text style={styles.modalCloseText}>Close</Text>
            </TouchableOpacity>
            {selectedImage && (
              <Image source={selectedImage} style={styles.fullscreenImage} />
            )}
          </View>
        </Modal>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    padding: 20,
    top: 50,
  },
  header: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    marginTop: 10,
    borderRadius: 10,
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: '#D85401',
  },
  input: {
    height: 50,
    borderColor: '#D85401',
    borderWidth: 1,
    marginTop: 10,
    paddingLeft: 8,
    color: '#FFFFFF',
    backgroundColor: '#1E1E1E',
    borderRadius: 5,
    marginBottom: 20,
  },
  button: {
    height: 50,
    left: 40,
    width: '80%',
    backgroundColor: '#D85401',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  entries: {
    marginTop: 20,
  },
  entry: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
    paddingBottom: 10,
  },
  entryImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  entryCaption: {
    marginTop: 10,
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCloseButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    padding: 10,
    backgroundColor: '#D85401',
    borderRadius: 20,
  },
  modalCloseText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  fullscreenImage: {
    width: '90%',
    height: '80%',
    borderRadius: 10,
    resizeMode: 'contain',
  },
});

export default LostandFound;
