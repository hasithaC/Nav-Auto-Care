import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import PrimaryContainer from '../../../components/containers/PrimaryContainer';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import * as RootNavigation from '../../../navigation/RootNavigation';
import PrimaryHeader from '../../../components/headers/PrimaryHeader';
import firebaseAuthentication from '../../../config/authentication';
import PhoneNumberInput from '../components/PhoneNumberInput';
import {isValidPhoneNumber} from 'react-phone-number-input';
import {colors} from '../../../theme';
import {useDispatch} from 'react-redux';
import {setSpinnerVisible} from '../../../redux/action/action';

const EnterPhoneNumberScreen = () => {
  const {auth} = firebaseAuthentication();
  const [PhoneNumber, setPhoneNumber] = useState('');
  const [validPhoneNumber, setValidPhoneNumber] = useState(true);
  const dispatch = useDispatch();

  const onPressPrimaryButton = async () => {
    dispatch(setSpinnerVisible(true));
    const valid = isValidPhoneNumber(PhoneNumber);
    setValidPhoneNumber(valid);
    if (validPhoneNumber) {
      const confirmation = await auth().signInWithPhoneNumber(PhoneNumber);
      if (confirmation) {
        dispatch(setSpinnerVisible(false));
        RootNavigation.navigate('EnterOTPScreen', {
          confirmation,
        });
      } else {
        dispatch(setSpinnerVisible(false));
      }
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

          <PhoneNumberInput
            onChangeMobileNum={setPhoneNumber}
            error={!validPhoneNumber}
          />
          <Text style={styles.description}>
            {'We will send you One Time Password on your phone number'}
          </Text>
        </View>
        <PrimaryButton
          color={'dark'}
          text={'GET OTP'}
          onPress={onPressPrimaryButton}
        />
      </PrimaryContainer>
    </View>
  );
};

export default EnterPhoneNumberScreen;

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
});
