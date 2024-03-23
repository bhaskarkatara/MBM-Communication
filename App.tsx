import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LogInScreen from './src/logInScreen';
import Groups from './src/GroupsScreen';
import ChatScreen from './src/ChatScreen';
import Icons from 'react-native-vector-icons/FontAwesome';
import {View, TouchableOpacity, StatusBar} from 'react-native';
import ProfileScreen from './src/ProfileScreen';
import {useRoute} from '@react-navigation/native';

const Stack = createNativeStackNavigator();

const App = () => {
  const [user, setUser] = useState(false);
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#1c2e50" />
      <Stack.Navigator initialRouteName="logInScreen">
        <Stack.Screen
          name="logInScreen"
          component={LogInScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            title: 'User Profile',
            headerStyle: {
              backgroundColor: '#1c2e50',
            },
            headerTintColor: '#fff',
            headerTitleAlign: 'left',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            // StatusBar configuration for Profile screen
            statusBarStyle: 'light-content',
            statusBarBackgroundColor: '#1c2e50',
          }}
        />

        <Stack.Screen
          name="mbmCommunication"
          component={Groups}
          options={({navigation}) => ({
            title: 'MBM-Communication',
            headerRight: () => (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: 60,
                }}>
                <Icons name="search" size={23} color="#fff" />
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Profile');
                  }}>
                  <Icons name="bars" size={23} color="#fff" />
                </TouchableOpacity>
              </View>
            ),
            headerStyle: {
              backgroundColor: '#1c2e50',
            },
            headerTintColor: '#fff',
            headerTitleAlign: 'left',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            // StatusBar configuration for mbmCommunication screen
            statusBarStyle: 'light-content',
            statusBarBackgroundColor: '#1c2e50',
          })}
        />

        <Stack.Screen
          name="chatScreen"
          component={ChatScreen}
          options={({route}) => ({
            title: route.params.user.name,
            headerStyle: {
              backgroundColor: '#1c2e50',
            },
            headerTintColor: '#fff',
            headerTitleAlign: 'left',
            headerTitleStyle: {
              fontWeight: 'bold',
            },

            statusBarStyle: 'light-content',
            statusBarBackgroundColor: '#1c2e50',
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
