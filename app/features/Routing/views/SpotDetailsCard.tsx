import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors} from '../../../theme';

const SpotDetailsCard = (): React.JSX.Element => {
  return (
    <View style={styles.container}>
      <Text>5 min</Text>
      <Text>2.2km . 1.08 AM</Text>
    </View>
  );
};

export default SpotDetailsCard;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.TRANSPARENT.PRIMARY_COLOR,
    borderRadius: 8,
    padding: 8,
  },
});
