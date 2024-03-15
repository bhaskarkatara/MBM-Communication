// todo : add tags system
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  ScrollView,
  Image,
  StyleSheet,
  Touchable,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import data from '../src/Data.js';

const Groups = ({navigation}) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isShow, setIsShow] = useState(null);

  const onClick = () => {
    setIsSubmitted(value => !value);
  };
  // todo : check why after clicking one time ..not able to goes on chatScreen
  // clicking double ,able to navigate on chat screen
  useEffect(() => {
    if (isSubmitted === true) {
      navigation.navigate('chatScreen');
    }
  }, [isSubmitted]);
  const onShowUserImage = uid => {
    for (let i = 0; i < data.length; i++) {
      if (uid == data[i].uid) {
        setIsShow(data[i].imageurl);
        break;
      }
    }
  };

  const renderLargeImage = () => {
    if (isShow) {
      return (
        <View style={style.modalContainer}>
          <TouchableWithoutFeedback onPress={onCancel}>
            <View style={style.overlay} />
          </TouchableWithoutFeedback>
          <View style={style.imageContainer}>
            <Image source={isShow} style={style.largeImage} />
          </View>

          <View style={{height: 1, width: 200, color: '#000000'}}></View>
        </View>
      );
    }
    return null;
  };

  const onCancel = () => {
    setIsShow(null);
  };

  return (
    <SafeAreaView style={{flex: 1}} onPress={onCancel}>
      <ScrollView style={style.container} scrollEnabled={true}>
        {data.map(item => (
          <View key={item.uid} style={style.userCard}>
            <TouchableOpacity onPress={() => onShowUserImage(item.uid)}>
              <Image source={item.imageurl} style={style.userImage} />
            </TouchableOpacity>
            <TouchableOpacity onPress={onClick}>
              <View
                style={{
                  width: 305,
                  height: 55,
                }}>
                <View>
                  <Text style={style.userName}>{item.name}</Text>
                  <Text style={style.userMessage}>{item.message}</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        ))}
        {renderLargeImage()}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Groups;

const style = StyleSheet.create({
  imageContainer: {
    width: 300,
    height: 300,
    borderRadius: 10,
    overflow: 'hidden',
    zIndex: 2,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  userCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3,
    backgroundColor: '#8D3DAF',
    padding: 4,
    borderRadius: 14,
    // gap: 1,
  },
  modalContainer: {
    position: 'absolute',
    // height: 400,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  largeImage: {
    width: 300,
    height: 300,
    borderRadius: 10,
  },
  container: {
    paddingHorizontal: 16,
    padding: 10,
    flex: 1,
    marginBottom: 3,
  },
  userImage: {
    height: 60,
    width: 60,
    borderRadius: 30,
    marginRight: 16,
    marginRight: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  userMessage: {
    fontSize: 14,
    color: '#333',
  },
});
