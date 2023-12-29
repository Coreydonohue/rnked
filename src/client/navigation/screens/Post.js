import React, { useState } from "react";
import { View, Text, StyleSheet, Picker } from "react-native";
import InputField from "../components/inputs/InputField";
import FormButton from "../components/inputs/FormButton";
import { useCreateNewPostMutation } from "../../reducers/api";

const Post = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [postType, setPostType] = useState("post"); // Default post type
  const [createPost] = useCreateNewPostMutation();

  const handlePost = async () => {
    try {
      const response = await createPost({
        title: title,
        content: content,
        type: postType,
      });
      setTitle("");
      setContent("");
      setPostType("post"); // Reset post type to default after submission
      console.log('new post', response)
    } catch (err) {
      console.error("Error creating group:", err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Post Screen</Text>
      <Text style={styles.text}>Select Post Type:</Text>
      <Picker
        selectedValue={postType}
        onValueChange={(itemValue) => setPostType(itemValue)}
        style={{ height: 50, width: 150 }}
      >
        <Picker.Item label="Post" value="post" />
        <Picker.Item label="List" value="list" />
        <Picker.Item label="Review" value="review" />
      </Picker>

      {postType === "post" && (
        <InputField
          onChangeText={(userInput) => setTitle(userInput)}
          placeholderText="Title"
          iconType="user"
          keyboardType="default"
          autoCapitalize="none"
          autoCorrect={false}
        />
      )}

      {postType === "list" && (
        <InputField
          onChangeText={(userInput) => setTitle(userInput)}
          placeholderText="List Title"
          iconType="user"
          keyboardType="default"
          autoCapitalize="none"
          autoCorrect={false}
        />
      )}

      {postType === "review" && (
        <InputField
          onChangeText={(userInput) => setTitle(userInput)}
          placeholderText="Review Title"
          iconType="user"
          keyboardType="default"
          autoCapitalize="none"
          autoCorrect={false}
        />
      )}

      <InputField
        onChangeText={(userInput) => setContent(userInput)}
        placeholderText="Content"
        iconType="user"
        keyboardType="default"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <FormButton buttonTitle="Submit" onPress={handlePost} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 26,
    fontWeight: "bold",
  },
});

export default Post;
