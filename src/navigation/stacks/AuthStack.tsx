import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {AuthStartScreen} from '../../screens/auth/AuthStartScreen';

import {Screens} from '../consts/screens';

const Stack = createStackNavigator();

export default () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={Screens.AUTH_START} component={AuthStartScreen} />
    </Stack.Navigator>
  );
};
