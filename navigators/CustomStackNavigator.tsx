import { Ionicons } from '@expo/vector-icons';
import {
  createNavigatorFactory,
  TabActions,
  TabRouter,
  useNavigationBuilder,
} from '@react-navigation/native';
import { Box, Button, Heading, HStack, useTheme } from 'native-base';
import * as React from 'react';
import { PropsWithChildren } from 'react';

function StackNavigator({
  initialRouteName,
  children,
  screenOptions,
}: PropsWithChildren<{
  initialRouteName: string;
  screenOptions: { title: string; hideTopBar?: boolean; backTo?: string };
}>) {
  const { colors } = useTheme();

  const { state, navigation, descriptors, NavigationContent } = useNavigationBuilder(TabRouter, {
    children,
    screenOptions,
    initialRouteName,
  });

  const screen = descriptors[state.routes[state.index]?.key];
  const isHome = screen.route.name === state.routes[0].name;

  return (
    <NavigationContent>
      {!screen.options.hideTopBar && (
        <Box
          position="absolute"
          top={0}
          flex={1}
          width="100%"
          h={16}
          borderBottomWidth={1}
          _light={{ borderColor: 'gray.300' }}
          _dark={{ borderColor: 'gray.600' }}
          justifyContent="center"
          shadow="1"
          zIndex={10}>
          <HStack justifyContent={isHome ? 'center' : 'space-between'} alignItems="center" h="100%">
            {!isHome && (
              <Button
                h="95%"
                pt={4}
                px={10}
                ml={-5}
                mb={1}
                variant="ghost"
                colorScheme="pink"
                size="lg"
                roundedBottomRight="full"
                leftIcon={
                  <Ionicons name="arrow-back-outline" color={colors.pink['500']} size={20} />
                }
                onPress={() => {
                  navigation.dispatch({
                    ...TabActions.jumpTo(screen?.options.backTo || state.routes[0].name),
                    target: state.key,
                  });
                }}>
                Back
              </Button>
            )}
            <Heading opacity={0.4} mr={6} size="md">
              {screen?.options.title}
            </Heading>
          </HStack>
        </Box>
      )}
      <Box flex={1} mt={screen.options.hideTopBar ? 0 : 16}>
        {state.routes.map((route, i) => {
          return (
            <Box
              minHeight="100%"
              width="100%"
              display={i === state.index ? 'flex' : 'none'}
              key={route.key}>
              {descriptors[route.key].render()}
            </Box>
          );
        })}
      </Box>
    </NavigationContent>
  );
}

export const createCustomStackNavigator = createNavigatorFactory(StackNavigator);
