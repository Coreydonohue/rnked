import React from "react";
import { View, Text, FlatList } from "react-native";
import { useGetAllPostsQuery } from "../../reducers/api";
import { useNavigation } from "@react-navigation/native";
import PostCard from "../components/inputs/PostCard";
import LoadingSpinner from "../components/inputs/LoadingSpinner";

const Home = () => {
  const {
    data: posts,
    isLoading: loadingPosts,
    isError: errorPosts,
  } = useGetAllPostsQuery();
  // console.log("posts from home", posts);

  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {loadingPosts ? (
        <LoadingSpinner/> 
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

export default Home;
