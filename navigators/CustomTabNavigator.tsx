import { Ionicons } from '@expo/vector-icons';
import {
  createNavigatorFactory,
  TabActions,
  TabRouter,
  useNavigationBuilder,
} from '@react-navigation/native';
import * as Device from 'expo-device';
import { Box, HStack, Pressable, useTheme } from 'native-base';
import * as React from 'react';
import { PropsWithChildren, useMemo } from 'react';
import { useIsRounded } from '../hooks/useIsRounded';

function TabNavigator({
  initialRouteName,
  children,
  screenOptions,
}: PropsWithChildren<{
  initialRouteName: string;
  screenOptions: { title: string; icon: string };
}>) {
  const { colors } = useTheme();

  const { state, navigation, descriptors, NavigationContent } = useNavigationBuilder(TabRouter, {
    children,
    screenOptions,
    initialRouteName,
  });

  const isRounded = useIsRounded();

  return (
    <NavigationContent>
      <Box flex={1}>
        {state.routes.map((route, i) => {
          return (
            <Box flex={1} key={route.key} display={i === state.index ? 'flex' : 'none'}>
              {descriptors[route.key].render()}
            </Box>
          );
        })}
      </Box>
      <HStack justifyContent="center">
        <Box
          position="absolute"
          bottom={0}
          flexDir="row"
          roundedTop="lg"
          overflow="hidden"
          justifyContent="center"
          _light={{ bgColor: 'black' }}
          _dark={{ bgColor: 'gray.800' }}
          bgColor="black">
          {state.routes.map((route, index) => (
            <Pressable
              pt={2}
              alignItems="center"
              width={24}
              pb={isRounded ? 12 : 16}
              mb={3}
              key={route.key}
              onPress={() => {
                navigation.dispatch({
                  ...TabActions.jumpTo(route.name),
                  target: state.key,
                });
              }}>
              <Ionicons
                name={descriptors[route.key].options.icon as any}
                color={index === state.index ? colors.orange['400'] : colors.gray['200']}
                size={32}
              />
            </Pressable>
          ))}
        </Box>
      </HStack>
    </NavigationContent>
  );
}

export const createCustomTabNavigator = createNavigatorFactory(TabNavigator);
