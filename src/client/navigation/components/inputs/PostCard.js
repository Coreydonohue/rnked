import React from "react";
import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Image,
  TextInput
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import moment from "moment";
import {
  useCreatePostLikeMutation,
  useDeleteLikeMutation,
  useCreateCommentMutation,
  useDeleteCommentMutation,
} from "../../../reducers/api";

const PostCard = ({ post }) => {
  const { id, title, content, createdAt, author, user_id, Likes } = post;
  const navigation = useNavigation();
  const [createLike] = useCreatePostLikeMutation();
  const [removeLike] = useDeleteLikeMutation();
  const [createComment] = useCreateCommentMutation(); 
  const [deleteComment] = useDeleteCommentMutation(); 

  const [isLiked, setIsLiked] = useState(false);
  const [likeId, setLikeId] = useState(Likes?.length > 0 ? Likes[0].id : null);
  const [commentInput, setCommentInput] = useState("")
  const [isCommentModalVisible, setIsCommentModalVisible] =useState(false)

  useEffect(() => {
    const likeExists = Likes.length > 0;
    setIsLiked(likeExists);
  }, [Likes]);

  //like and unlike posts
  const handleLikePress = async () => {
    try {
      if (!isLiked) {
        const response = await createLike(id);
        setLikeId(response.data.id);
        console.log(`like id ${response.data.id} for post ${id}`);
      } else {
        await removeLike(likeId);
        console.log(`like id ${likeId} deleted for post ${id}`);
      }
      setIsLiked(!isLiked);
    } catch (error) {
      console.error("Error creating like:", error);
    }
  };

  //commenting

  const handleCommentPress = () => {
    setIsCommentModalVisible(true);
  };

  const handleCommentSubmit = async () => {
    try {
     const response = await createComment({
      postId: id, 
      content: commentInput
    });
      console.log('comment created', response.data.content)
      console.log('comment input', commentInput)
      setIsCommentModalVisible(false);
      setCommentInput("");
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  }

  // link to user profile if pressed
  const handlePressUser = () => {
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
            <TouchableOpacity onPress={handlePressUser}>
              <Text style={styles.name}>{author.username}</Text>
            </TouchableOpacity>

            <Text style={styles.timestamp}>{moment(createdAt).fromNow()}</Text>
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
          <TouchableOpacity onPress={handleLikePress}>
            <Ionicons
              name={isLiked ? "heart" : "heart-outline"}
              size={24}
              color={isLiked ? "red" : "#73788B"}
              style={{ marginRight: 16 }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCommentPress}>
            <Ionicons name="chatbox-outline" size={24} color="#73788B" />
          </TouchableOpacity>
        </View>
      </View>

       {/* Comment Input Modal */}
       <Modal visible={isCommentModalVisible} animationType="slide">
        <View style={styles.commentModal}>
          <TextInput
            style={styles.commentInput}
            placeholder="Type your comment here"
            multiline
            value={commentInput}
            onChangeText={(text) => setCommentInput(text)}
          />
          <TouchableOpacity onPress={handleCommentSubmit}>
            <Text style={styles.submitButton}>Submit</Text>
          </TouchableOpacity>
        </View>
      </Modal>
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
  commentModal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: "#73788B",
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
    width: "100%",
    minHeight: 100,
  },
  submitButton: {
    color: "#fff",
    backgroundColor: "#3273FF",
    padding: 12,
    borderRadius: 8,
    textAlign: "center",
  },
});

export default PostCard;
