import React from "react";
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useGetPrivateChannelsQuery } from "../../../reducers/api";
import { useNavigation } from "@react-navigation/native";
import ChannelsList from "./ChannelsList"
import LoadingSpinner from "../inputs/LoadingSpinner";

const PrivateChannels = () => {
  const { data: channels, isLoading } = useGetPrivateChannelsQuery();
  const navigation = useNavigation();
  console.log("channnels ", channels);
  const handleChannelPress = (channel) => {
    navigation.navigate("Channel", { channel });
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <View >
      {/* <Text style={styles.text}>Private Channels</Text> */}
      {/* <FlatList
        data={channels}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleChannelPress(item)}>
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
        style={styles.feed}
      /> */}
      <ChannelsList data={channels}/> 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
  },
  text: {
    // Your text styles here
  },
});

export default PrivateChannels;
