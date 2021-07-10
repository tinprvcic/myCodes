import React from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';

import {View} from 'react-native';

const ScanBarcodeScreen = props => {
  return (
    <View style={{flex: 1, backgroundColor: '#000'}}>
      <QRCodeScanner
        onRead={e =>
          props.navigation.navigate('Add New', {type: e.type, barcode: e.data})
        }
        showMarker
        markerStyle={{borderColor: '#fff'}}
      />
    </View>
  );
};

export default ScanBarcodeScreen;
