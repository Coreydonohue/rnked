import React from "react";
import { Text, StyleSheet, View, ScrollView } from "react-native";
import CreateChannel from "../components/Channels/CreateChannel";
import {
  useGetPrivateChannelsQuery,
  useGetAdminChannelsQuery,
  useGetPublicChannelsQuery,
  useGetJoinedChannelsQuery,
} from "../../reducers/api";
import ChannelsList from "../components/Channels/ChannelsList";
import auth from "../../../server/auth/firebase";
import { useNavigation } from "@react-navigation/native";
import LoadingSpinner from "../components/inputs/LoadingSpinner";

const Channels = () => {
  const navigation = useNavigation();
  const currentUserId = auth.currentUser ? auth.currentUser.uid : null;

  const { data: privateChannels, isLoading: loadingPrivate } =
    useGetPrivateChannelsQuery();

  const { data: publicChannels, isLoading: loadingPublic } =
    useGetPublicChannelsQuery();

  const { data: adminChannels, isLoading } =
    useGetAdminChannelsQuery(currentUserId);

  const { data: joinedChannels } = useGetJoinedChannelsQuery(currentUserId);

  const handleChannelPress = (channel) => {
    navigation.navigate("Channel", { channel });
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.section}>
          <Text style={styles.headerText}>My Channels</Text>
          <ChannelsList data={adminChannels} title="Admin Channels" />
          <ChannelsList data={joinedChannels} title="Joined Channels" />
        </View>
        <View style={styles.section}>
          <Text style={styles.headerText}>Explore Channels</Text>
          <ChannelsList data={publicChannels} title="Public Channels" />
          <ChannelsList data={privateChannels} title="Private Channels" />
        </View>
      </View>
      <CreateChannel />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row", 
    justifyContent: "space-between",
    alignItems: "flex-start", 
    // marginHorizontal: 16, 
    marginBottom: 80,
  },
  section: {
    // flex: 1,
    // marginLeft: 16,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  scrollContainer: {
    flexGrow: 1,
  },
});

export default Channels;
