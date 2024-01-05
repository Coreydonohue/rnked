import React from "react";
import { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Modal,
  ScrollView,
} from "react-native";
import { Input, Icon } from "@rneui/themed";
import {
  useGetAllBooksQuery,
  useCreateNewListMutation,
  useCreateNewListPostMutation
} from "../../../reducers/api";
import SubmitButton from "../inputs/SubmitButton";
import Ionicons from "react-native-vector-icons/Ionicons";

const List = () => {
  const { data: allBooks } = useGetAllBooksQuery();
  // console.log("books from list", allBooks);
  const [createList] = useCreateNewListMutation();
  const [listPost] = useCreateNewListMutation();
  const [title, setTitle] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [focused, setFocused] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

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

  const filteredData = allBooks?.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (item) => {
    setSearchTerm(item); 
  }

  return (
    <View style={styles.container}>
      <SubmitButton title={"Create List"} onPress={handleNewList} />
      <TextInput
        onChangeText={(userInput) => setTitle(userInput)}
        placeholder="List Name"
        iconType="user"
        keyboardType="default"
        autoCapitalize="none"
        autoCorrect={false}
        style={styles.listName}
      />
      <View style={styles.listItem}>
        <TextInput
          // onChangeText={(userInput) => setSearchTerm(userInput)}
          onChangeText={(item) => handleSearch(item)}
          placeholder="search for book"
          keyboardType="default"
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.itemInput}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
        {focused && (
          <ScrollView style={styles.flatListContainer}>
            <FlatList
              data={filteredData}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.flatListItem}
                  onPress={() => {
                    setSelectedBook(item);
                    // setFocused(false);
                  }}
                >
                  <Text>{item.title}</Text>
                </TouchableOpacity>
              )}
            />
          </ScrollView>
        )}
        <TextInput
          onChangeText={(userInput) => setTitle(userInput)}
          placeholder="rank"
          keyboardType="default"
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.rankInput}
        />
        <TouchableOpacity style={styles.addBtn}>
          <Ionicons name="add-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
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
  listName: {
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    paddingHorizontal: 8,
    width: "90%",
  },
  listItem: {
    flexDirection: "row",
    marginBottom: 8,
    width: "100%",
  },
  itemInput: {
    width: "60%",
    marginRight: 8,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    paddingHorizontal: 8,
  },
  rankInput: {
    width: "20%",
    marginRight: 8,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    paddingHorizontal: 8,
  },
  addBtn: {
    // flex: 3,
    marginRight: 8,
    width: "10%",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  flatListContainer: {
    position: "absolute",
    top: 45, // Adjust the position based on your layout
    left: 0,
    right: 0,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
  },
  flatListItem: {
    padding: 8,
    borderBottomWidth: 1,
    borderColor: "gray",
  },
});

export default List;
