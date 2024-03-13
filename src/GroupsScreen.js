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
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import data from '../src/Data.js';

const Groups = ({navigation}) => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const onClick = () => {
    setIsSubmitted(value => !value);
  };

  useEffect(() => {
    if (isSubmitted === true) {
      navigation.navigate('chatScreen');
    }
  }, [isSubmitted]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={style.container} scrollEnabled={true}>
        {data.map(items => (
          <View key={items.uid} style={style.userCard}>
            <Image source={{uri: items.imageurl}} style={style.userImage} />
            <TouchableOpacity onPress={onClick}>
              <View>
                <Text style={style.userName}>{items.name}</Text>
                <Text style={style.userMessage}>{items.message}</Text>
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Groups;

const style = StyleSheet.create({
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
