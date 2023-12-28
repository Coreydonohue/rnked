import React from "react";
import { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  Modal,
  TouchableOpacity,
} from "react-native";
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
import Ionicons from "react-native-vector-icons/Ionicons";
import SubmitButton from "../components/inputs/SubmitButton";

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
  const [isCreateChannelModalVisible, setCreateChannelModalVisible] =
    useState(false);

  const handleChannelPress = (channel) => {
    navigation.navigate("Channel", { channel });
  };

  const toggleCreateChannelModal = () => {
    setCreateChannelModalVisible(!isCreateChannelModalVisible);
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
      <SubmitButton
        title={"Create Channel"}
        icon={<Ionicons name="add-outline" size={24} color="black" />}
        onPress={toggleCreateChannelModal}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={isCreateChannelModalVisible}
        onRequestClose={toggleCreateChannelModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={toggleCreateChannelModal}
            >
              <Ionicons name="arrow-back-outline" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <CreateChannel />
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
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
  modalContainer: {
    flex: 1,
    backgroundColor: "gainsboro",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
  backButton: {
    padding: 8,
  },
});

export default Channels;
