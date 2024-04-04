import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import {ToastAndroid} from 'react-native';

export default function ProfileScreen({navigation}) {
  const onLogOut = () => {
    ToastAndroid.show('Logout Successfully', ToastAndroid.SHORT);
    // Reset the navigation stack to only have the login screen nice way
    navigation.reset({
      index: 0,
      routes: [{name: 'logInScreen'}],
    });
  };
  return (
    <>
      <ScrollView>
        <View style={style.mainContainer}>
          <View
            style={{
              height: 100,
              width: 100,
              borderRadius: 10,
              borderWidth: 1,
            }}></View>
          <View style={style.container}>
            <Text style={{color: '#000000', fontSize: 20}}>Name :- </Text>
            <Text style={{color: '#000000', fontSize: 20}}>Roll NO:- </Text>
            <Text style={{color: '#000000', fontSize: 20}}>Branch :- </Text>
            <Text style={{color: '#000000', fontSize: 20}}>Year :- </Text>
            <Text style={{color: '#000000', fontSize: 20}}>
              Date Of birth :-{' '}
            </Text>
            <Text style={{color: '#000000', fontSize: 20}}>Mobile no :- </Text>
            <Text style={{color: '#000000', fontSize: 20}}>Status :- </Text>
          </View>

          <TouchableOpacity
            style={{paddingTop: 10, width: 150, height: 100}}
            onPress={onLogOut}>
            <Text
              style={{backgroundColor: '#600080', color: '#fff', fontSize: 40}}>
              LogOut
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            alignContent: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: 100,
            flex: 1,
          }}>
          <Text>----------------</Text>
          <Text style={{fontWeight: 'bold'}}>MBM-Communication</Text>
          <Text>----------------</Text>
        </View>
      </ScrollView>
    </>
  );
}

const style = StyleSheet.create({
  mainContainer: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
  },
  container: {
    height: 250,
    gap: 9,
    paddingLeft: 10,
    width: 300,
    borderRadius: 10,
    borderWidth: 1,
  },
});
