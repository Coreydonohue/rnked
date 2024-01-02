import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { Rating } from '@rneui/themed';

const review = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Review tab</Text>
      <Rating showRating fractions="{0.5}" startingValue="{0.0}" />
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

export default review;