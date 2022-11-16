import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import React from 'react';
import {useTranslation} from 'react-i18next';

import Navigation from '../../base/Navigation';
import {Screens} from '../../navigation/consts/screens';
import {Tabs} from '../../navigation/consts/tabs';
import CapsulesStack from '../../navigation/stacks/CapsulesStack';

const Tab = createBottomTabNavigator();

const getTabBarVisible = (route: any) => {
  const routeName = getFocusedRouteNameFromRoute(route);
  const hideOnScreens: Screens[] = [];

  if (!routeName) {
    return 'flex';
  }

  return hideOnScreens.toString().includes(routeName) ? 'none' : 'flex';
};

export default () => {
  const {t} = useTranslation();

  return (
    <Tab.Navigator
      initialRouteName={Navigation.initialRoute}
      screenOptions={{
        headerShown: false,
        tabBarStyle: {elevation: 0, borderWidth: 0},
      }}>
      <Tab.Screen
        name={Tabs.TAB_CAPSULES}
        component={CapsulesStack}
        options={({route}) => ({
          tabBarIcon: ({focused}) => null,
          tabBarLabel: t('') as string,
          tabBarStyle: {display: getTabBarVisible(route)},
        })}
      />
    </Tab.Navigator>
  );
};
