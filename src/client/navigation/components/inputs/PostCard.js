import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextBase,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import moment from "moment";
import { useCreateLikeMutation } from "../../../reducers/api";

const PostCard = ({ post }) => {
  const navigation = useNavigation();

  // if (!post) {
  //   return (
  //     <View style={styles.container}>
  //     <Text style={styles.title}>loading</Text>
  //   </View>
  //   );
  // }

  const { title, content, createdAt, author, user_id } = post;
  // console.log('post from post', post)
  // console.log('userId from post', user_id)

  const handlePress = () => {
    navigation.navigate("Profile", { userId: user_id });
  };

  return (
    <View style={styles.feedItem}>
      {/* poster profile pic */}
      <Image
        source={require("../../assets/profile-pic.png")}
        style={styles.avatar}
      />
      <View style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View>
            <TouchableOpacity onPress={handlePress}>
              <Text style={styles.name}>{author.username}</Text>
            </TouchableOpacity>

            <Text style={styles.timestamp}>
              {moment(createdAt).fromNow()}
            </Text>
          </View>

          <Ionicons
            name="ellipsis-horizontal-outline"
            size={24}
            color="#73788B"
          />
        </View>
        <Text style={styles.post}>{title}</Text>
        {/* <Text style={styles.post}>{content}</Text> */}
        {/* post image if applicable make collapsible like reddit  */}
        <Image
          source={"https://picsum.photos/200"}
          style={styles.postImage}
          resizeMode="cover"
        />
        <View style={{ flexDirection: "row" }}>
          <Ionicons
            name="heart-outline"
            size={24}
            color="#73788B"
            style={{ marginRight: 16 }}
          />
          <Ionicons name="chatbox-outline" size={24} color="#73788B" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  feedItem: {
    backgroundColor: "#FFF",
    borderRadius: 5,
    padding: 8,
    flexDirection: "row",
    marginVertical: 8,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 16,
  },
  name: {
    fontSize: 15,
    fontWeight: "500",
    color: "#454D65",
  },
  timestamp: {
    fontSize: 11,
    color: "#C4C6CE",
    marginTop: 4,
  },
  post: {
    marginTop: 16,
    fontSize: 14,
    color: "#838899",
  },
  postImage: {
    width: undefined,
    height: 150,
    borderRadius: 5,
    marginVertical: 16,
  },
});

export default PostCard;
