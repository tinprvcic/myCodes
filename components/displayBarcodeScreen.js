import React from 'react';
import Barcode from 'react-native-barcode-builder';
import {View, Text, Alert} from 'react-native';
import {Provider as PaperProvider, Button} from 'react-native-paper';
import QRCode from 'react-native-qrcode-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DisplayBarcodeScreen = props => {
  const getList = async () => {
    try {
      const list = await AsyncStorage.getItem('@list');
      return list != null ? JSON.parse(list) : [];
    } catch (error) {
      throw error;
    }
  };

  const alertDeletion = () => {
    Alert.alert(
      'Confirm Deletion',
      'Are your sure you want to delete this barcode?',
      [
        {
          text: 'No',
        },
        {
          text: 'Yes',
          onPress: deleteBarcode,
        },
      ],
    );
  };

  const deleteBarcode = async () => {
    const list = await getList();
    const finalList = list.filter(item => item.id != props.route.params.id);
    try {
      await AsyncStorage.setItem('@list', JSON.stringify(finalList));
      props.navigation.navigate('home');
    } catch (error) {
      throw error;
    }
  };

  return (
    <PaperProvider>
      <View style={{flex: 1, backgroundColor: '#fff', flex: 1}}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {props.route.params.format === 'QR' ? (
            <QRCode
              value={props.route.params.barcode}
              size={230}
              backgroundColor="transparent"
            />
          ) : (
            <Barcode
              format={props.route.params.format}
              value={props.route.params.barcode}
              background="#00000000"
              width={2.5}
              height={150}
              flat
            />
          )}
          <Text
            style={{
              fontFamily: 'monospace',
              fontSize: 24,
              letterSpacing: 2,
              marginTop: props.route.params.format === 'QR' ? 12 : 0,
            }}>
            {props.route.params.barcode}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            padding: 16,
          }}>
          <Button mode="outlined" disabled style={{marginRight: 12}}>
            EDIT
          </Button>
          <Button mode="outlined" onPress={() => alertDeletion()}>
            DELETE
          </Button>
        </View>
      </View>
    </PaperProvider>
  );
};

export default DisplayBarcodeScreen;
