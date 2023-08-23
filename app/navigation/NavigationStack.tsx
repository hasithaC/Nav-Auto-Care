import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import RoutingScreen from '../features/Routing/screens/RoutingScreen';
import ExploreScreen from '../features/Explore/screens/ExploreScreen';
import EnterPhoneNumberScreen from '../features/Authentication/screens/EnterPhoneNumberScreen';
import EnterOTPScreen from '../features/Authentication/screens/EnterOTPScreen';
import OpeningScreen from '../features/Authentication/screens/OpeningScreen';

const Stack = createStackNavigator();

const NavigationStack = (): React.JSX.Element => {
  return (
    <Stack.Navigator
      initialRouteName="OpeningScreen"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="OpeningScreen" component={OpeningScreen} />
      <Stack.Screen
        name="EnterPhoneNumberScreen"
        component={EnterPhoneNumberScreen}
      />
      <Stack.Screen name="EnterOTPScreen" component={EnterOTPScreen} />
      <Stack.Screen name="RoutingScreen" component={RoutingScreen} />
      <Stack.Screen name="ExploreScreen" component={ExploreScreen} />
    </Stack.Navigator>
  );
};

export default NavigationStack;
