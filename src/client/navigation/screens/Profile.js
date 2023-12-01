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
import auth from "../../../server/auth/firebase";
import { useNavigation } from "@react-navigation/native";
import {
  useGetCurrentUserQuery,
  useGetCurrentUserPostsQuery,
} from "../../reducers/api";

const Profile = () => {
  const navigation = useNavigation();

  const { data: me, isLoading, isError } = useGetCurrentUserQuery();
  // console.log("current user from profile", me);

  const {
    data: posts,
    isLoading: loadingPosts,
    isError: errorPosts,
  } = useGetCurrentUserPostsQuery();

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Profile");
        console.log("logged out: ", me);
      })
      .catch((error) => alert(error.message));
  };

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
        <Image
          style={styles.userImg}
          source={require("../assets/profile-pic.png")}
        />
        <Text style={styles.userName}>{me?.username}</Text>
        <Text style={styles.aboutUser}>add 'about' to user schema</Text>
        <View style={styles.userBtnWrapper}>
          <TouchableOpacity style={styles.userBtn}>
            <Text style={styles.userBtnTxt}>Follow</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.userBtn}>
            <Text style={styles.userBtnTxt}>Message</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.userBtn}>
            <Text style={styles.userBtnTxt} onPress={handleSignOut}>Sign Out</Text>
          </TouchableOpacity>
        </View>

        {/* //! replace hardcoded  */}
        <View style={styles.userInfoWrapper}>
          <View style={styles.userInfoItem}>
            <Text style={styles.userInfoTitle}>{posts ? posts.length : 0}</Text>
            <Text style={styles.userInfoSubTitle}>Posts</Text>
          </View>
          <View style={styles.userInfoItem}>
            <Text style={styles.userInfoTitle}>10,000</Text>
            <Text style={styles.userInfoSubTitle}>Followers</Text>
          </View>
          <View style={styles.userInfoItem}>
            <Text style={styles.userInfoTitle}>100</Text>
            <Text style={styles.userInfoSubTitle}>Following</Text>
          </View>
        </View>
        <UserChannel />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  userImg: {
    height: 150,
    width: 150,
    borderRadius: 75,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
  },
  aboutUser: {
    fontSize: 12,
    fontWeight: "600",
    color: "#666",
    textAlign: "center",
    marginBottom: 10,
  },
  userBtnWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    marginBottom: 10,
  },
  userBtn: {
    borderColor: "#2e64e5",
    borderWidth: 2,
    borderRadius: 3,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 5,
  },
  userBtnTxt: {
    color: "#2e64e5",
  },
  userInfoWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginVertical: 20,
  },
  userInfoItem: {
    justifyContent: "center",
  },
  userInfoTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  userInfoSubTitle: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
});

export default Profile;
