import React from "react";
import { View, Text, FlatList } from "react-native";
import { useGetAllPostsQuery } from "../../reducers/api";
import PostCard from "../components/inputs/PostCard";

const Home = ({navigation}) => {

  const {
    data: posts,
    isLoading: loadingPosts,
    isError: errorPosts,
  } = useGetAllPostsQuery();
  console.log("posts from home", posts);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
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

export default Home;
