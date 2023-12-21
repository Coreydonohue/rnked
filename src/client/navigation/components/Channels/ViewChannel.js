import React from "react";
import { Text, StyleSheet, View, TouchableOpacity, FlatList } from "react-native";
import { useJoinChannelMutation } from "../../../reducers/api";

const ViewChannel = ({ route }) => {

  const [joinChannel] = useJoinChannelMutation();

  const channel = route.params.channel;
  const isPrivate = route.params.channel.private;

  console.log("route from channel", channel);

  const handleJoinPublic = async () => {
    try {
        await joinChannel({
            channelId: channel.id, 
        })
        console.log('channel joined', channel.id)

    }catch (error) {
        console.error("Error joining channel:", error);
    }
  };

  const handleJoinPrivate = async () => {
    // try {
    //     await joinChannel({
    //        name: channelInput, 
    //        private: isPrivate 
    //     })

    // }catch (error) {
    //     console.error("Error creating channel:", error);
    // }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{channel.name}</Text>
      <TouchableOpacity onPress={isPrivate ? handleJoinPrivate : handleJoinPublic}>
        <Text style={styles.joinButton}>
          {!isPrivate ? "Join Channel" : "Request to Join Channel"}
        </Text>
      </TouchableOpacity>
      <Text> Members </Text>
      <FlatList
            data={channel.members}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <Text>{item.user.username}</Text>}
            style={styles.feed}
          />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // Your container styles here
  },
  joinButton: {
    color: "#fff",
    backgroundColor: "#3273FF",
    padding: 12,
    borderRadius: 8,
    textAlign: "center",
    width: 100,
  },
});

export default ViewChannel;
