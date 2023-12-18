import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import PostCard from "../inputs/PostCard";

const UserChannel = ({ isLoading, posts }) => {
  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  console.log('posts from user channel', posts)

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Text>Loading posts...</Text>
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <PostCard post={item} />}
          style={styles.feed}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBECF4",
  },
  feed: {
    marginHorizontal: 16,
  },
});

export default UserChannel;
