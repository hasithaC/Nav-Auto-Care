import {call, put, select} from 'redux-saga/effects';
import {
  setAlertBoxVisibility,
  setNearSpots,
  setSelectedSpot,
  setSpinnerVisible,
  setSpotsAvalability,
} from '../../../redux/action/action';
import {fetchSpotsNearBy} from '../../../services/Explore/Explore';

export function* callSpotFetchAPI(action: any) {
  const url = action.payload;
  yield put(setSpinnerVisible(true));
  yield put(setSpotsAvalability(false));

  const aboutDefaultSelectedSpot = {
    visible: true,
    title: 'Service Station Near You',
    description:
      'The station selected is the closest to your location. Would you like to choose another? Tap any station pin icon.',
    button: 'OK',
    onPress: () => {},
  };

  try {
    const response: {
      html_attributions: [];
      next_page_token: string;
      results: [];
    } = yield call(fetchSpotsNearBy, url);

    yield put(setNearSpots(response.results));
    yield put(
      setSelectedSpot(
        response.results[0] ? response.results[0] : {name: '', vicinity: ''},
      ),
    );
    yield put(setSpotsAvalability(true));
    yield put(setAlertBoxVisibility(aboutDefaultSelectedSpot));
  } catch (error) {
    yield put(setSpotsAvalability(false));
    console.log('Spots Fetching ->', error);
  }
  yield put(setSpinnerVisible(false));
}
