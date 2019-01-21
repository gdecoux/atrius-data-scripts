import { createClient, LatLng, LatLngLiteral, ElevationResult } from '@google/maps';

const GOOGLE_API_KEY = 'AIzaSyDbjNSwLjxvNTTibselEaEWFCnQ7kgwShM';
const mapClient = createClient({
  key: GOOGLE_API_KEY,
  Promise: Promise
});

export async function getElevation(location: LatLng | LatLngLiteral): Promise<ElevationResult> {
  let result: ElevationResult;

  await mapClient.elevation({
    locations: [location]
  })
    .asPromise()
    .then(response => {
      result = response.json.results[0];
    });

  return result!;
}
