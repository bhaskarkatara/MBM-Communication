import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LogInScreen from './src/logInScreen';
import Groups from './src/GroupsScreen';
import ChatScreen from './src/ChatScreen';
import Icons from 'react-native-vector-icons/FontAwesome';
import {View, TouchableOpacity} from 'react-native';
import ProfileScreen from './src/ProfileScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="logInScreen">
        <Stack.Screen
          name="logInScreen"
          component={LogInScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{title: 'User Profile'}}
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
                <Icons name="search" size={23} />
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Profile');
                  }}>
                  <Icons name="bars" size={23} />
                </TouchableOpacity>
              </View>
            ),
            headerStyle: {
              backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleAlign: 'left',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          })}
        />
        <Stack.Screen name="chatScreen" component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
