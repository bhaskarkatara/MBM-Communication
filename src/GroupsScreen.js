import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import data from '../src/Data.js';

const Groups = () => {
  const navigation = useNavigation();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isShow, setIsShow] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const onClickToChatScreen = uid => {
    setSelectedUser(data.find(user => user.uid === uid)); // Find the user data by uid
    setIsSubmitted(true);
  };

  useEffect(() => {
    if (isSubmitted && selectedUser) {
      navigation.navigate('chatScreen', {user: selectedUser});
      setIsSubmitted(false); // Reset the state after navigation
    }
  }, [isSubmitted, navigation, selectedUser]);

  const onShowUserImage = uid => {
    const user = data.find(item => item.uid === uid);
    if (user) {
      setIsShow(user.imageurl);
    }
  };

  const renderLargeImage = () => {
    if (isShow) {
      return (
        <View style={styles.modalContainer}>
          <TouchableWithoutFeedback onPress={onCancel}>
            <View style={styles.overlay} />
          </TouchableWithoutFeedback>
          <View style={styles.imageContainer}>
            <Image source={isShow} style={styles.largeImage} />
          </View>
          <View style={styles.separator} />
        </View>
      );
    }
    return null;
  };

  const onCancel = () => {
    setIsShow(null);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={styles.container}>
        {data.map(item => (
          <View key={item.uid} style={styles.userCard}>
            <TouchableOpacity onPress={() => onShowUserImage(item.uid)}>
              <Image source={item.imageurl} style={styles.userImage} />
            </TouchableOpacity>
            <TouchableOpacity onPress={onClickToChatScreen(item.uid)}>
              <View style={styles.userInfo}>
                <Text style={styles.userName}>{item.name}</Text>
                <Text style={styles.userMessage}>{item.message}</Text>
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

const styles = StyleSheet.create({
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
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#8D3DAF',
    padding: 10,
    borderRadius: 14,
  },
  modalContainer: {
    position: 'absolute',
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
    paddingVertical: 10,
    flex: 1,
    marginBottom: 3,
  },
  userImage: {
    height: 60,
    width: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  userMessage: {
    fontSize: 14,
    color: '#333',
  },
  separator: {
    height: 1,
    width: 200,
    backgroundColor: '#000000',
  },
});
