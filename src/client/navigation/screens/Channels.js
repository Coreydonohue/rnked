import React from "react";
import { Text, StyleSheet, View } from "react-native";
import CreateChannel from "../components/Channels/CreateChannel";
import {
  useGetPrivateChannelsQuery,
  useGetAdminChannelsQuery,
  useGetPublicChannelsQuery,
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

  const { data: adminChannels, isLoading } = useGetAdminChannelsQuery(currentUserId);

  const handleChannelPress = (channel) => {
    navigation.navigate("Channel", { channel });
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <View style={styles.container}>
      <ChannelsList data={adminChannels} title="My Admin Channels" />
      <ChannelsList data={publicChannels} title="Public Channels" />
      <ChannelsList data={privateChannels} title="Private Channels" />
      <CreateChannel />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Channels;
