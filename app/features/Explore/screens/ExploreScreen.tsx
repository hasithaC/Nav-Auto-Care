import {Image, StyleSheet, View, PermissionsAndroid} from 'react-native';
import React, {useEffect, useState} from 'react';
import PrimaryHeader from '../../../components/headers/PrimaryHeader';
import * as RootNavigation from '../../../navigation/RootNavigation';
import {colors} from '../../../theme';
import SpotDetailsCard from '../views/SpotDetailsCard';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {images} from '../../../theme/images';
import Geolocation from 'react-native-geolocation-service';

const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Geolocation Permission',
        message: 'Can we access your location?',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    console.log('granted', granted);
    if (granted === 'granted') {
      console.log('You can use Geolocation');
      return true;
    } else {
      console.log('You cannot use Geolocation');
      return false;
    }
  } catch (err) {
    return false;
  }
};

const ExploreScreen = () => {
  const [spotDetailsCollapsed, setSpotDetailsCollapsed] = useState(false);
  const [latitude, setLatitude] = useState(6.927079);
  const [longitude, setLongitude] = useState(79.861244);

  const onPressBack = () => {
    RootNavigation.replace('OpeningScreen');
  };
  const onPressStart = () => {
    RootNavigation.navigate('RoutingScreen');
  };

  const getLocation = () => {
    const result = requestLocationPermission();
    result.then(res => {
      console.log('res is:', res);
      if (res) {
        Geolocation.getCurrentPosition(
          position => {
            console.log(position);
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
          },
          error => {
            // See error code charts below.
            console.log(error.code, error.message);
            setLatitude(6.927079);
            setLongitude(79.861244);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      }
    });
    console.log(latitude, longitude);
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <View style={styles.parentContainer}>
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        region={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}>
        <Marker
          coordinate={{
            latitude: 37.78825,
            longitude: -122.4324,
          }}
          title="Auto Miraj">
          <Image source={images.icons.spot_pin} style={styles.spotPinIcon} />
        </Marker>
        <Marker
          coordinate={{
            latitude: latitude,
            longitude: longitude,
          }}
          title="You">
          <Image
            source={images.icons.current_location_pin}
            style={styles.spotPinIcon}
          />
        </Marker>
      </MapView>
      <PrimaryHeader
        onPressBack={onPressBack}
        type="searchbar"
        style={styles.header}
      />
      <SpotDetailsCard
        style={styles.detailsCard}
        onPressStart={onPressStart}
        collapsed={spotDetailsCollapsed}
      />
    </View>
  );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
  },
  header: {
    width: 'auto',
    position: 'absolute',
    top: 32,
    left: 16,
    right: 16,
  },
  detailsCard: {
    width: 'auto',
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
  },
  map: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spotImage: {
    width: '100%',
    height: 120,
    backgroundColor: colors.ACCENT_COLOR,
    borderRadius: 8,
    marginVertical: 16,
  },
  spotDetailsTextContainer: {
    flex: 1,
    alignItems: 'center',
  },
  primaryButton: {
    marginBottom: 16,
  },
  spotPinIcon: {
    width: 48,
    height: 48,
    resizeMode: 'contain',
  },
});
