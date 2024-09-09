import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { Icon } from 'react-native-elements'; 
import React from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';

const TabIcon = ({ icon, color }) => {
  return (
    <View style={{ alignItems: 'center' }}>
      <Icon name={icon} color={color} size={28} />
    </View>
  );
};

export default function TabLayout() {
  return (
    <SafeAreaView style={styles.container}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#D85401',
          tabBarStyle: styles.tabBarStyle,
          headerShown: false, 
          tabBarLabelStyle: { display: 'none' }, 
          tabBarIconStyle: { marginTop: 0 }, 
        }}
      >
        <Tabs.Screen
          name="Announcements"
          options={{
            tabBarIcon: ({ color }) => <TabIcon icon="home" color={color} />,
          }}
        />

        <Tabs.Screen
          name="Schedule"
          options={{
            tabBarIcon: ({ color }) => <FontAwesome size={28} name="clock-o" color={color} />,
          }}
        />

        <Tabs.Screen
          name="Profile"
          options={{
            tabBarIcon: ({ color }) => <FontAwesome size={28} name="circle-o" color={color} />,
          }}
        />  

        <Tabs.Screen
          name="LostAndFound"
          options={{
            tabBarIcon: ({ color }) => <FontAwesome size={28} name="plus-square-o" color={color} />,
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A', 
  },
  tabBarStyle: {
    backgroundColor: '#1A1A1A',
    borderTopColor: 'transparent',
    paddingBottom: 15, 
    paddingTop: 5,
  },
});
