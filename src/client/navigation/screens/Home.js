import React from "react";
import { View, Text, FlatList, StyleSheet, RefreshControl, ScrollView } from "react-native";
import { useGetAllPostsQuery } from "../../reducers/api";
import { useNavigation } from "@react-navigation/native";
import PostCard from "../components/inputs/PostCard";
import LoadingSpinner from "../components/inputs/LoadingSpinner";
import { useState } from "react";

const Home = () => {
  const {
    data: posts,
    isLoading: loadingPosts,
    isError: errorPosts,
    refetch,
  } = useGetAllPostsQuery();
  // console.log("posts from home", posts);

  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    refetch().then(() => {
      console.log("Data refreshed");
      setRefreshing(false);
    });
  };

  const navigation = useNavigation();

  return (
    // <FlatList
    //   data={posts}
    //   keyExtractor={(item) => item.id.toString()}
    //   renderItem={({ item }) => <PostCard post={item} />}
    //   style={styles.feed}
    //   refreshControl={
    //     <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
    //   }
    // />

    <ScrollView
    style={styles.container}
    refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
    }
  >
    {loadingPosts ? (
      <LoadingSpinner />
    ) : (
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <PostCard post={item} />}
        style={styles.feed}
      />
    )}
  </ScrollView>
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

export default Home;
