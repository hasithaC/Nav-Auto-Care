import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import PrimaryContainer from '../../../components/containers/PrimaryContainer';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import * as RootNavigation from '../../../navigation/RootNavigation';
import PrimaryHeader from '../../../components/headers/PrimaryHeader';
import {colors} from '../../../theme';
import OtpInputs from 'react-native-otp-inputs';

const EnterOTPScreen = (props: {route: {params: {confirmation: any}}}) => {
  const [OTP, onChangeOTP] = useState('');
  const [validOTP, setValidOTP] = useState(true);

  const onPressPrimaryButton = async () => {
    const authConfirmation = props.route.params.confirmation;
    try {
      await authConfirmation.confirm(OTP);
      setValidOTP(true);
      RootNavigation.navigate('ExploreScreen');
    } catch (error) {
      setValidOTP(false);
    }
  };

  const onPressBack = () => {
    RootNavigation.goBack();
  };

  return (
    <View style={styles.parentContainer}>
      <PrimaryHeader onPressBack={onPressBack} />
      <PrimaryContainer style={styles.primaryContainer}>
        <View style={styles.topContent}>
          <Text style={styles.title}>{'Verification'}</Text>

          <OtpInputs
            handleChange={code => onChangeOTP(code)}
            numberOfInputs={6}
            autofillFromClipboard={false}
            keyboardType="phone-pad"
            inputStyles={validOTP ? styles.otpInput : styles.otpInputError}
            style={styles.otpInputComponentContainer}
          />
          <Text style={styles.description}>
            {'We will send you get Time Password on your phone number'}
          </Text>
        </View>

        <PrimaryButton
          color={'dark'}
          text={'VERIFY'}
          onPress={onPressPrimaryButton}
        />
      </PrimaryContainer>
    </View>
  );
};

export default EnterOTPScreen;

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    padding: 16,
  },
  primaryContainer: {
    justifyContent: 'center',
  },
  topContent: {
    flex: 1,
    width: '100%',
    marginTop: '20%',
    paddingHorizontal: 24,
  },
  title: {
    // fontFamily:'',
    textAlign: 'left',
    fontSize: 38,
    lineHeight: 45,
    fontWeight: '600',
    color: colors.TEXT_COLOR_ON_DARK_BACKGROUND,
    marginBottom: 10,
  },
  description: {
    // fontFamily:'',
    fontSize: 14,
    lineHeight: 16,
    fontWeight: '400',
    color: colors.TEXT_COLOR_ON_LIGHT_BACKGROUND,
    marginTop: 16,
  },
  otpInputComponentContainer: {
    width: '100%',
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 24,
  },
  otpInput: {
    // fontFamily:'',

    fontSize: 18,
    lineHeight: 21,
    textAlign: 'center',
    fontWeight: '400',
    color: colors.TEXT_COLOR_ON_DARK_BACKGROUND,
    width: 28,
    height: 40,
    marginRight: 10,
    borderRadius: 5,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.TRANSPARENT.PRIMARY_COLOR,
    borderColor: colors.PRIMARY_COLOR,
  },
  otpInputError: {
    width: 28,
    height: 40,
    marginRight: 10,
    borderRadius: 5,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: colors.TRANSPARENT.PRIMARY_COLOR,
    borderColor: colors.ACCENT_COLOR,
  },
});
