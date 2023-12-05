import React from "react";
import { StyleSheet, ScrollView, SafeAreaView } from "react-native";
import {
  useGetUserbyIdQuery,
  useGetPostsByUserIdQuery,
} from "../../reducers/api";
import UserChannel from "../components/profile screen/UserChannel";
import UserCard from "../components/profile screen/UserCard";

const UserScreen = ({ route }) => {
  const { userId } = route.params;
  const { data: user } = useGetUserbyIdQuery(userId);
  const { data: posts, isLoading } = useGetPostsByUserIdQuery(userId);


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
        }}
        showsVerticalScrollIndicator={false}
      >
        <UserCard user={user} posts={posts} />
        <UserChannel isLoading={isLoading} posts={posts} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // Your container styles here
  },
  text: {
    // Your text styles here
  },
});

export default UserScreen;
