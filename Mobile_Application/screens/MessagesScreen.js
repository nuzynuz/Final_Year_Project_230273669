import React, { useState } from "react";
import { FlatList } from "react-native";

import {
  ListItem,
  ListItemDeleteAction,
  ListItemSeparator,
} from "../components/list";
import Screen from "../components/Screen";

//sample data

const initialMessages = [
  {
    id: 1,
    title: "Mosh Hamedani",
    description: "Hey! Is this item still available?",
    image: require("../../assets/MoshProfile.png"),
  },
  {
    id: 2,
    title: "Mosh Hamedani",
    description:
      "I'm interested in this item. When will you be able to post it?",
    image: require("../../assets/MoshProfile.png"),
  },
];

function MessagesScreen(props) {
  //Re-render after each deletion
  const [messages, setMessages] = useState(initialMessages);
  const [refreshing, setRefreshing] = useState(false);

  //Delee the message from messages array
  const handleDelete = (message) => {
    //Filter all message except curent message and pass it
    setMessages(messages.filter((m) => m.id !== message.id));
    //Call the server
  };
  return (
    <Screen>
      <FlatList
        data={messages}
        keyExtractor={(messages) => messages.id.toString()}
        renderItem={({ item }) => (
          <ListItem
            title={item.title}
            subTitle={item.description}
            image={item.image}
            onPress={() => console.log("Message selected", item)}
            renderRightActions={() => (
              <ListItemDeleteAction onPress={() => handleDelete(item)} />
            )}
          />
        )}
        ItemSeparatorComponent={ListItemSeparator}
        refreshing={refreshing}
        // fetch latest list from Server
        onRefresh={() => {
          //Dumy data
          setMessages([
            {
              id: 2,
              title: "Title 2",
              description: "Description 2",
              image: require("../../assets/MoshProfile.png"),
            },
          ]);
        }}
      />
    </Screen>
  );
}

export default MessagesScreen;
