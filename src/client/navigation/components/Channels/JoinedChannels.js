import React from "react";
import { Text, StyleSheet, View, FlatList, TouchableOpacity } from "react-native";
import { useGetAdminChannelsQuery } from "../../../reducers/api";
import auth from "../../../../server/auth/firebase";
import { useNavigation } from "@react-navigation/native";

const JoinedChannels = () => {

  const navigation = useNavigation();
  const currentUserId = auth.currentUser ? auth.currentUser.uid : null;

  const { data: channels } = useGetAdminChannelsQuery(currentUserId);

  const handleChannelPress = (channel) => {
    navigation.navigate("Channel", { channel });
  }

 

  return (
    <View style={styles.container}>
      <Text style={styles.text}>My Admin Channels</Text>
      <FlatList
        data={channels}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleChannelPress(item)}>
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
        style={styles.feed}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1, 
    borderColor: 'black', 
    padding: 10
  },
  text: {
    // Your text styles here
  },
});

export default JoinedChannels;
