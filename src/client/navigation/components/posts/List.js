import React from "react";
import { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Input, Icon } from "@rneui/themed";
import {
  useGetAllBooksQuery,
  useCreateNewListMutation,
} from "../../../reducers/api";
import SubmitButton from "../inputs/SubmitButton";


const List = () => {
  const { data: allBooks } = useGetAllBooksQuery();
  // console.log("books from list", allBooks);

  const [createList] = useCreateNewListMutation();
  const [title, setTitle] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);

  const handleNewList = async () => {
    try {
      const response = await createList({
        title: title,
        // channelId: channelId,
      });
      setTitle("");
      console.log("new list", response);
    } catch (err) {
      console.error("Error creating group:", err);
    }
  };

  return (
    <View style={styles.container}>
      <Input
        onChangeText={(userInput) => setTitle(userInput)}
        placeholder="List Name"
        iconType="user"
        keyboardType="default"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Input 
        onChangeText={(userInput) => setTitle(userInput)}
        placeholder="select book"
        keyboardType="default"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <SubmitButton
      title={'Create List'}
      onPress={handleNewList}
      /> 
    </View>
  );
};

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   padding: 16,
  // },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
});

export default List;
