import { Command, flags } from '@oclif/command';
import { Open } from 'unzipper';
import * as bluebird from 'bluebird';
import { FeatureCollection, points, point, Feature, Point, featureCollection } from '@turf/helpers';
import { DroneHarmonyState, SingleDroneMission, Waypoint } from '../types';
import { toAbsolute } from '../helpers/waypoints';
import tokml from '../helpers/tokml';

export default class Dhm extends Command {
  static description = 'converts drone harmony file to kml';

  static flags = {
    help: flags.help({ char: 'h' }),
  };

  static args = [{ name: 'file' }];

  static FILE_NAME = 'data.json';

  async run() {
    const { args, flags } = this.parse(Dhm);

    const fileString = await this.getFileString(args.file);

    if (!fileString) {
      this.error('Invalid dhm file.');
      return;
    }

    const dhState = JSON.parse(fileString) as DroneHarmonyState;

    const missions = dhState.state.missionState.missions;
    const homeLocation = dhState.state.transientState.homeLocation;

    bluebird.map([missions[1]], async (mission, index) => {

      // const newWapoints = await toAbsolute(mission.singleDroneMission.dronePlan.waypoints.list, homeLocation);

      // console.log(this.missionToKML(mission.singleDroneMission));

    }, { concurrency: 1 });

  }

  async getFileString(file: string): Promise<string | undefined> {
    return Open.file(file).then(async (dir) => {
      const file = dir.files.find(file => file.path === Dhm.FILE_NAME);

      if (!file) { return; }

      return file.buffer().then(value => {
        return value.toString();
      });

    });
  }

  missionToKML(mission: SingleDroneMission) {
    const waypoints = this.waypointsToGeoJSON(mission.dronePlan.waypoints.list);
    const geojson = featureCollection(waypoints, { id: mission.missionId });
    return tokml(geojson, {
      documentName: mission.missionName,
      name: mission.missionName
    });
  }

  waypointsToGeoJSON(waypoints: Waypoint[]): Feature<Point>[] {
    return waypoints.map(waypoint => {

      const properties = {
        id: waypoint.id,
        speed: waypoint.speed,
        gimbals: waypoint.gimbals,
        type: waypoint.type
      }

      const coordinates = [waypoint.point.y, waypoint.point.x, waypoint.point.z]

      return point(coordinates, properties, { id: waypoint.id });

    });
  }

}
