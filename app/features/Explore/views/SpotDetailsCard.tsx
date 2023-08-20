import {StyleSheet, Text, View, Image} from 'react-native';
import React, {PropsWithChildren} from 'react';
import {colors} from '../../../theme';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import Collapsible from 'react-native-collapsible';

type SectionProps = PropsWithChildren<{
  onPressStart?: Function;
  collapsed?: boolean;
}>;
const SpotDetailsCard = ({
  onPressStart,
  collapsed = false,
}: SectionProps): React.JSX.Element => {
  return (
    <Collapsible style={styles.container} collapsed={collapsed}>
      <Image style={styles.image} resizeMode="contain" />
      <View style={styles.textContainer}>
        <Text>Auto Miraj</Text>
        <Text>5 min(2.2km)</Text>
      </View>
      <View style={styles.buttonContainer}>
        <PrimaryButton text={'START'} color="dark" onPress={onPressStart} />
      </View>
    </Collapsible>
  );
};

export default SpotDetailsCard;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.TRANSPARENT.PRIMARY_COLOR,
    borderRadius: 8,
    padding: 8,
  },
  image: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: 'green',
  },
  textContainer: {
    flex: 1,
    marginHorizontal: 16,
  },
  buttonContainer: {
    flex: 1,
  },
});
