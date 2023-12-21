import React from "react";
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useGetJoinRequestsQuery, useJoinChannelMutation } from "../../../reducers/api";

const ViewJoinRequests = ({ channelId }) => {
  const { data: joinRequests } = useGetJoinRequestsQuery(channelId);
  const [joinChannel] = useJoinChannelMutation();
  console.log("join requests from view", joinRequests);
  console.log("channel id from view", channelId);

  const handleAcceptRequest = async (userId) => {
    try {
        await joinChannel({
            channelId: channelId, 
        })
        console.log('channel joined', channelId)

    }catch (error) {
        console.error("Error joining channel:", error);
    }
    console.log("Accepting join request for user ID:", userId);
  };

  return (
    <View style={styles.container}>
      <Text> Join Requests </Text>
      <FlatList
        data={joinRequests}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.joinRequestContainer}>
            <Text>{item.user ? item.user.username : "Unknown User"}</Text>
            <TouchableOpacity onPress={() => handleAcceptRequest(item.user.id)}>
              <Text style={styles.acceptButton}>Accept</Text>
            </TouchableOpacity>
          </View>
        )}
        style={styles.feed}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // Your container styles here
  },
  joinRequestContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 8,
  },
  acceptButton: {
    color: "#fff",
    backgroundColor: "#32CD32", // Green color, you can adjust as needed
    padding: 8,
    borderRadius: 4,
  },
});

export default ViewJoinRequests;
