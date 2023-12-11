import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";

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
    navigation.navigate("UserScreen", { userId: user_id });
  }

  return (
  
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.content}>{content}</Text>
      <TouchableOpacity onPress={handlePress}> 
      <Text style={styles.content}>{author.username}</Text>
      </TouchableOpacity > 
      {/* <Text style={styles.createdAt}>{createdAt.toDateString()}</Text> */}
    </View>
   
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    margin: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  content: {
    fontSize: 16,
    marginBottom: 8,
  },
  createdAt: {
    fontSize: 14,
    color: '#666',
  },
});

export default PostCard;
