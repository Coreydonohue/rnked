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
  const isJoined = channel.members.find((member) => member.user_id === me?.id)
    ? true
    : false;

  console.log("isAdmin?", isAdmin);
  console.log("is joined?", isJoined);
  // console.log("me", me);
  // console.log("channel", channel);

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

  const handleLeaveChannel = async () => {
    //! create API call for deleting roll and update onPress logic 
    try {
      await leaveChannel(channelId);
      console.log("user left channel", channelId);
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
        {!isJoined ? (
          <Text style={styles.joinButton}>
            {!isPrivate ? "Join Channel" : "Request to Join Channel"}
          </Text>
        ) : (
          <Text style={styles.joinButton}>
            Leave Channel
            {/* {isAdmin ? "Delete Channel" : "Leave Channel"} */}
          </Text>
        )}
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
