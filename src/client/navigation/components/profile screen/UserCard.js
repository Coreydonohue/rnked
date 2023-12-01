import React from "react";
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

const UserCard = () => {
    const { data: me, isLoading, isError } = useGetCurrentUserQuery();
    const {
        data: posts,
        isLoading: loadingPosts,
        isError: errorPosts,
      } = useGetCurrentUserPostsQuery();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>new file</Text>
    </View>
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

export default UserCard;
