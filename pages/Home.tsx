import { Button, Heading, ScrollView, Text, VStack } from 'native-base';

import { NestedHomeScreenProps } from '../navigators/NavigatorImplementations';
import { useState } from 'react';
import { IVStackProps } from 'native-base/lib/typescript/components/primitives/Stack/VStack';

const PageBox = (props: IVStackProps) => <VStack {...props} mx={5} />;

export const Home = ({ route, navigation }: NestedHomeScreenProps<'Home'>) => {
  const [counter, setCounter] = useState(0);

  return (
    <ScrollView flex={1}>
      <PageBox justifyContent="center" minHeight="100%">
        <Heading>Welcome back, Nic</Heading>
        <Text>Counter:{counter}</Text>
        <Button onPress={() => setCounter((curr) => curr + 1)}>Increase</Button>
      </PageBox>
    </ScrollView>
  );
};
