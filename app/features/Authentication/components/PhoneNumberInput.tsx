import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {PropsWithChildren, useRef, useState} from 'react';
import PrimaryTextInput from '../../../components/textInput/PrimaryTextInput';
import CountryCodeDropdown from './CountryCodeDropdown';
import {images} from '../../../theme/images';
import {colors} from '../../../theme';

type SectionProps = PropsWithChildren<{
  style?: object;
  onChangeMobileNum?: any;
  secureTextEntry?: boolean;
  reference?: any;
  error?: boolean;
}>;

const PhoneNumberInput = ({
  style,
  onChangeMobileNum,
  reference,
  error,
}: SectionProps) => {
  const [number, setNumber] = useState('');
  const [countryObj, setCountryObj] = useState({
    name: 'Sri Lanka',
    dial_code: '+94',
    code: 'LK',
  });
  const dropdownRef = useRef<any>();

  const onPressCountyCode = () => {
    dropdownRef.current.open();
  };

  const onChangeNumber = (text: string) => {
    setNumber(text);
    onChangeMobileNum(countryObj.dial_code + text);
  };

  const onChangeContryCode = (obj: {
    name: string;
    dial_code: string;
    code: string;
  }) => {
    setCountryObj(obj);
    onChangeMobileNum(obj.dial_code + number);
  };
  return (
    <>
      <View style={{...styles.mobileNumInput, ...style}}>
        <TouchableOpacity
          style={styles.countryCode}
          onPress={onPressCountyCode}>
          <TextInput editable={false} style={styles.countryCodeInput}>
            {countryObj.code} {countryObj.dial_code}
          </TextInput>
          <Image
            source={images.icons.back_icon}
            resizeMode="contain"
            style={styles.downIcon}
          />
        </TouchableOpacity>
        <PrimaryTextInput
          error={error}
          reference={reference}
          value={number}
          style={styles.textInput}
          inputMode="numeric"
          keyboardType="phone-pad"
          onChangeText={(text: string) => onChangeNumber(text)}
        />
      </View>
      <CountryCodeDropdown
        reference={dropdownRef}
        onPressItem={(obj: {name: string; dial_code: string; code: string}) =>
          onChangeContryCode(obj)
        }
      />
    </>
  );
};

export default PhoneNumberInput;

const styles = StyleSheet.create({
  mobileNumInput: {
    width: '100%',
    paddingTop: 10,
    paddingBottom: 24,
    flexDirection: 'row',
  },
  textInput: {
    flex: 1,
  },
  countryCode: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
    paddingHorizontal: 10,
    backgroundColor: colors.TRANSPARENT.PRIMARY_COLOR,
    borderRadius: 5,
    borderWidth: 1.4,
    borderColor: colors.PRIMARY_COLOR,
  },
  countryCodeInput: {
    //fontFamily: '',
    fontSize: 18,
    lineHeight: 21,
    textAlign: 'center',
    fontWeight: '400',
    color: colors.TEXT_COLOR_ON_DARK_BACKGROUND,
    paddingTop: 0,
    paddingBottom: 0,
    paddingVertical: 12,
  },
  downIcon: {
    width: 12,
    height: 8,
    marginLeft: 5,
    transform: [{rotate: '-90deg'}],
  },
});
