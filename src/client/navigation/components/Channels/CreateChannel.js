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
import { useNavigation } from "@react-navigation/native";

const CreateChannel = () => {
  const navigation = useNavigation();
  const [createChannel] = useCreateChannelMutation();
  const [channelInput, setChannelInput] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);

  const handleChannelSubmit = async () => {
    try {
        const response = await createChannel({
           name: channelInput, 
           private: isPrivate 
        })
        setChannelInput("")
        setIsPrivate(false)
        // navigation.navigate("Channel", response.id); //! navigate to new channel page
    }catch (error) {
        console.error("Error creating channel:", error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.channelInput}
        placeholder="Channel Name"
        placeholderTextColor="#A9A9A9" 
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
    minHeight: 50,
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
