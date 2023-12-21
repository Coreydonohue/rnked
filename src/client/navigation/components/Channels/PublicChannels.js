import React from 'react';
import { Text, StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';
import { useGetPublicChannelsQuery } from '../../../reducers/api';
import { useNavigation } from "@react-navigation/native";

const PublicChannels = () => {
    const { data: channels } = useGetPublicChannelsQuery();
    const navigation = useNavigation();

    const handleChannelPress = (channel) => {
        navigation.navigate("Channel", { channel });
      }

    return (
        <View style={styles.container}>
          <Text style={styles.text}>Public Channels</Text>
          <FlatList
            data={channels}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleChannelPress(item)}>
                <Text>{item.name}</Text>
              </TouchableOpacity>
            )}
            style={styles.feed}
          />
        </View>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        borderWidth: 1, 
        borderColor: 'black', 
        padding: 10
      },
      text: {
        // Your text styles here
      },
    });

export default PublicChannels;