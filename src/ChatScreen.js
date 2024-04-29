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
  StyleSheet,
} from 'react-native';
import hasTagImg from '../assests/tag.jpg';
import inputAll from '../assests/inputs.png';

import Clipboard from '@react-native-clipboard/clipboard';
import sendImag from '../assests/send.jpg';
import bgImag from '../assests/bg.jpg';
import Toast from 'react-native-toast-message';
import {Icon} from 'react-native-vector-icons/Icon';
import Icons from 'react-native-vector-icons/FontAwesome';
import Cross from 'react-native-vector-icons/Entypo';
import {options} from '../src/optionsData';
import {Menu, MenuItem, MenuDivider} from 'react-native-material-menu';
// import {
//   Menu,
//   MenuProvider,
//   MenuOptions,
//   MenuOption,
//   MenuTrigger,
// } from 'react-native-popup-menu';

function ChatScreen({route, navigation}) {
  const {user} = route.params;
  const [messages, setMessages] = useState([]);
  const [customTag, setCustomTag] = useState(false);
  const [tag, setTag] = useState('');
  const [visible, setVisible] = useState(false);

  const hideMenu = () => setVisible(false);

  const showMenu = () => setVisible(true);
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

  // useEffect(() => {
  navigation.setOptions({
    headerRight: () => {
      return (
        <View
          style={{
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Menu
            visible={visible}
            anchor={
              <Icons name="bars" size={23} color="#fff" onPress={showMenu} />
            }
            onRequestClose={hideMenu}>
            <MenuItem onPress={hideMenu}>UnSubscribe</MenuItem>
            <MenuDivider />
            <MenuItem onPress={hideMenu}>Message</MenuItem>
            <MenuDivider />
            <MenuItem disabled>Lock</MenuItem>
            <MenuDivider />
            <MenuItem onPress={hideMenu}>Setting</MenuItem>
          </Menu>
        </View>
      );
    },
  });
  // }, []);
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
              marginRight: 5,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
            }}>
            <Image source={hasTagImg} style={{height: 30, width: 30}} />
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
            // ref={tagInputRef}
            autoFocus
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

  const optionsForMessage = message => {
    const options = ['Copy Text', 'Cancel', message.tag];
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
const styles = StyleSheet.create({});
