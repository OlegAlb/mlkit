import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {AuthStartScreen} from '../../screens/auth/AuthStartScreen';

import {Screens} from '../consts/screens';

const Stack = createStackNavigator();

export default () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={Screens.CAPSULES_LIST} component={AuthStartScreen} />
    </Stack.Navigator>
  );
};
