import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PostCard = ({ post }) => {
  const { title, content, createdAt, author } = post;
  // console.log('author from post', author)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.content}>{content}</Text>
      <Text style={styles.content}>{author.username}</Text>
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
