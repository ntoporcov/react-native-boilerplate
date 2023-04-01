import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';

import { Home } from '../pages/Home';
import { createCustomStackNavigator } from './CustomStackNavigator';
import { createCustomTabNavigator } from './CustomTabNavigator';

export type TabParamList = {
  Search: undefined;
};

export type HomeStackParamList = {
  Home: undefined;
};

export type NestedHomeScreenProps<T extends keyof HomeStackParamList> = CompositeScreenProps<
  StackScreenProps<HomeStackParamList, T>,
  BottomTabScreenProps<TabParamList, 'Search'>
>;

export const Tabs = createCustomTabNavigator<TabParamList>();
export const HomeStack = createCustomStackNavigator<HomeStackParamList>();

export const HomeNavigator = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={Home}
        options={{ title: 'Home', hideTopBar: true }}
      />
    </HomeStack.Navigator>
  );
};

export const RootTabNavigator = () => {
  return (
    <Tabs.Navigator initialRouteName="Search">
      <Tabs.Screen
        name="Search"
        component={HomeNavigator}
        options={{
          icon: 'chatbubble-ellipses',
        }}
      />
    </Tabs.Navigator>
  );
};
