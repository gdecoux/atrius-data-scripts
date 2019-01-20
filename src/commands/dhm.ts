import { Command, flags } from '@oclif/command';
import { Open } from 'unzipper';
import * as bluebird from 'bluebird';
import {
  FeatureCollection,
  point,
  Feature,
  Point,
  featureCollection,
} from '@turf/helpers';
import { writeFileSync, mkdirSync } from 'fs';

import { DroneHarmonyState, SingleDroneMission, Waypoint } from '../types';
import { toAbsolute } from '../helpers/waypoints';
import tokml from '../helpers/tokml';

export default class Dhm extends Command {
  static description = `\n converts drone harmony file to kml`;

  static flags = {
    help: flags.help({ char: 'h' }),
    format: flags.string({
      required: true,
      default: 'geojson',
      options: ['esri', 'kml', 'geojson'],
      description: 'output format of mission.'
    }),
    split: flags.boolean({
      required: false,
      default: false,
      description: 'whether to split missions into seperate files.'
    }),
    outFile: flags.string({
      required: true,
      default: 'output',
      description: 'output file name.'
    }),
    outDir: flags.string({
      required: true,
      default: 'output',
      description: 'output directory name if combine is set to false.'
    })
  };

  static args = [
    {
      name: 'file',
      required: true
    }
  ];

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
    let homeLocation = dhState.state.transientState.homeLocation;

    const result = new Array<FeatureCollection<Point>>();
    await bluebird.map(missions, async (mission) => {
      const newPoints = await toAbsolute(mission.singleDroneMission.dronePlan.waypoints.list, homeLocation);
      mission.singleDroneMission.dronePlan.waypoints.list = newPoints.waypoints;
      homeLocation = newPoints.homeLocation;
      result.push(this.missionToGeoJSON(mission.singleDroneMission));
    }, { concurrency: 1 });

    if (flags.split) {
      mkdirSync(flags.outDir);
      result.forEach((mission, index) => {
        this.writeMission(mission, flags.format, `${flags.outDir}/${index}.${extensions[flags.format]}`);
      });
    } else {
      const coordinates = [homeLocation.y, homeLocation.x, homeLocation.z];
      const test = point(coordinates);
      result[0].features.push(test);
      this.writeMission(this.combineMissions(result), flags.format, `${flags.outFile}.${extensions[flags.format]}`);
    }

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

  missionToKML(mission: FeatureCollection<Point>): string {
    return tokml(mission);
  }

  missionToGeoJSON(mission: SingleDroneMission): FeatureCollection<Point> {
    const waypoints = this.waypointsToGeoJSON(mission.dronePlan.waypoints.list);
    return featureCollection(waypoints, { id: mission.missionId });
  }

  waypointsToGeoJSON(waypoints: Waypoint[]): Feature<Point>[] {
    return waypoints.map(waypoint => {

      const properties = {
        id: waypoint.id,
        speed: waypoint.speed,
        gimbals: waypoint.gimbals,
        type: waypoint.type
      };

      const coordinates = [waypoint.point.y, waypoint.point.x, waypoint.point.z];

      return point(coordinates);

    });
  }

  combineMissions(missions: FeatureCollection<Point>[]): FeatureCollection<Point> {
    const combinedFeatures = new Array<Feature<Point>>();
    for (const featureCollection of missions) {
      combinedFeatures.push(...featureCollection.features);
    }
    return featureCollection(combinedFeatures);
  }

  writeMission(mission: FeatureCollection<Point>, format: string, outFile: string): void {
    if (format === 'geojson') {
      writeFileSync(outFile, JSON.stringify(mission));
    } else if (format === 'kml') {
      writeFileSync(outFile, this.missionToKML(mission));
    }
  }

}

const extensions = {
  geojson: 'geojson',
  kml: 'kml',
  esri: 'json'
};
