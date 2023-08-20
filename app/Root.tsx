import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import NavigationStack from './navigation/NavigationStack';
import {navigationRef} from './navigation/RootNavigation';
import React from 'react';
import {colors} from './theme';

const Root = (): React.JSX.Element => {
  const navContainerTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: colors.BACKGROUND_COLOR,
    },
  };
  return (
    <>
      <StatusBar
        translucent={false}
        backgroundColor={colors.BACKGROUND_COLOR}
        barStyle={'default'}
      />
      <SafeAreaView style={styles.safeAreaView}>
        <NavigationContainer ref={navigationRef} theme={navContainerTheme}>
          <NavigationStack />
        </NavigationContainer>
      </SafeAreaView>
    </>
  );
};

export default Root;

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: colors.BACKGROUND_COLOR,
  },
});
