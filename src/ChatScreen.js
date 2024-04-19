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
import Clipboard from '@react-native-clipboard/clipboard';
import sendImag from '../assests/send.jpg';
import bgImag from '../assests/bg.jpg';
import Toast from 'react-native-toast-message';
import {Icon} from 'react-native-vector-icons/Icon';
import Icons from 'react-native-vector-icons/FontAwesome';
import Cross from 'react-native-vector-icons/Entypo';

function ChatScreen({route, navigation}) {
  const {user} = route.params;
  const [messages, setMessages] = useState([]);
  const [customTag, setCustomTag] = useState(false);
  // const tagInputRef = useRef(null);
  const [tag, setTag] = useState('');
  const [displayOptions, setDisplayOptions] = useState(false);

  const toggleOptions = () => {
    setDisplayOptions(prevDisplayOptions => !prevDisplayOptions);
  };
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

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Cross name="cross" size={23} color="#fff" onPress={toggleOptions} />
      ),
    });
  }, []);

  const renderOptions = () => {
    if (displayOptions) {
      console.log('idhar bhi aaya render m');
      return (
        <View style={styles.renderOPtions}>
          <Text
            style={{
              fontWeight: 'bold',
              color: '#000000',
              marginBottom: 15,
              marginTop: 3,
            }}>
            {' '}
            UNSUBSCRIBE
          </Text>
          <Text
            style={{fontWeight: 'bold', color: '#000000', marginBottom: 17}}>
            {' '}
            MEDIA
          </Text>
          <Text
            style={{fontWeight: 'bold', color: '#000000', marginBottom: 17}}>
            {' '}
            MESSAGES
          </Text>
          <Text
            style={{fontWeight: 'bold', color: '#000000', marginBottom: 17}}>
            {' '}
            MORE
          </Text>
          <Text
            style={{fontWeight: 'bold', color: '#000000', marginBottom: 17}}>
            {' '}
            SETTING
          </Text>
        </View>
      );
    }
    // setDisplayOptions(!displayOptions);
    return null;
  };

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
      {renderOptions()}
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
const styles = StyleSheet.create({
  renderOPtions: {
    height: 200,
    width: 150,
    borderWidth: 1,
    marginLeft: 200,
    borderColor: '#fff',
    borderRadius: 20,
    backgroundColor: '#fff',
    marginTop: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    alignContent: 'center',
  },
});
