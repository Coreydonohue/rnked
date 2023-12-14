import React from "react";
import { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from "react-native";
import auth from "../../../../server/auth/firebase";
import { useNavigation } from "@react-navigation/native";
import {
  useGetCurrentUserQuery,
  useGetUserbyIdQuery,
  useCreateNewFollowerMutation,
  useDeleteFollowMutation,
} from "../../../reducers/api";
import LoadingSpinner from "../inputs/LoadingSpinner";

const UserCard = ({ userId, posts }) => {
  const navigation = useNavigation();

  const { data: me } = useGetCurrentUserQuery();
  const { data: user, isLoading } = useGetUserbyIdQuery(userId);
  const [createNewFollower] = useCreateNewFollowerMutation();
  const [unfollowUser, { isSuccess: isUnfollowSuccess }] = useDeleteFollowMutation();

  const following = user?.followers || [];
  const isCurrentUser = userId === me?.id;


  const [isFollowing, setIsFollowing] = useState(false);
  const [followId, setfollowId] = useState(null);

  useEffect(() => {
    const follower = following.find((follow) => follow.followee_id === userId);
    setIsFollowing(!!follower);
    setfollowId(follower?.id);
  }, [following, userId]);

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Profile");
        console.log("logged out: ", me);
      })
      .catch((error) => alert(error.message));
  };

  const handleFollow = async () => {
    try {
      const response = await createNewFollower(userId);
      const id = response.data.id;
      setfollowId(id);
      setIsFollowing(true);
      console.log("new follow ID created", followId);
    } catch (error) {
      console.error("Error following user:", error);
    }
  };

  const handleUnfollow = async () => {
    try {
      await unfollowUser(followId);
      console.log("follow ID deleted", followId);
    } catch (error) {
      console.error("Error following user:", error);
    }
  };

  useEffect(() => {
    if (isUnfollowSuccess) {
      setIsFollowing(false);
    }
  }, [isUnfollowSuccess]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Image
          style={styles.userImg}
          source={require("../../assets/profile-pic.png")}
        />
        <Text style={styles.userName}>{user?.username}</Text>
        <Text style={styles.aboutUser}>add 'about' to user schema</Text>
        <View style={styles.userBtnWrapper}>
          {isCurrentUser ? (
            <>
              <TouchableOpacity style={styles.userBtn}>
                <Text style={styles.userBtnTxt} onPress={handleSignOut}>
                  Sign Out
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.userBtn}>
                <Text style={styles.userBtnTxt}>Settings</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity
                style={isFollowing ? styles.userBtnFollowed : styles.userBtn}
                onPress={isFollowing ? handleUnfollow : handleFollow}
              >
                <Text
                  style={
                    isFollowing ? styles.userBtnTxtFollowed : styles.userBtnTxt
                  }
                >
                  {isFollowing ? "Unfollow" : "Follow"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.userBtn}>
                <Text style={styles.userBtnTxt}>Message</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
        <View style={styles.userInfoWrapper}>
          <View style={styles.userInfoItem}>
            <Text style={styles.userInfoTitle}>{posts ? posts.length : 0}</Text>
            <Text style={styles.userInfoSubTitle}>Posts</Text>
          </View>
          <View style={styles.userInfoItem}>
            <Text style={styles.userInfoTitle}>{user.followers.length}</Text>
            <Text style={styles.userInfoSubTitle}>Followers</Text>
          </View>
          <View style={styles.userInfoItem}>
            <Text style={styles.userInfoTitle}>{user.following.length}</Text>
            <Text style={styles.userInfoSubTitle}>Following</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  contentContainer: {
    alignItems: "center",
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
  userBtnFollowed: {
    borderColor: "#2e64e5",
    borderWidth: 2,
    borderRadius: 3,
    paddingVertical: 8,
    paddingHorizontal: 5,
    marginHorizontal: 5,
    backgroundColor: "green",
  },
  userBtnTxt: {
    color: "#2e64e5",
  },
  userBtnTxtFollowed: {
    color: "white",
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

export default UserCard;
