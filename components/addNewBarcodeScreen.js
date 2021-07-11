import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DropDown from 'react-native-paper-dropdown';

const AddNewBarcodeScreen = ({navigation, route}) => {
  const [name, setName] = useState();
  const [barcode, setBarcode] = useState();
  const [format, setFormat] = useState();

  const scannerTranslationTable = {
    CODE_128: 'CODE128',
    EAN_13: 'EAN13',
    CODE_39: 'CODE39',
    QR_CODE: 'QR',
  };

  const barcodeFormats = [
    {label: 'CODE128', value: 'CODE128'},
    {label: 'QR CODE', value: 'QR'},
    {label: 'Pharmacode', value: 'pharmacode'},
    {label: 'CODE39', value: 'CODE39'},
    {label: 'EAN-13', value: 'EAN13'},
  ];

  const [showDropDown, setShowDropDown] = useState(false);

  const saveBarcode = async () => {
    try {
      const items = JSON.parse(await AsyncStorage.getItem('@list'));
      const filteredItems = items.filter(item => item.id != route?.params.id);

      const itemList =
        filteredItems != null
          ? [
              ...filteredItems,
              {
                title: name,
                barcode,
                format,
                id: Math.round(Math.random() * 100000),
              },
            ]
          : [
              {
                title: name,
                barcode,
                format,
                id: Math.round(Math.random() * 100000),
              },
            ];
      await AsyncStorage.setItem('@list', JSON.stringify(itemList));
      navigation.navigate('home');
    } catch (error) {
      console.error(error);
    }
  };

  const updateInputs = () => {
    const {barcode, type, name} = route?.params || {};

    if (barcode) setBarcode(barcode);
    if (type) setFormat(scannerTranslationTable[type] || type);
    if (name) setName(name);
  };

  React.useEffect(updateInputs, [route?.params]);

  return (
    <View style={styles.mainContainer}>
      <TextInput
        mode="outlined"
        selectionColor="#121212"
        label="Name"
        style={{marginBottom: 8}}
        value={name}
        onChangeText={txt => setName(txt)}
      />
      <TextInput
        mode="outlined"
        selectionColor="#121212"
        label="Barcode number"
        style={{marginBottom: 8}}
        value={barcode}
        onChangeText={txt => setBarcode(txt)}
      />
      <DropDown
        style={{color: 'black'}}
        label={'Format'}
        mode={'outlined'}
        value={format}
        placeholder="CODE128"
        setValue={setFormat}
        list={barcodeFormats}
        visible={showDropDown}
        showDropDown={() => setShowDropDown(true)}
        onDismiss={() => setShowDropDown(false)}
        inputProps={{
          right: <TextInput.Icon name={'menu-down'} />,
        }}
      />
      <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
        <Button
          mode="outlined"
          style={{marginTop: 12, marginRight: 12}}
          onPress={() => {
            navigation.goBack();
          }}>
          CANCEL
        </Button>
        <Button
          mode="outlined"
          icon="barcode-scan"
          onPress={() => navigation.navigate('Scan')}
          style={{marginTop: 12, marginRight: 12}}>
          SCAN
        </Button>
        <Button
          mode="contained"
          onPress={() => saveBarcode()}
          style={{marginTop: 12}}>
          SAVE
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#fff',
    flex: 1,
    padding: 12,
    paddingHorizontal: 18,
  },
});

export default AddNewBarcodeScreen;
