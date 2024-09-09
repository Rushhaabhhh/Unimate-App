import React, { useEffect, useState } from "react";
import { ScrollView, Text, View, StatusBar, Animated, Easing } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from 'expo-router'; 
import indexStyles from "./indexStyles";

const logoImage = require("../assets/newlogo1.png");



const Page = () => {
  const [loading, setLoading] = useState(true);
  const [navigationComplete, setNavigationComplete] = useState(false);
  const progress = new Animated.Value(0);
  const [titleAnimation] = useState(new Animated.Value(0)); 
  const [subtitleAnimation] = useState(new Animated.Value(0));
  const router = useRouter(); 
  useEffect(() => {
    animateProgressBar();
    animateImage();
    animateText(); 
    const timeout = setTimeout(() => {
      setLoading(false); 
    }, 3000);

    return () => {
      clearTimeout(timeout); 
      progress.setValue(0); 
    };
  }, []);

  useEffect(() => {
    if (!loading && !navigationComplete) {
      setNavigationComplete(true); 
      router.push('./register');
    }
  }, [loading, navigationComplete]);

  const animateImage = () => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 2000, 
      easing: Easing.ease, 
      useNativeDriver: false,
    }).start();
  }

  const imageStyle = {
    opacity : progress,
    transform: [
      {
        scale: progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0.5, 1],
        }),
      },
    ],
  };

  const animateText = () => {
    Animated.parallel([
      Animated.timing(titleAnimation, {
        toValue: 1,
        duration: 1000,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(subtitleAnimation, {
        toValue: 1,
        duration: 1000,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();
  };

  const animateProgressBar = () => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 3000, 
      easing: Easing.linear, 
      useNativeDriver: false,
    }).start();
  };

  const titleStyle = {
    opacity: titleAnimation,
    transform: [
      {
        translateX: titleAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [-100, 0],
        }),
      },
    ],
  };

  const subtitleStyle = {
    opacity: subtitleAnimation,
    transform: [
      {
        translateX: subtitleAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [-100, 0],
        }),
      },
    ],
  };

  const interpolatedWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <View style={indexStyles.container}>
          <View style={indexStyles.main}>
            <Animated.Image style={[indexStyles.image, imageStyle]} source={logoImage} />
            <Animated.Text style={[indexStyles.title, titleStyle]}>UNIMATE</Animated.Text>
            <Animated.Text style={[indexStyles.subtitle, subtitleStyle]}>Your campus in one app!</Animated.Text>
            {/* Loader */}
            {loading && (
              <View style={indexStyles.loaderContainer}>
                <Animated.View style={[indexStyles.loaderBar, { width: interpolatedWidth }]} />
              </View>
            )}
          </View>
        </View>
      </ScrollView>
      <StatusBar barStyle="light-content" />
    </SafeAreaView>
  );
};

export default Page;
