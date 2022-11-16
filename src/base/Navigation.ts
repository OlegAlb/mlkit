import {NavigationContainerRef} from '@react-navigation/core';
import * as React from 'react';

import {Tabs} from '../navigation/consts/tabs';

export interface NavigationParams {
  [key: string]: any;
}

export default class Navigation {
  static navigationRef = React.createRef<NavigationContainerRef<any>>();

  static initialRoute: string = Tabs.TAB_CAPSULES;

  static setInitialRoute = (route: string) => {
    this.initialRoute = route;
  };

  static navigate = <ParamList extends {}>(
    routeName: string | keyof ParamList,
    params?:
      | ParamList[keyof ParamList]
      | {screen: string | keyof ParamList extends unknown ? undefined extends ParamList[keyof ParamList] ? [screen: string | keyof ParamList] | [screen: string | keyof ParamList, params: ParamList[keyof ParamList]] : [screen: string | keyof ParamList, params: ParamList[keyof ParamList]] : never},
  ) => {
    this.navigationRef.current?.navigate(routeName, params)
  };

  static replace = (routeName: string, params?: NavigationParams) => {
    this.navigationRef.current?.reset({
      index: 0,
      routes: [{name: routeName, params: params}],
    }),
  };

  static goBack = () => {
    this.navigationRef.current?.goBack();
  };
}
