import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useRef, useState} from 'react';
import PrimaryContainer from '../../../components/containers/PrimaryContainer';
import PrimaryHeader from '../../../components/headers/PrimaryHeader';
import * as RootNavigation from '../../../navigation/RootNavigation';
import {colors} from '../../../theme';
import SpotDetailsCard from '../views/SpotDetailsCard';

const ExploreScreen = () => {
  const [spotDetailsCollapsed, setSpotDetailsCollapsed] = useState(false);
  const onPressBack = () => {
    RootNavigation.replace('OpeningScreen');
  };
  const onPressStart = () => {
    RootNavigation.navigate('RoutingScreen');
  };
  return (
    <View style={styles.parentContainer}>
      <PrimaryHeader onPressBack={onPressBack} type="searchbar" />
      <View style={styles.primaryContainer}>
        <Text
          onPress={() => {
            setSpotDetailsCollapsed(!spotDetailsCollapsed);
          }}>
          ExploreScreen
        </Text>
      </View>
      <SpotDetailsCard
        onPressStart={onPressStart}
        collapsed={spotDetailsCollapsed}
      />
    </View>
  );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    padding: 16,
  },
  primaryContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spotImage: {
    width: '100%',
    height: 120,
    backgroundColor: colors.ACCENT_COLOR,
    borderRadius: 8,
    marginVertical: 16,
  },
  spotDetailsTextContainer: {
    flex: 1,
    alignItems: 'center',
  },
  primaryButton: {
    marginBottom: 16,
  },
});
