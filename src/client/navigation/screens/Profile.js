import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from "react-native";
import UserChannel from "../components/profile screen/UserChannel";
import UserCard from "../components/profile screen/UserCard";
import auth from "../../../server/auth/firebase";
import { useNavigation } from "@react-navigation/native";
import {
  useGetCurrentUserQuery,
  useGetCurrentUserPostsQuery,
  useGetUserChannelQuery,
  useGetUserbyIdQuery,
  useGetPostsByUserIdQuery,
} from "../../reducers/api";
import LoadingSpinner from "../components/inputs/LoadingSpinner";

const Profile = ({ route, me }) => {
  const navigation = useNavigation();
  const userId = route.params ? route.params.userId : me?.id;
  console.log("user id from profile tab", userId);

  const { data: posts, isLoading: postsLoading } =
    useGetPostsByUserIdQuery(userId);


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{
       
        }}
        showsVerticalScrollIndicator={false}
      >
        <UserCard userId={userId} posts={posts} />
        <UserChannel isLoading={postsLoading} posts={posts} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "#fff",
    // padding: 20,
  },
 
});

export default Profile;
