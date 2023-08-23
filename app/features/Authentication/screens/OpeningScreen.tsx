import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import PrimaryContainer from '../../../components/containers/PrimaryContainer';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import * as RootNavigation from '../../../navigation/RootNavigation';
import firebaseAuthentication from '../../../config/authentication';
import {useDispatch} from 'react-redux';
import {setSpinnerVisible} from '../../../redux/action/action';
import {colors} from '../../../theme';
import {images} from '../../../theme/images';

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
          <Text style={styles.title}>{'Nav Auto Care'}</Text>
          <Text style={styles.description}>
            {
              'Welcome to Nav Auto Care \nyour all-in-one car service navigator. Find nearby service centers, navigate with live tracking, and get there faster. Enjoy a seamless experience designed to keep your vehicle running smoothly.'
            }
          </Text>

          <Image
            source={images.gif.opening_gif}
            resizeMode="contain"
            style={styles.image}
          />
        </View>
        <Text style={styles.bottomDescription}>
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
            style={styles.logout}
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
    color: colors.TEXT_COLOR_ON_DARK_BACKGROUND,
    marginTop: 16,
  },
  bottomDescription: {
    // fontFamily:'',
    fontSize: 14,
    lineHeight: 16,
    fontWeight: '400',
    textAlign: 'center',
    color: colors.TEXT_COLOR_ON_DARK_BACKGROUND,
    marginBottom: 4,
  },
  logout: {
    // fontFamily:'',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
    textAlign: 'center',
    color: colors.TEXT_COLOR_ON_LIGHT_BACKGROUND,
    marginVertical: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  image: {
    width: '100%',
    height: 300,
    marginVertical: 32,
  },
});
