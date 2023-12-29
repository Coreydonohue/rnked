import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { ButtonGroup } from "@rneui/themed";
import Ionicons from "react-native-vector-icons/Ionicons";

const GroupButton = ({button1, button2, button3}) => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  return (
    <View style={styles.container}>
      <ButtonGroup
        buttonStyle={{ padding: 15 }}
        selectedButtonStyle={{ backgroundColor: "#023047" }}
        buttons={[
          <Text>{button1}</Text>, 
          <Text>{button2}</Text>, 
          <Text>{button3}</Text>, 
        ]}
        selectedIndex={selectedIndex}
        onPress={setSelectedIndex}
      />
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

export default GroupButton;
