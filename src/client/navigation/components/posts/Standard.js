import React from "react";
import { useState } from "react";
import { Text, StyleSheet, View } from "react-native";
import { useCreateNewPostMutation } from "../../../reducers/api";
import FormButton from "../inputs/FormButton";
import InputField from "../inputs/InputField";

const Standard = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [createPost] = useCreateNewPostMutation();

  const handlePost = async () => {
    try {
      const response = await createPost({
        title: title,
        content: content,
      });
      setTitle("");
      setContent("");
      console.log("new post", response);
    } catch (err) {
      console.error("Error creating group:", err);
    }
  };
  return (
    <View style={styles.container}>
      <InputField
        onChangeText={(userInput) => setTitle(userInput)}
        placeholderText="Title"
        iconType="user"
        keyboardType="default"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <InputField
        onChangeText={(userInput) => setContent(userInput)}
        placeholderText="Body (optional)" 
        iconType="user" 
        keyboardType="default"
        autoCapitalize="none"
        autoCorrect={false}
        multiline
        style={styles.contentInput}
      />
      <FormButton buttonTitle="Submit" onPress={handlePost} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // Your container styles here
  },
  contentInput: {
    // height: 120, // Adjust the height based on your design
    // textAlignVertical: "top", // Start text from the top
  },
});

export default Standard;
