import React, {useState, useCallback, useEffect} from 'react';
import {GiftedChat, Bubble, Send} from 'react-native-gifted-chat';
import {useRoute} from '@react-navigation/native';
import {Image, ImageBackground, View} from 'react-native';
import sendImag from '../assests/send.jpg';
import bgImag from '../assests/bg.jpg';

function ChatScreen({route, navigation}) {
  const {user} = route.params;
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        title: `${user.name}`,
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

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

  const renderBubble = props => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#1c2e50', // Your outgoing message bubble color
          },
          left: {
            backgroundColor: '#D3D3D3', // Your incoming message bubble color
          },
        }}
      />
    );
  };

  // add custom send button
  const renderSend = props => {
    return (
      <Send {...props}>
        <View style={{marginRight: 10, marginBottom: 10}}>
          <Image source={sendImag} style={{width: 30, height: 30}} />
        </View>
      </Send>
    );
  };

  return (
    <ImageBackground source={bgImag} style={{flex: 1}}>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{_id: 1}}
        renderBubble={renderBubble}
        renderSend={renderSend}
      />
    </ImageBackground>
  );
}

export default ChatScreen;
