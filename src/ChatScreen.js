import React, {useState, useCallback, useEffect, useRef} from 'react';
import {GiftedChat, Bubble, Send} from 'react-native-gifted-chat';
import {
  Button,
  Image,
  ImageBackground,
  TextInput,
  Text,
  TouchableOpacity,
  View,
  ToastAndroid,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import sendImag from '../assests/send.jpg';
import bgImag from '../assests/bg.jpg';
import Toast from 'react-native-toast-message';

function ChatScreen({route, navigation}) {
  const {user} = route.params;
  const [messages, setMessages] = useState([]);
  const [customTag, setCustomTag] = useState(false);
  const tagInputRef = useRef(null);
  const [tag, setTag] = useState('');

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
        tags: [],
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    // messages[0].tag = tag;
    console.log(messages);

    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
    setTag('');

    setCustomTag(false);
  }, []);

  const renderBubble = props => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#1c2e50', // outgoing
          },
          left: {
            backgroundColor: '#D3D3D3', // incoming
          },
        }}
      />
    );
  };

  const renderSend = props => {
    return (
      <View
        style={{
          flexDirection: 'row',
          height: 44,
          rowGap: 24,
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => {
            if (!customTag) {
              setCustomTag(!customTag);
            } else {
              setCustomTag(!customTag);
              setTag(tag);
              ToastAndroid.show('clicked' + tag, ToastAndroid.SHORT);
            }
          }}>
          <View
            style={{
              marginRight: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{color: '#000000'}}>Add tags</Text>
          </View>
        </TouchableOpacity>

        <Send {...props}>
          <View style={{marginRight: 10, marginBottom: 10}}>
            <Image source={sendImag} style={{width: 30, height: 30}} />
          </View>
        </Send>
      </View>
    );
  };

  // tags wala function
  const renderAccessory = () => {
    if (customTag) {
      return (
        <View style={{backgroundColor: '#fff', padding: 5}}>
          <TextInput
            ref={tagInputRef}
            placeholder="Enter tag"
            onChangeText={text => setTag(text)}
            style={{
              backgroundColor: '#f0f0f0',
              borderRadius: 5,
              padding: 5,
            }}
            defaultValue={tag}
          />
        </View>
      );
    }
    return null;
  };

  const handleAddCustomTag = () => {};

  useEffect(() => {
    if (customTag && tagInputRef.current) {
      tagInputRef.current.focus();
    }
  }, [customTag]);

  const optionsForMessage = message => {
    // console.log(message.tag);
    const options = ['Copy Text', 'Cancel', message.tag];
    // message[0] = ''; //reset tags for second msg
    // console.log(message.tag);
    // if (message.tag && message.tag.length > 0) {
    //   options.splice(1, 0, ...message.tag.map(tag => `Tag: ${tag}`));
    // }
    // console.log('tag gya ', options);
    return options;
  };
  return (
    <ImageBackground source={bgImag} style={{flex: 1}}>
      <GiftedChat
        messages={messages}
        onSend={messages => {
          messages[0].tag = tag;
          onSend(messages);
        }}
        user={{_id: 1}}
        renderBubble={renderBubble}
        renderSend={renderSend}
        renderAccessory={renderAccessory}
        onLongPress={(context, message) => {
          if (message.text) {
            // If the message is text-based
            const options = optionsForMessage(message);
            const cancelButtonIndex = options.length - 1;
            // console.log(options);
            context.actionSheet().showActionSheetWithOptions(
              {
                options: options,
                cancelButtonIndex: cancelButtonIndex,
              },
              buttonIndex => {
                switch (buttonIndex) {
                  case 0:
                    Clipboard.setString(message.text);
                    break;

                  // Add cases for other options if needed
                }
              },
            );
          } else {
            // If the message is not text-based
            const options2 = ['Add Tags', 'Cancel', tag];
            // options2.push(tag);
            const cancelButtonIndex = options2.length - 1;

            context.actionSheet().showActionSheetWithOptions(
              {
                options: options2,
                cancelButtonIndex: cancelButtonIndex,
              },
              buttonIndex => {
                switch (buttonIndex) {
                  case 0:
                    // Handle other actions for non-text messages, like adding tags
                    break;
                  // Add cases for other options if needed
                }
              },
            );
          }
        }}
      />
    </ImageBackground>
  );
}

export default ChatScreen;
