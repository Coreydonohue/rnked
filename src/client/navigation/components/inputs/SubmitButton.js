import React from 'react';
import {StyleSheet, View } from 'react-native';
import { Button, ButtonGroup, withTheme, Text } from '@rneui/themed';

const SubmitButton = ({ title, icon, onPress }) => {
  return (
    // <Button title="Solid" type="solid" icon="home" />
    <Button
    onPress={onPress}
    title={title}
    icon={icon}
    iconContainerStyle={{ marginRight: 10 }}
    titleStyle={{ fontWeight: '700' }}
    buttonStyle={{
      backgroundColor: 'rgba(90, 154, 230, 1)',
      borderColor: 'transparent',
      borderWidth: 0,
      borderRadius: 30,
    }}
    containerStyle={{
      width: 200,
      marginHorizontal: 50,
      marginVertical: 10,
    }}
  />
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

export default SubmitButton;