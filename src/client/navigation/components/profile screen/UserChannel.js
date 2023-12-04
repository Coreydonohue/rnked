import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import auth from "../../../../server/auth/firebase";
import { useNavigation } from "@react-navigation/native";
import {
  useGetUserChannelQuery,
  useGetCurrentUserPostsQuery,
} from "../../../reducers/api";
import PostCard from "../inputs/PostCard";

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
  // console.log("posts from channel", posts);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (isError) {
    return <Text>Error loading user channel</Text>;
  }

  // console.log('channel from userChannel', channel)

  return (
    <View style={styles.container}>
      {loadingPosts ? (
        <Text>Loading posts...</Text>
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <PostCard post={item} />}
        />
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
