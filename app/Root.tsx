import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import NavigationStack from './navigation/NavigationStack';
import {navigationRef} from './navigation/RootNavigation';
import React from 'react';
import {colors} from './theme';
import {useSelector} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import AlertBox from './components/alert/AlertBox';

const Root = (): React.JSX.Element => {
  const SpinnerVisibility = useSelector(
    (state: any) => state.commonReducer.spinnerVisibility,
  );
  const AlertBoxVisibility = useSelector(
    (state: any) => state.commonReducer.alertBoxVisibility,
  );
  const navContainerTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: colors.SECONDARY_COLOR,
    },
  };
  return (
    <>
      <StatusBar
        translucent={false}
        backgroundColor={colors.SECONDARY_COLOR}
        barStyle={'default'}
      />
      <Spinner
        visible={SpinnerVisibility}
        overlayColor={colors.TRANSPARENT.PRIMARY_COLOR}
      />
      <SafeAreaView style={styles.safeAreaView}>
        <NavigationContainer ref={navigationRef} theme={navContainerTheme}>
          <NavigationStack />
        </NavigationContainer>
      </SafeAreaView>
      <AlertBox
        visible={AlertBoxVisibility.visible}
        title={AlertBoxVisibility.title}
        description={AlertBoxVisibility.description}
        button={AlertBoxVisibility.button}
        onPress={AlertBoxVisibility.onPress}
      />
    </>
  );
};

export default Root;

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: colors.SECONDARY_COLOR,
  },
});
