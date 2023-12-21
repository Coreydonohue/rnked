import React from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { CheckBox } from "react-native-elements";
import { useState } from "react";
import { useCreateChannelMutation } from "../../../reducers/api";

const CreateChannel = () => {
  const [createChannel] = useCreateChannelMutation();
  const [channelInput, setChannelInput] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);

  const handleChannelSubmit = async () => {
    try {
        await createChannel({
           name: channelInput, 
           private: isPrivate 
        })
        setChannelInput("")
        setIsPrivate(false)
    }catch (error) {
        console.error("Error creating channel:", error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.channelInput}
        placeholder="Type your comment here"
        multiline
        value={channelInput}
        onChangeText={(text) => setChannelInput(text)}
      />
         <CheckBox
        title="Make Private"
        checked={isPrivate}
        onPress={() => setIsPrivate(!isPrivate)}
        containerStyle={styles.checkBoxContainer}
      />
      <TouchableOpacity onPress={handleChannelSubmit}>
        <Text style={styles.submitButton}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // Your container styles here
  },
  channelInput: {
    borderWidth: 1,
    borderColor: "#73788B",
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
    width: "100%",
    minHeight: 100,
  },
  submitButton: {
    color: "#fff",
    backgroundColor: "#3273FF",
    padding: 12,
    borderRadius: 8,
    textAlign: "center",
  },
  checkBoxContainer: {
    backgroundColor: "transparent",
    borderWidth: 0,
    margin: 0,
    padding: 0,
  },
});

export default CreateChannel;
