import React from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import {
  useJoinChannelMutation,
  useCreateJoinRequestMutation,
  useGetCurrentUserQuery,
} from "../../../reducers/api";
import ViewJoinRequests from "./ViewJoinRequests";

const ViewChannel = ({ route }) => {
  const [joinChannel] = useJoinChannelMutation();
  const [joinRequest] = useCreateJoinRequestMutation();
  const { data: me } = useGetCurrentUserQuery();

  const channel = route.params.channel;
  const channelId = channel.id;
  const isPrivate = route.params.channel.private;
  const isAdmin = channel.admin_id === me.id ? true : false;
  // const isJoined = ch

  console.log("isAdmin?", isAdmin);
  // console.log("me", me);
  console.log("channel", channel);

  const handleJoinPublic = async () => {
    try {
      await joinChannel({
        channelId: channelId,
      });
      console.log("channel joined", channelId);
    } catch (error) {
      console.error("Error joining channel:", error);
    }
  };

  const handleJoinPrivate = async () => {
    try {
      await joinRequest(channelId);
      console.log("join requested sent", channelId);
    } catch (error) {
      console.error("Error joining channel:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{channel.name}</Text>
      <TouchableOpacity
        onPress={isPrivate ? handleJoinPrivate : handleJoinPublic}
      >
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
      {isAdmin ? <ViewJoinRequests channelId={channelId} /> : null}

      {/* //! add check for admin  */}
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
