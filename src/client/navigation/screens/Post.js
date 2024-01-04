import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useState } from "react";
import Standard from "../components/posts/standard";
import List from "../components/posts/list";
import Review from "../components/posts/review";
import { ButtonGroup } from "@rneui/themed";

const Post = () => {
  const [selectedTab, setSelectedTab] = useState(1); 

  const handleTabPress = (tab) => {
    setSelectedTab(tab);
  };

  return (
<View style={styles.container}>
      <View style={styles.buttonGroupContainer}>
        <TouchableOpacity
          style={[
            styles.buttonStyle,
            selectedTab === 0 && styles.selectedButtonStyle,
          ]}
          onPress={() => handleTabPress(0)}
        >
          <Text>Standard</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.buttonStyle,
            selectedTab === 1 && styles.selectedButtonStyle,
          ]}
          onPress={() => handleTabPress(1)}
        >
          <Text>List</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.buttonStyle,
            selectedTab === 2 && styles.selectedButtonStyle,
          ]}
          onPress={() => handleTabPress(2)}
        >
          <Text>Review</Text>
        </TouchableOpacity>
      </View>
      {selectedTab === 0 && <Standard />}
      {selectedTab === 1 && <List />}
      {selectedTab === 2 && <Review />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonGroupContainer: {
    flexDirection: "row", // Align buttons horizontally
    width: "85%",
    justifyContent: "space-between", // Add space between buttons
    position: "absolute",
    top: 0,
  },
  buttonStyle: {
    padding: 15,
    flex: 1,
    marginHorizontal: 5, // Add space between buttons
    borderRadius: 10,
    borderWidth: 1, // Add border
    borderColor: "#ccc", // Border color
  },
  selectedButtonStyle: {
    backgroundColor: "#48cae4",
    borderColor: "#fff", 
  },
  text: {
    fontSize: 26,
    fontWeight: "bold",
  },
});

export default Post;
