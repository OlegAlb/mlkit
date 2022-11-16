import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {InitScreen} from '../../screens/init/InitScreen';

import {Screens} from '../consts/screens';

const Stack = createStackNavigator();

export default () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={Screens.INIT} component={InitScreen} />
    </Stack.Navigator>
  );
};
