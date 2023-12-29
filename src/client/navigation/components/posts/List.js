import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

const list = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>List tab </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // Your container styles here
  },
  text: {
    // Your text styles here
  },
});

export default list;