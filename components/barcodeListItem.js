import React from 'react';
import {StyleSheet, View, Text, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import OptionsMenu from './optionsMenu';

const BarcodeListItem = ({
  title,
  barcode,
  id,
  navigation,
  format,
  deleteItem,
  moveItem,
}) => {
  const onItemPress = (barcode, title) => {
    navigation.navigate('Barcode', {barcode, title, id, format});
  };

  const onMove = dir => {
    moveItem(id, dir);
  };

  return (
    <Pressable
      style={styles.paddedContainer}
      android_ripple={{color: '#ccc', borderless: false}}
      onPress={() => onItemPress(barcode, title)}>
      <Icon
        name={format === 'QR' ? 'qrcode' : 'barcode'}
        size={24}
        color="#555"
        style={styles.icon}
      />
      <View
        style={styles.container}
        onPress={() => onItemPress(barcode, title)}>
        <Text style={styles.text}>{title}</Text>
        <Text style={styles.shadowText}>{barcode}</Text>
      </View>
      {/* {btn} */}
      <OptionsMenu onDelete={() => deleteItem(id)} onMove={onMove} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  paddedContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff',
  },

  container: {
    height: 72,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'flex-start',
    flex: 1,
    borderColor: '#ccc',
    borderBottomWidth: StyleSheet.hairlineWidth * 2,
  },

  icon: {
    width: 72,
    paddingLeft: 24,
  },

  text: {
    fontSize: 18,
    color: '#333',
  },

  shadowText: {
    color: '#888',
  },
});

export default BarcodeListItem;
