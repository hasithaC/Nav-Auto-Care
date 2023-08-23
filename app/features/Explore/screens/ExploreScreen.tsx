import {Image, StyleSheet, View, PermissionsAndroid, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import PrimaryHeader from '../../../components/headers/PrimaryHeader';
import * as RootNavigation from '../../../navigation/RootNavigation';
import {colors} from '../../../theme';
import SpotDetailsCard from '../views/SpotDetailsCard';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {images} from '../../../theme/images';
import Geolocation from 'react-native-geolocation-service';
import {googleAPIKey} from '../../../constants/GoogleAPIKey';
import {fetchSpotsNearBy} from '../../../services/Explore/Explore';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import MapViewDirections from 'react-native-maps-directions';
import {useDispatch, useSelector} from 'react-redux';
import {
  getNearSpots,
  setNearSpots,
  setSelectedSpot,
  setSpinnerVisible,
  setSpotsAvalability,
} from '../../../redux/action/action';

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
  const [latitude, setLatitude] = useState(6.927079);
  const [longitude, setLongitude] = useState(79.861244);
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);
  const dispatch = useDispatch();
  let radius = 4 * 1000;
  const placeType = 'car_wash';

  const SpotsAvalability = useSelector(
    (state: any) => state.commonReducer.spotsAvalability,
  );
  const SPOTS = useSelector((state: any) => state.commonReducer.nearSpots);
  const SPOT = useSelector((state: any) => state.commonReducer.selectedSpot);

  const url =
    'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' +
    latitude +
    ',' +
    longitude +
    '&radius=' +
    radius +
    '&type=' +
    placeType +
    '&key=' +
    googleAPIKey;

  const onPressBack = () => {
    RootNavigation.replace('OpeningScreen');
  };

  const onPressStart = () => {
    RootNavigation.navigate('RoutingScreen');
  };

  const getLocation = () => {
    dispatch(setSpinnerVisible(true));
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
    dispatch(setSpinnerVisible(false));
  };

  useEffect(() => {
    getLocation();
    dispatch(setNearSpots([]));
    dispatch(setSpotsAvalability(false));
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
        {SpotsAvalability && (
          <>
            {SPOTS.map((item, index) => {
              return (
                <Marker
                  key={index}
                  coordinate={{
                    latitude: item.geometry.location.lat,
                    longitude: item.geometry.location.lng,
                  }}
                  onPress={() => {
                    dispatch(setSelectedSpot(item));
                  }}>
                  <Image
                    source={images.icons.spot_pin}
                    style={styles.spotPinIcon}
                  />
                </Marker>
              );
            })}
          </>
        )}

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
        {SPOT.geometry && SpotsAvalability && (
          <MapViewDirections
            origin={{
              latitude: latitude,
              longitude: longitude,
            }}
            strokeWidth={3}
            strokeColor="red"
            destination={{
              latitude: SPOT.geometry.location.lat,
              longitude: SPOT.geometry.location.lng,
            }}
            apikey={googleAPIKey}
            onReady={result => {
              setDuration(result.duration);
              setDistance(result.distance);
            }}
          />
        )}
      </MapView>
      <PrimaryHeader
        onPressBack={onPressBack}
        type="searchbar"
        style={styles.header}
      />

      {!SpotsAvalability && (
        <PrimaryButton
          text={'FIND SERVICE CENTERS NEAR YOU'}
          onPress={() => {
            dispatch(getNearSpots(url));
          }}
          color="dark"
          style={styles.detailsCard}
        />
      )}
      {SpotsAvalability && (
        <SpotDetailsCard
          details={`${SPOT.name} | ${Math.round(distance * 10) / 10}km | ${
            Math.round(duration * 100) / 100
          }min`}
          style={styles.detailsCard}
          onPressStart={onPressStart}
          onPressCancel={() => {
            dispatch(setNearSpots([]));
            dispatch(setSpotsAvalability(false));
          }}
          collapsed={false}
        />
      )}
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
    tintColor: colors.ACCENT_COLOR,
  },
});
