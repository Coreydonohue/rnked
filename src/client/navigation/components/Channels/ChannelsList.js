import { ListItem, Avatar } from "@rneui/themed";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const ChannelsList = ({ data, title }) => {
  // console.log("data from list", data);
  const navigation = useNavigation();
  const handleChannelPress = (channel) => {
    navigation.navigate("Channel", { channel });
    console.log('channel clicked, navigate to ', channel)
  }

  return (
    <View style={styles.container}> 
      <View style={styles.header}>
        <Text style={styles.headerText}>{title}</Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => handleChannelPress(item)}>
            <ListItem key={index} bottomDivider>
              <ListItem.Content>
                <ListItem.Title>{item.name}</ListItem.Title>
              </ListItem.Content>
              <Ionicons name="chevron-forward-outline" size={24} color="black" />
            </ListItem>
          </TouchableOpacity>
        )}
      />
    </View>

  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#e0e0e0", // Customize the background color as needed
    padding: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  container: {
    width: 200,
    padding: 10,
  },
  text: {
    // Your text styles here
  },
});

export default ChannelsList;
