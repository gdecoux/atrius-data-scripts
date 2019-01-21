import { SingleDroneMission, Point as DHMPoint } from '../types/droneharmony';
import { featureCollection, point, Feature, Point, Properties } from '@turf/helpers';

export function toGeoJSON(mission: SingleDroneMission) {
  const features = mission.dronePlan.waypoints.list.map(waypoint => {

    const properties = {
      id: waypoint.id,
      speed: waypoint.speed,
      gimbals: waypoint.gimbals,
      type: waypoint.type,
      yaw: waypoint.yaw,
      yawList: waypoint.yawList
    };

    const coordinates = [waypoint.point.y, waypoint.point.x, waypoint.point.z];

    return point(coordinates, properties);
  });
  return featureCollection(features, { id: mission.missionName });
}

export function toFeature(dhmPoint: DHMPoint, properties: Properties = {}, id?: string): Feature<Point> {
  return point([dhmPoint.y, dhmPoint.x, dhmPoint.z], properties, { id: id });
}
