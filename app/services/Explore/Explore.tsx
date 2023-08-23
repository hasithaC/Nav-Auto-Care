import {callService} from '../indes';

export function fetchSpotsNearBy(URL: string) {
  return callService(URL);
}
