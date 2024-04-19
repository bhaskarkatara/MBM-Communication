import React, {useState} from 'react';
import {StyleSheet, TextInput, View, Keyboard} from 'react-native';
import Icons from 'react-native-vector-icons/FontAwesome';
import Cross from 'react-native-vector-icons/Entypo';
// import Entypo from 'react-native-vector-icons/Entypo';
// import {Colors} from '../theme/colors';
// import {ChatListData as allChats} from '../data/ChatsData';
import data from '../src/Data.js';
// import

const SearchBar = ({setData}) => {
  const [clickOnSearch, setClickOnSearch] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  function handleSearch(query) {
    setSearchInput(query);
    console.log('q : ', query);
    console.log('d', data);
    const filtered = data.filter(data =>
      data.name.toLowerCase().includes(query.toLowerCase()),
    );
    console.log(filtered);
    setData(filtered);
  }
  return (
    <View style={styles.container}>
      <View
        style={
          clickOnSearch
            ? styles.searchBar__clicked
            : styles.searchBar__unclicked
        }>
        <Icons
          name="search"
          size={clickOnSearch ? 24 : 23}
          color="#fff"
          marginLeft={15}
          marginRight={5}
          onPress={() => setClickOnSearch(true)}
        />
        {clickOnSearch && (
          <TextInput
            style={[styles.input, {borderRadius: 15}]}
            placeholder="Search"
            autoFocus
            // placeholderTextColor={Colors.primaryColor}
            value={searchInput}
            onChangeText={text => handleSearch(text)}
          />
        )}
      </View>
      {clickOnSearch && (
        <Cross
          name="cross"
          size={34}
          color="white"
          style={{marginRight: 10}}
          onPress={() => {
            // Keyboard.dismiss();
            // setSearchInput('');
            handleSearch('');
            setClickOnSearch(false);
          }}
        />
      )}
    </View>
  );
};
export default SearchBar;

// styles
const styles = StyleSheet.create({
  container: {
    padding: 0,
    // marginVertical: 10,
    gap: 0,
    alignItems: 'center',
    flexDirection: 'row',
    height: 50,
  },
  searchBar__unclicked: {
    alignItems: 'center',
    marginRight: 25,
  },
  searchBar__clicked: {
    borderRadius: 15,
    flexDirection: 'row',
    backgroundColor: '#d9dbda',
    alignItems: 'center',
    width: 250,
    marginRight: 20,
  },
  input: {
    fontSize: 16,
    width: 150,
    // color: Colors.black,
    height: 40,
  },
});
