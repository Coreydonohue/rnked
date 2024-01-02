import React from "react";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Input, Icon } from "@rneui/themed";
import { useGetAllBooksQuery } from "../../../reducers/api";
import { useState } from "react";

const List = () => {
  const { data: allBooks } = useGetAllBooksQuery();
  // console.log("books from list", allBooks);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBooks, setSelectedBooks] = useState([]);

  const filteredBooks = allBooks?.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBookSelection = (book) => {
    setSelectedBooks(prevBooks => [...prevBooks, book]);
    setSearchTerm(""); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>List tab</Text>
      <TextInput
        style={styles.input}
        placeholder="Search for a book..."
        value={searchTerm}
        onChangeText={(text) => setSearchTerm(text)}
      />
      
      {searchTerm !== "" && (
        <FlatList
          data={filteredBooks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleBookSelection(item)}>
              <Text>{item.title}</Text>
            </TouchableOpacity>
          )}
        />
      )}

      {selectedBooks.length > 0 && (
        <>
          <Text style={styles.text}>Selected Books:</Text>
          <FlatList
            data={selectedBooks}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <Text>{item.title}</Text>}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
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
