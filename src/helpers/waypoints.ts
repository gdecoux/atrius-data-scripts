import { Waypoint, Point } from '../types';
import * as maps from '@google/maps';

const GOOGLE_API_KEY = 'AIzaSyDbjNSwLjxvNTTibselEaEWFCnQ7kgwShM';

interface ToAbsoluteResult {
  waypoints: Waypoint[];
  homeLocation: Point;
}

export async function toAbsolute(waypoints: Waypoint[], homeLocation: Point): Promise<ToAbsoluteResult> {
  const points = waypoints.map(waypoint => waypoint.point);

  const homeElevationResult = await getElevation([homeLocation]);
  const homeElevation = homeElevationResult[0].elevation;

  const newWaypoints = waypoints.map(waypoint => ({
    ...waypoint,
    point: {
      ...waypoint.point,
      z: homeElevation + waypoint.point.z
    }
  }));

  return {
    waypoints: newWaypoints,
    homeLocation: {
      ...homeLocation,
      z: homeElevation
    }
  };

}

interface GetElevationResult {
  point: Point;
  elevation: number;
  location: maps.ElevationResult;
}

let mapClient: maps.GoogleMapsClient;
export async function getElevation(points: Point[]): Promise<GetElevationResult[]> {
  console.log(mapClient);
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
