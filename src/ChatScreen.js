import React, {useState, useCallback, useEffect} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import {useRoute} from '@react-navigation/native';
import {TypingAnimation} from 'react-native-typing-animation';
import data from '../src/Data.js';
import {Image, View} from 'react-native';

// todo Fea : add tags, vdos,images,documents,show tags,dlt msges,

function ChatScreen({route, navigation}) {
  const {user} = route.params;
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        title: '${user.name}',
        text: `Hello ${user.name}`,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',

          avatar: user.imageurl,
        },
      },
    ]);
  }, []);
  // navigation.setH
  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
      }}
    />
  );
}

export default ChatScreen;
