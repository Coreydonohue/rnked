import { ListItem, Avatar } from "@rneui/themed";
import { View } from "react-native";

const MembersList = ({ members }) => {
  // console.log('data from list', members)
  return (
    <View>
      {members.map((l, i) => (
        <ListItem key={i} bottomDivider>
          <Avatar source={require("../../assets/profile-pic.png")} />
          <ListItem.Content>
            <ListItem.Title>{l?.user.username}</ListItem.Title>
            <ListItem.Subtitle>follow</ListItem.Subtitle>
            <ListItem.Subtitle>message</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      ))}
    </View>
  );
};

export default MembersList;
