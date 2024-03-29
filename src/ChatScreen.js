import React, {useState, useCallback, useEffect} from 'react';
import {GiftedChat, Bubble, Send} from 'react-native-gifted-chat';
import {useRoute} from '@react-navigation/native';
import {
  Button,
  Clipboard,
  Image,
  ImageBackground,
  Touchable,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
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
            backgroundColor: '#1c2e50', // outgoing message bubble color
          },
          left: {
            backgroundColor: '#D3D3D3', //  incoming message bubble color
          },
        }}
      />
    );
  };

  //  custom send button
  const renderSend = props => {
    return (
      <Send {...props}>
        <View style={{marginRight: 10, marginBottom: 10}}>
          <Image source={sendImag} style={{width: 30, height: 30}} />
        </View>
      </Send>
    );
  };

  // function onCoping() {
  //   if (this.props.onLongPress) {
  //     this.props.onLongPress(this.context, this.props.currentMessage);
  //   } else {
  //     if (this.props.currentMessage.text) {
  //       const options = ['Copy Text', 'Cancel', 'Add Tags'];
  //       /**
  //        cancelButtonIndex is set to the index of the last option in the options array. This is used to determine which button in the action sheet corresponds to the cancel action.
  //        */
  //       const cancelButtonIndex = options.length - 1;
  //       this.context.actionSheet().showActionSheetWithOptions(
  //         {
  //           options,
  //           cancelButtonIndex,
  //         },
  //         buttonIndex => {
  //           switch (buttonIndex) {
  //             case 0:
  //               Clipboard.setString(this.props.currentMessage.text);
  //               break;
  //           }
  //         },
  //       );
  //     }
  //   }
  // }
  return (
    <ImageBackground source={bgImag} style={{flex: 1}}>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{_id: 1}}
        renderBubble={renderBubble}
        renderSend={renderSend}
        onLongPress={(context, message) => {
          if (message.text) {
            // If the message is text-based
            const options1 = ['Copy Text', 'Cancel', 'Add Tags'];
            const cancelButtonIndex = options1.length - 2;

            context.actionSheet().showActionSheetWithOptions(
              {
                options: options1,
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
            const options2 = ['Add Tags', 'Cancel'];
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
