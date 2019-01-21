import { Mission } from '../types';
import { DroneHarmonyState } from '../types/droneharmony';

import {
  toGeoJSON,
  toFeature
} from './drone-harmony';

import {
  FeatureCollection,
  Feature,
  Point,
  featureCollection,
  point
} from '@turf/helpers';


export function combineMissions(missions: Mission[]): Mission {
  const combinedFeatures = new Array<Feature<Point>>();
  for (const featureCollection of missions) {
    combinedFeatures.push(...featureCollection.features);
  }
  return featureCollection(combinedFeatures);
}

export function toAbsolute(mission: Mission, takeoffElevation: number): Mission {
  const features = mission.features.map(feature => {
    const coords = feature.geometry!.coordinates;
    return point([coords[0], coords[1], (takeoffElevation + coords[2])], feature.properties);
  });
  return featureCollection(features);
}

export function toKML(misison: Mission) { }

export function toEsri(misison: Mission) { }

export function fromDroneHarmoney({ state }: DroneHarmonyState): { missions: Mission[], homeLocation: Feature<Point> } {
  const missions = state.missionState.missions.map(mission => toGeoJSON(mission.singleDroneMission));
  const homeLocation = toFeature(state.transientState.homeLocation, {}, 'homeLocation');
  return { missions, homeLocation };
}
