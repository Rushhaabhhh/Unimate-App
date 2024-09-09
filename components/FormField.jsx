import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const FormField = ({ title, value, placeholder, handleChangeText, otherStyles, ...props }) => {
    const [showPassword, setShowPassword] = React.useState(false);
  return (
    <GestureHandlerRootView>
    <View style={styles.container}>
      <Text>{title}</Text>
      <TextInput
        value={value}
        placeholder={placeholder}
        placeholderTextColor="grey"
        onChangeText={handleChangeText}
        secureTextEntry={title === 'Password' && !showPassword}
        style={[styles.input, otherStyles]} 
        {...props}
      />
        {title === 'Password' && (
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image source={!showPassword ? icons.eye : icons.eyeHide} style={{ width: 6, height: 6 }} />
            </TouchableOpacity>
        )}
    </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
});

export default FormField;
