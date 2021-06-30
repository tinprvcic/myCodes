import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {FAB} from 'react-native-paper';
import {StatusBar} from 'react-native';
import BarcodeListItem from './barcodeListItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import {FlatList} from 'react-native-gesture-handler';

const MainScreen = ({navigation}) => {
  StatusBar.setBackgroundColor('#121212', false);

  const onClickFab = () => {
    navigation.navigate('Add New');
  };

  const getList = async () => {
    try {
      const list = await AsyncStorage.getItem('@list');
      return list != null ? JSON.parse(list) : [];
    } catch (error) {
      throw 400;
    }
  };

  const setList = async list => {
    try {
      await setBarcodeItems(list);
      await AsyncStorage.setItem('@list', JSON.stringify(list));
    } catch (error) {
      throw error;
    }
  };

  const deleteItem = id => {
    const items = [...barcodeItems];
    const finalList = items.filter(item => item.id != id);
    setList(finalList);
  };

  const moveItem = (id, dir) => {
    const items = [...barcodeItems];
    for (let i = 0; i < items.length; i++) {
      if (dir === 'up' && items[i].id === id && i) {
        [items[i], items[i - 1]] = [items[i - 1], items[i]];
        break;
      } else if (
        dir === 'down' &&
        items[i].id === id &&
        i !== items.length - 1
      ) {
        [items[i], items[i + 1]] = [items[i + 1], items[i]];
        break;
      }
    }

    setList(items);
  };

  const [barcodeItems, setBarcodeItems] = useState();

  useFocusEffect(
    React.useCallback(() => {
      const fetchItems = async () => {
        const list = await getList();
        setBarcodeItems(list);
      };

      fetchItems();
    }, []),
  );

  const barcodeListItem = ({item}) => (
    <BarcodeListItem
      title={item.title}
      barcode={item.barcode}
      id={item.id}
      format={item.format}
      key={item.id}
      navigation={navigation}
      deleteItem={deleteItem}
      moveItem={moveItem}
    />
  );

  return (
    <View style={{backgroundColor: '#fff', flex: 1}}>
      <FlatList
        style={{flex: 1, backgroundColor: '#fff'}}
        data={barcodeItems}
        renderItem={barcodeListItem}
        keyExtractor={item => item.id.toString()}
      />
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => {
          onClickFab();
        }}></FAB>
    </View>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 24,
    right: 0,
    bottom: 0,
  },
});

export default MainScreen;
