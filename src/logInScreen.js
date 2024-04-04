import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';

import {Button, Text, SafeAreaView} from 'react-native';

const mbmLogo = require('../assests/mbmLogo.png');

const LogInScreen = ({navigation}) => {
  const [number, onChangeNumber] = React.useState('');
  const [text, onChangeText] = React.useState('');

  const onLogIn = () => {
    ToastAndroid.show('LogIN Successfully', ToastAndroid.SHORT);
    navigation.replace('mbmCommunication');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.mainContainer}>
          <View style={styles.headMbm}>
            <Text style={styles.textMbm}>Welcome to</Text>
          </View>

          <View style={styles.headmbmCom}>
            <Text style={styles.headingmbmCom}>MBM-Communication</Text>
          </View>

          <View style={styles.logoContainer}>
            <Image source={mbmLogo} style={styles.logo} />
          </View>

          <View style={styles.panelContainer}>
            <TouchableOpacity style={styles.buttonContainer}>
              <Text style={styles.buttonText}>Student</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonContainer}>
              <Text style={styles.buttonText}>Teacher</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonContainer}>
              <Text style={styles.buttonText}>Admin</Text>
            </TouchableOpacity>
          </View>

          <TextInput
            style={styles.input}
            onChangeText={onChangeNumber}
            value={number}
            maxLength={10}
            mode="outlined"
            label="Mobile No."
            placeholder="Enter Mobile Number"
            keyboardType="phone-pad"
          />

          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={text}
            placeholder="Enter your Id :"
            keyboardType="phone-pad"
          />

          <TouchableOpacity style={styles.buttonText}>
            <Button title="LogIn" onPress={onLogIn} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LogInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c2e50',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  headmbmCom: {
    flexDirection: 'row',
  },
  headingmbmCom: {
    fontWeight: 'bold',
    flexDirection: 'row',
    fontSize: 30,
    color: '#FFA500',
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    width: '80%',
    marginTop: 20,
    marginVertical: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  panelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    marginTop: 20,
  },
  buttonContainer: {
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#600080',
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
  },
  logoContainer: {
    paddingVertical: 20,
  },
  logo: {
    height: 150,
    width: 150,
    borderRadius: 35,
    resizeMode: 'contain',
  },
  lgnText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#fff',
    padding: 10,
  },
  headMbm: {
    borderRadius: 5,
    paddingTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textMbm: {
    fontSize: 30,
    color: '#fff',
  },
});
