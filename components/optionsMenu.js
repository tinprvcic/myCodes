import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Menu} from 'react-native-paper';

const OptionsMenu = ({onDelete, onMove}) => {
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const btn = (
    <Pressable
      android_ripple={{color: '#ccc', borderless: true, radius: 32}}
      onPressIn={openMenu}>
      <Icon
        size={24}
        color="#555"
        name="dots-vertical"
        style={{
          paddingRight: 18,
          paddingLeft: 18,
          borderColor: '#ccc',
          borderBottomWidth: StyleSheet.hairlineWidth * 2,
          paddingBottom: 24,
          paddingTop: 22.5,
        }}
      />
    </Pressable>
  );

  return (
    <Menu
      visible={visible}
      anchor={btn}
      visible={visible}
      statusBarHeight={48}
      onDismiss={closeMenu}>
      <Menu.Item onPress={() => onDelete()} title="Delete" />
      <Menu.Item onPress={() => onMove('up')} title="Move up" />
      <Menu.Item onPress={() => onMove('down')} title="Move down" />
    </Menu>
  );
};

export default OptionsMenu;
