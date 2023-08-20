import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AuthScreen from '../features/Authentication/screens/AuthScreen';
import RoutingScreen from '../features/Routing/screens/RoutingScreen';
import ExploreScreen from '../features/Explore/screens/ExploreScreen';

const Stack = createStackNavigator();

const NavigationStack = (): React.JSX.Element => {
  return (
    <Stack.Navigator
      initialRouteName="AuthScreen"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="AuthScreen" component={AuthScreen} />
      <Stack.Screen name="RoutingScreen" component={RoutingScreen} />
      <Stack.Screen name="ExploreScreen" component={ExploreScreen} />
    </Stack.Navigator>
  );
};

export default NavigationStack;
