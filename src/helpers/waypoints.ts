import { Waypoint, Point } from '../types';
import * as maps from '@google/maps';

const GOOGLE_API_KEY = 'AIzaSyDbjNSwLjxvNTTibselEaEWFCnQ7kgwShM';

interface ToAbsoluteResult {
  waypints: Waypoint[];
  homeLocation: Point;
}

export async function toAbsolute(waypoints: Waypoint[], homeLocation: Point): Promise<any> {
  const points = waypoints.map(waypoint => waypoint.point);

  return getElevation([homeLocation, ...points]).then(locations => {



  });

}

interface GetElevationResult {
  point: Point;
  elevation: number;
  location: maps.ElevationResult;
}

let mapClient: maps.GoogleMapsClient;
export async function getElevation(points: Point[]): Promise<GetElevationResult[]> {
  mapClient = mapClient || maps.createClient({
    key: GOOGLE_API_KEY,
    Promise: Promise
  });

  const query = points.map(({ x, y }) => ({ lat: x, lng: y }));
  const result = new Array<GetElevationResult>();

  await mapClient.elevation({
    locations: query
  }).asPromise()
    .then(response => {

      result.push(...response.json.results.map((location, index) => ({
        point: points[index],
        elevation: location.elevation,
        location
      })));

    })
    .catch(error => console.error(error));

  return result;

}
