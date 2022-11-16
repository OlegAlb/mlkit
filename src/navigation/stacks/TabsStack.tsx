import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import TabsScreen from '../../screens/tabs/TabsScreen';

import {Screens} from '../consts/screens';

const Stack = createStackNavigator();

export default () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={Screens.TABS} component={TabsScreen} />
    </Stack.Navigator>
  );
};
