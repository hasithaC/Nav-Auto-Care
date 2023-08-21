import {StyleSheet, TextInput, View} from 'react-native';
import React, {PropsWithChildren} from 'react';
import {colors} from '../../theme';

type SectionProps = PropsWithChildren<{
  style?: object;
  placeholder?: any;
  keyboardType: 'email-address' | 'default' | 'phone-pad';
  inputMode: 'email' | 'text' | 'numeric';
  onChangeText: any;
  value: string;
  secureTextEntry?: boolean;
  reference?: any;
  error?: boolean;
  maxLength?: number;
  textInputStyle?: object;
}>;

const PrimaryTextInput = ({
  style,
  placeholder,
  keyboardType,
  inputMode,
  value,
  onChangeText,
  secureTextEntry = false,
  reference,
  error = false,
  maxLength,
  textInputStyle,
}: SectionProps) => {
  return (
    <View style={{...styles.parentView, ...style}}>
      <TextInput
        ref={reference}
        value={value}
        keyboardType={keyboardType}
        inputMode={inputMode}
        placeholder={placeholder}
        style={{
          ...(error ? styles.textInputError : styles.textInput),
          ...textInputStyle,
        }}
        placeholderTextColor={colors.TEXT_COLOR_ON_LIGHT_BACKGROUND}
        onChangeText={onChangeText}
        numberOfLines={1}
        contextMenuHidden={true}
        secureTextEntry={secureTextEntry}
        autoCapitalize="none"
        maxLength={maxLength}
      />
    </View>
  );
};

export default PrimaryTextInput;

const styles = StyleSheet.create({
  parentView: {
    width: '100%',
    justifyContent: 'center',
  },
  textInput: {
    //fontFamily: '',
    fontSize: 18,
    lineHeight: 21,
    textAlign: 'left',
    fontWeight: '400',
    color: colors.TEXT_COLOR_ON_DARK_BACKGROUND,
    paddingTop: 0,
    paddingBottom: 0,
    paddingVertical: 12,
    paddingHorizontal: 10,
    backgroundColor: colors.TRANSPARENT.PRIMARY_COLOR,
    borderRadius: 5,
    borderWidth: 1.4,
    borderColor: colors.PRIMARY_COLOR,
    height: 40,
  },
  textInputError: {
    //fontFamily: '',
    fontSize: 18,
    lineHeight: 21,
    textAlign: 'left',
    fontWeight: '400',
    color: colors.TEXT_COLOR_ON_DARK_BACKGROUND,
    paddingTop: 0,
    paddingBottom: 0,
    paddingVertical: 12,
    paddingHorizontal: 10,
    backgroundColor: colors.TRANSPARENT.PRIMARY_COLOR,
    borderRadius: 5,
    borderWidth: 1.4,
    borderColor: colors.ACCENT_COLOR,
    height: 40,
  },
});
