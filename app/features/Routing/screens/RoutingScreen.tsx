import {StyleSheet, Text, View} from 'react-native';
import React, {useRef} from 'react';
import * as RootNavigation from '../../../navigation/RootNavigation';
import PrimaryHeader from '../../../components/headers/PrimaryHeader';
import {colors} from '../../../theme';
import SpotDetailsCard from '../views/SpotDetailsCard';

const RoutingScreen = () => {
  const spotDetailSheetRef = useRef<any>();

  const onPressBack = () => {
    RootNavigation.goBack();
  };
  return (
    <View style={styles.parentContainer}>
      <PrimaryHeader onPressBack={onPressBack} />
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text
          onPress={() => {
            spotDetailSheetRef.current.open();
          }}>
          RoutingScreen
        </Text>
      </View>
      <SpotDetailsCard />
    </View>
  );
};

export default RoutingScreen;

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    padding: 16,
  },
  spotDetailsView: {
    height: 'auto',
    width: '100%',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    padding: 16,
    backgroundColor: colors.SECONDARY_COLOR,
  },
});
