import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import MainScreen from './components/mainScreen';
import AddNewBarcodeScreen from './components/addNewBarcodeScreen';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import DisplayBarcodeScreen from './components/displayBarcodeScreen';
import {Provider as PaperProvider} from 'react-native-paper';
import ScanBarcodeScreen from './components/scanBarcodeScreen';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    card: '#121212',
    text: '#fcfcfc',
  },
};

const Stack = createStackNavigator();

const App = () => {
  StatusBar.setBackgroundColor('#000', false);

  return (
    <SafeAreaView style={{flex: 1}}>
      <PaperProvider>
        <NavigationContainer theme={theme}>
          <Stack.Navigator
            screenOptions={{
              headerPressColorAndroid: '#ccc',
            }}>
            <Stack.Screen
              name="home"
              component={MainScreen}
              options={{title: 'barcodes'}}
            />
            <Stack.Screen name="Add New" component={AddNewBarcodeScreen} />
            <Stack.Screen
              name="Barcode"
              component={DisplayBarcodeScreen}
              options={({route}) => ({
                title: route.params.title,
              })}
            />
            <Stack.Screen name="Scan" component={ScanBarcodeScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaView>
  );
};

export default App;
