import {StyleSheet, Text, View, Image} from 'react-native';
import React, {PropsWithChildren} from 'react';
import {colors} from '../../../theme';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import Collapsible from 'react-native-collapsible';

type SectionProps = PropsWithChildren<{
  onPressStart?: Function;
  onPressCancel?: Function;
  collapsed?: boolean;
  style?: object;
  imageUrl?: string;
  details?: string;
}>;
const SpotDetailsCard = ({
  onPressStart,
  style,
  details = '',
  onPressCancel,
}: SectionProps): React.JSX.Element => {
  return (
    <View style={{...styles.container, ...style}}>
      <Text style={styles.spotDetails}>{details}</Text>

      <View style={styles.buttonsContainer}>
        <View style={styles.buttonContainer}>
          <PrimaryButton
            text={'CANCEL'}
            color="light"
            onPress={onPressCancel}
          />
        </View>

        <View style={styles.buttonContainer}>
          <PrimaryButton text={'START'} color="dark" onPress={onPressStart} />
        </View>
      </View>
    </View>
  );
};

export default SpotDetailsCard;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    borderRadius: 8,
  },
  spotDetails: {
    //fontFamily:'',
    fontSize: 15,
    lineHeight: 18,
    textAlign: 'center',
    fontWeight: '400',
    padding: 8,
    borderRadius: 8,
    color: colors.TEXT_COLOR_ON_LIGHT_BACKGROUND,
    backgroundColor: colors.ACCENT_COLOR
  },
  buttonsContainer: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
  },
  buttonContainer: {
    flex: 1,
    padding: 4,
  },
});
