import React from "react";
import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import InputField from "../components/inputs/InputField";
import FormButton from "../components/inputs/FormButton";
import { useCreateNewPostMutation } from "../../reducers/api";

const Post = ({ navigation }) => {
  const [post, setPost] = useState("");
  const [createPost] = useCreateNewPostMutation();

  const handlePost = async () => {
    try {
      const response = await createPost({
        title: post,
      });
      setPost("");
      console.log('new post', response)
    } catch (err) {
      console.error("Error creating group:", err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Post Screen</Text>
      <InputField
        onChangeText={(userInput) => setPost(userInput)}
        placeholderText="add post info"
        iconType="user"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <FormButton buttonTitle="submit" onPress={handlePost} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    fontSize: 26,
    fontWeight: "bold",
  },
  text: {
    fontSize: 26,
    fontWeight: "bold",
  },
});

export default Post;
