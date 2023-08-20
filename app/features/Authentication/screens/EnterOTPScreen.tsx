import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import PrimaryContainer from '../../../components/containers/PrimaryContainer';
import {TextInput} from 'react-native-gesture-handler';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import * as RootNavigation from '../../../navigation/RootNavigation';
import PrimaryHeader from '../../../components/headers/PrimaryHeader';

const EnterOTPScreen = () => {
  const [number, onChangeNumber] = React.useState('');

  const onPressPrimaryButton = () => {
    RootNavigation.navigate('EnterOTPScreen');
  };

  const onPressBack = () => {
    RootNavigation.goBack();
  };

  return (
    <View style={styles.parentContainer}>
      <PrimaryHeader onPressBack={onPressBack} />
      <PrimaryContainer style={styles.primaryContainer}>
        <View style={styles.topContent}>
          <Text>{'Verification'}</Text>
          <Text>{'You will get a OTP via SMS'}</Text>

          <TextInput
            style={{height: 40, marginBottom: 100}}
            onChangeText={onChangeNumber}
            value={number}
            secureTextEntry
            placeholder="Enter OTP"
            keyboardType="phone-pad"
          />
        </View>
        <PrimaryButton
          color={'dark'}
          text={'VERIFY'}
          onPress={onPressPrimaryButton}
        />

        <Text>
          <Text>Did't recive the verification OTP? </Text>
          <Text>{'Resend again'}</Text>
        </Text>
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
    alignItems: 'center',
    justifyContent: 'center',
  },
});
