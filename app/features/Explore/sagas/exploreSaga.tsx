import {call, put, select} from 'redux-saga/effects';
import {
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
  } catch (error) {
    yield put(setSpotsAvalability(false));
    console.log('Spots Fetching ->', error);
  }
  yield put(setSpinnerVisible(false));
}
