import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import auth from "../../../../server/auth/firebase";
import { useNavigation } from "@react-navigation/native";
import {
  useGetUserChannelQuery,
  useGetCurrentUserPostsQuery,
} from "../../../reducers/api";

const UserChannel = () => {
  const me = auth.currentUser?.email;
  const navigation = useNavigation();
  // const channel = useGetUserChannelQuery();
  const { data: channel, isLoading, isError } = useGetUserChannelQuery();
  const {
    data: posts,
    isLoading: loadingPosts,
    isError: errorPosts,
  } = useGetCurrentUserPostsQuery();
  console.log("posts from channel", posts);

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Profile");
        console.log("logged out: ", me);
      })
      .catch((error) => alert(error.message));
  };

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (isError) {
    return <Text>Error loading user channel</Text>;
  }

  // console.log('channel from userChannel', channel)

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{channel?.name}</Text>
      <Text style={styles.header}>email: {me}</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText} onPress={handleSignOut}>
          Sign Out
        </Text>
      </TouchableOpacity>

      {loadingPosts ? (
        <Text>Loading posts...</Text>
      ) : (
        <View>
          {posts.map((post) => (
            <Text key={post.id}>{post.title}</Text>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: "40%",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
});

export default UserChannel;
