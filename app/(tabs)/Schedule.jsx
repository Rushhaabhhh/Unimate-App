import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Dimensions } from 'react-native';
import { Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const apiUrls = [
  'https://run.mocky.io/v3/b30678c1-dd3b-4882-bf53-6520059ef6cc', // Sunday
  'https://run.mocky.io/v3/89111c06-ffc9-4dfc-8e46-38cb504418c7', // Monday
  'https://run.mocky.io/v3/7235018c-50c5-4ad7-a3cf-58c02f6f89a1', // Tuesday
  'https://run.mocky.io/v3/89111c06-ffc9-4dfc-8e46-38cb504418c7', // Wednesday
  'https://run.mocky.io/v3/7235018c-50c5-4ad7-a3cf-58c02f6f89a1', // Thursday
  'https://run.mocky.io/v3/89111c06-ffc9-4dfc-8e46-38cb504418c7', // Friday
  'https://run.mocky.io/v3/b30678c1-dd3b-4882-bf53-6520059ef6cc'  // Saturday
];

const Schedule = () => {
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentWeek, setCurrentWeek] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const dayOfWeek = new Date().getDay();
        const response = await fetch(apiUrls[dayOfWeek]);
        const data = await response.json();
        setSchedule(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching schedule:', error);
        setLoading(false);
      }
    };

    fetchSchedule();
    generateCurrentWeek();
  }, []);

  const generateCurrentWeek = () => {
    const now = new Date();
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
    const week = [];

    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      week.push(day);
    }

    setCurrentWeek(week);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    const dayOfWeek = date.getDay();
    fetchScheduleForDay(dayOfWeek);
  };

  const fetchScheduleForDay = async (dayOfWeek) => {
    try {
      const response = await fetch(apiUrls[dayOfWeek]);
      const data = await response.json();
      setSchedule(data);
    } catch (error) {
      console.error('Error fetching schedule:', error);
    }
  };

  const formatDate = (date) => {
    const day = date.getDate();
    const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'short' });
    const monthYear = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    return { day, dayOfWeek, monthYear };
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  const { day, dayOfWeek, monthYear } = formatDate(selectedDate);

  return (
    <LinearGradient
      colors={['#FFA500', '#D85401', '#1A1A1A']}
      style={styles.gradient}
      start={{ x: -2.7, y: -0.7 }}
      end={{ x: 0.2, y: 0.6 }}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.date}>{day}</Text>
          <View>
            <Text style={styles.day}>{dayOfWeek}</Text>
            <Text style={styles.monthYear}>{monthYear}</Text>
          </View>
        </View>
        <ScrollView horizontal style={styles.week}>
          {currentWeek.map((date, index) => {
            const { day, dayOfWeek } = formatDate(date);
            const isToday = date.toDateString() === new Date().toDateString();
            return (
              <View
                key={index}
                style={[
                  styles.dayContainer,
                  date.toDateString() === selectedDate.toDateString() && styles.selectedDay,
                  isToday && styles.todayIndicator,
                ]}
                onTouchEnd={() => handleDateSelect(date)}
              >
                <Text style={styles.weekDay}>{dayOfWeek.charAt(0)}</Text>
                <Text style={styles.weekDate}>{day}</Text>
              </View>
            );
          })}
        </ScrollView>
        <ScrollView style={styles.schedule}>
          {schedule.map((course, index) => (
            <Card key={index} style={[styles.card, { backgroundColor: course.color || '#2D2F36' }]}>
              <Card.Content>
                <View style={styles.courseHeader}>
                  <Text style={styles.courseTime}>{course.time}</Text>
                </View>
                <Text style={styles.courseTitle}>{course.title}</Text>
                <Text style={styles.courseSubtitle}>{course.subtitle}</Text>
                <View style={styles.courseFooter}>
                  <View style={styles.locationContainer}>
                    <Icon name="room" size={16} color="#ffffff" />
                    <Text style={styles.courseLocation}>{course.location}</Text>
                  </View>
                  <Text style={styles.courseTeacher}>{course.teacher}</Text>
                </View>
              </Card.Content>
            </Card>
          ))}
        </ScrollView>
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
    padding: 16,
    top : 15
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  date: {
    fontSize: 48,
    fontWeight: 'bold',
    marginRight: 16,
    color: '#ffffff',
  },
  day: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  monthYear: {
    fontSize: 16,
    color: '#ffffff',
  },
  week: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  dayContainer: {
    alignItems: 'center',
    padding: 8,
    borderRadius: 4,
    width: width / 7,
  },
  selectedDay: {
    backgroundColor: '#444444',
  },
  todayIndicator: {
    borderWidth: 2,
    borderColor: '#FF9800',
    borderRadius: 4,
  },
  weekDay: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  weekDate: {
    fontSize: 16,
    color: '#ffffff',
  },
  schedule: {
    flex: 1,
  },
  card: {
    marginBottom: 16,
    backgroundColor: '#1a1a1a',
  },
  courseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  courseTime: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  courseTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 8,
    color: '#ffffff',
  },
  courseSubtitle: {
    fontSize: 16,
    color: '#cccccc',
    marginBottom: 8,
  },
  courseFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  courseLocation: {
    marginLeft: 4,
    fontSize: 14,
    color: '#ffffff',
  },
  courseTeacher: {
    fontSize: 14,
    color: '#ffffff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
});

export default Schedule;
