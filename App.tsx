import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LogInScreen from './src/logInScreen'; // Import from src folder
import Groups from './src/GroupsScreen';
import ChatScreen from './src/ChatScreen';
import {SearchBar} from 'react-native-screens';
import {View, Button} from 'react-native';
import Icons from 'react-native-vector-icons/FontAwesome';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="logIn">
        <Stack.Screen name="logInScreen" component={LogInScreen} />
        <Stack.Screen
          name="mbmCommunication"
          component={Groups}
          options={{
            title: 'MBM-Communication',
            headerRight: () => (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: 60,
                }}>
                <Icons name="search" size={25} />
                <Icons name="bars" size={25} />
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
          }}
        />
        <Stack.Screen name="chatScreen" component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
