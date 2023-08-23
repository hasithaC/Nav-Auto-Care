import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import PrimaryContainer from '../../../components/containers/PrimaryContainer';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import * as RootNavigation from '../../../navigation/RootNavigation';
import firebaseAuthentication from '../../../config/authentication';
import {useDispatch} from 'react-redux';
import {setSpinnerVisible} from '../../../redux/action/action';

const OpeningScreen = () => {
  const userTypes = {
    FRESH_USER: 'FRESH_USER',
    EXISTING_USER: 'EXISTING_USER',
  };
  const dispatch = useDispatch();
  const [userType, setUserType] = useState(userTypes.FRESH_USER);
  useEffect(() => {
    dispatch(setSpinnerVisible(true));
    try {
      firebaseAuthentication()
        .auth()
        .onAuthStateChanged(user => {
          if (user !== null) {
            setUserType(userTypes.EXISTING_USER);
          } else {
            setUserType(userTypes.FRESH_USER);
          }
        });
    } catch (error) {
      console.log(error);
    }
    dispatch(setSpinnerVisible(false));
  }, []);
  const onPressPrimaryButton = async () => {
    if (userType === userTypes.EXISTING_USER) {
      RootNavigation.navigate('ExploreScreen');
    } else {
      RootNavigation.navigate('EnterPhoneNumberScreen');
    }
  };

  return (
    <View style={styles.parentContainer}>
      <PrimaryContainer style={styles.primaryContainer}>
        <View style={styles.topContent}>
          <Text>{'Nav Auto Care'}</Text>
          <Text>
            {
              'Welcome to Nav Auto Care \n your all-in-one car service navigator. Find nearby service centers, navigate with live tracking, and get there faster. Enjoy a seamless experience designed to keep your vehicle running smoothly.'
            }
          </Text>
        </View>
        <Text>
          {
            'Your personalized car service center navigator, \n Powered by React Native and Firebase.'
          }
        </Text>
        <PrimaryButton
          color={'dark'}
          text={'GET START'}
          onPress={onPressPrimaryButton}
        />
        {userType === userTypes.EXISTING_USER && (
          <Text
            onPress={() => {
              dispatch(setSpinnerVisible(true));
              firebaseAuthentication()
                .auth()
                .signOut()
                .then(
                  function () {
                    console.log('Signed Out');
                  },
                  function (error) {
                    console.error('Sign Out Error', error);
                  },
                );
              dispatch(setSpinnerVisible(false));
            }}>
            Log Out
          </Text>
        )}
      </PrimaryContainer>
    </View>
  );
};

export default OpeningScreen;

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
