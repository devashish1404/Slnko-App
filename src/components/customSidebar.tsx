import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Drawer } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import type { DrawerNavigationProp } from '@react-navigation/drawer';


type DrawerParamList = {
  Home: undefined;
  ProfileDetail: undefined;
  ExpenseDetail: undefined;
};

const CustomSidebar: React.FC = () => {
  const [active, setActive] = useState('');
  const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();

  return (
    <View style={styles.container}>
      <Drawer.Section title="Navigation">
        <Drawer.Item
          label="Home"
          active={active === 'home'}
          onPress={() => {
            setActive('home');
            navigation.navigate('Home');
          }}
        />
        <Drawer.Item
          label="Profile"
          active={active === 'profile'}
          onPress={() => {
            setActive('profile');
            navigation.navigate('ProfileDetail');
          }}
        />
        <Drawer.Item
          label="Expense"
          active={active === 'expense'}
          onPress={() => {
            setActive('expense');
            navigation.navigate('ExpenseDetail');
          }}
        />
      </Drawer.Section>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
  },
});

export default CustomSidebar;
