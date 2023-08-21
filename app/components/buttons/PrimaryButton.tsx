import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {ImageSourcePropType} from 'react-native/types';
import React from 'react';
import type {PropsWithChildren} from 'react';
import {colors} from '../../theme';

type SectionProps = PropsWithChildren<{
  style?: object;
  text?: any;
  color: 'dark' | 'light';
  onPress?: any;
  icon?: ImageSourcePropType | undefined;
}>;
const PrimaryButton = ({
  style,
  text,
  color,
  onPress,
  icon,
}: SectionProps): React.JSX.Element => {
  return (
    <TouchableOpacity
      onPress={() => {
        onPress();
      }}
      style={{
        ...styles.parentView,
        ...(color === 'dark' ? styles.darkButton : styles.lightButton),
        ...style,
      }}>
      <Text style={styles.text}>{text}</Text>
      {icon && <Image source={icon} resizeMode="contain" style={styles.icon} />}
    </TouchableOpacity>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  parentView: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  darkButton: {
    backgroundColor: colors.PRIMARY_COLOR,
  },
  lightButton: {
    backgroundColor: colors.SECONDARY_COLOR,
  },
  text: {
    fontFamily:
      Platform.OS === 'ios' ? 'Myriad Pro Bold' : 'Myriad Pro Regular',
    fontSize: 16,
    lineHeight: 20,
    textAlign: 'center',
    fontWeight: '700',
    color: colors.TEXT_COLOR_ON_DARK_BACKGROUND,
  },
  icon: {
    width: 12,
    height: 12,
    marginLeft: 10,
  },
});
