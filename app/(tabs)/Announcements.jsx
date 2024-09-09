import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator, Modal, TextInput, Button } from 'react-native';
import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';

const Announcements = () => {
  // Dummy data
  const dummyAnnouncements = [
    {
      _id: '1',
      photo: 'https://scaler-blog-prod-wp-content.s3.ap-south-1.amazonaws.com/wp-content/uploads/2023/07/22114601/SST.jpg',
      message: 'Welcome to the Scaler School of Technology, Batch 2028! We are excited to have you join our community of innovators and technologists. Get ready for an amazing journey of learning and growth.',
      timestamp: new Date().toISOString(),
    },
    {
      _id: '2',
      photo: 'https://institute.careerguide.com/wp-content/uploads/2024/03/Santosh-Kardak-SST-Macro-Campus-36.jpg',
      message: 'Scaler School of Technology proudly announces the launch of our new AI-driven curriculum, which will empower our students with cutting-edge skills in artificial intelligence and machine learning.',
      timestamp: new Date().toISOString(),
    },
    {
      _id: '3',
      photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsJMB4vNQsEACpkeQAwmRLR68xdfJtq68Nuw&s',
      message: 'After SST, Scaler School of Business is launching a transformative educational experience focused on equipping future leaders with essential skills in business and technology. This program offers a dynamic curriculum, expert mentorship, and real-world projects designed to prepare students for successful careers in the modern business landscape. Join us to shape your professional future!',
      timestamp: new Date().toISOString(),
    },
    {
      _id: '4',
      photo: 'https://media.assettype.com/freepressjournal/2022-02/b5919235-b31b-49d1-8c74-1c66d7604fb5/Abhimanyu_Saxena___Anshuman_Singh___Co_Founders__IB___Scaler.png',
      message: 'We are thrilled to announce the grand opening of the Scaler School of Technology! Join us as we embark on a new chapter of excellence in education and innovation. Stay tuned for our opening event details.',
      timestamp: new Date().toISOString(),
    }
  ];

  const [announcements, setAnnouncements] = useState(dummyAnnouncements);
  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newAnnouncement, setNewAnnouncement] = useState({
    photo: '',
    message: '',
  });
  const [selectedImage, setSelectedImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      const base64Image = `data:image/jpeg;base64,${result.assets[0].base64}`;
      setSelectedImage(base64Image);
      setNewAnnouncement({ ...newAnnouncement, photo: base64Image });
    }
  };

  const handleAddAnnouncement = () => {
    const newAnn = {
      ...newAnnouncement,
      _id: (announcements.length + 1).toString(),
      timestamp: new Date().toISOString(),
      photo: selectedImage || 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg==',
    };
    setAnnouncements([newAnn, ...announcements]);
    setNewAnnouncement({ photo: '', message: '' });
    setSelectedImage(null);
    handleCloseModal();
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#ffffff" style={styles.loading} />;
  }

  return (
        <LinearGradient
      colors={['#FFA500','#D85401', '#1A1A1A']}
      style={styles.gradient}
      start={{ x: -2.7, y: -0.7 }}
      end={{ x: 0.2, y: 0.6 }}
    >
    <View style={styles.container}>
        <Text style={styles.title}>Announcements</Text>

        {isAdmin && (
          <TouchableOpacity style={styles.createButton} onPress={() => setIsModalVisible(true)}>
            <Text style={styles.createButtonText}>+</Text>
          </TouchableOpacity>
        )}

        <FlatList
          data={announcements}
          renderItem={({ item }) => (
            <View style={styles.announcement}>
              <Image source={{ uri: item.photo }} style={styles.photo} />
              <View style={styles.content}>
                <Text style={styles.message}>{item.message}</Text>
                <Text style={styles.timestamp}>{new Date(item.timestamp).toLocaleString()}</Text>
              </View>
            </View>
          )}
          keyExtractor={(item) => item._id}
        />

        <Modal
          visible={isModalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={handleCloseModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Add New Announcement</Text>
              <TouchableOpacity style={styles.imagePickerButton} onPress={pickImage}>
                <Text style={styles.imagePickerText}>Pick an image</Text>
              </TouchableOpacity>
              {selectedImage && (
                <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
              )}
              <TextInput
                style={styles.input}
                placeholder="Message"
                value={newAnnouncement.message}
                onChangeText={(text) => setNewAnnouncement({ ...newAnnouncement, message: text })}
                multiline
              />
              <Button title="Add Announcement" onPress={handleAddAnnouncement} />
              <Button title="Cancel" onPress={handleCloseModal} color="red" />
            </View>
          </View>
        </Modal>
      </View>
    </LinearGradient>
  );
};


const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    top : 15
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
    marginBottom: 20,
  },
  announcement: {
    marginBottom: 20,
    backgroundColor: '#1e1e1e',
    borderRadius: 10,
    overflow: 'hidden',
  },
  photo: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  content: {
    padding: 10,
  },
  message: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 10,
  },
  timestamp: {
    fontSize: 14,
    color: '#888',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  createButton: {
    backgroundColor: '#D85401',
    width: 40,
    height: 40,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom: 20,
    right: 20,
    zIndex: 1,
  },
  createButtonText: {
    top: -5,
    color: '#fff',
    fontSize: 35,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#1e1e1e',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#333',
    color: '#fff',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  imagePickerButton: {
    backgroundColor: '#444',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  imagePickerText: {
    color: '#fff',
  },
  selectedImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
});

export default Announcements;
