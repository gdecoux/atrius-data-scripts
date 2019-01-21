import { Command, flags } from '@oclif/command';
import { Open } from 'unzipper';
import { Feature, Point } from '@turf/helpers';
import { mkdirSync, existsSync, writeFileSync } from 'fs';
import { fromDroneHarmoney, combineMissions } from '../helpers/mission';
import { getElevation } from '../helpers/elevation';
import { Mission } from '../types';

export default class Dhm extends Command {
  static description = `\n converts drone harmony file to kml`;

  static flags = {
    help: flags.help({ char: 'h' }),
    split: flags.boolean({
      description: 'whether to split missions into seperate files.'
    }),
    format: flags.string({
      required: true,
      char: 'f',
      default: 'geojson',
      options: ['esri', 'kml', 'geojson'],
      description: 'output format of mission.'
    }),
    outFile: flags.string({
      required: true,
      char: 'o',
      default: 'output',
      description: 'output file or directory name.'
    })
  };

  static args = [
    { name: 'file', required: true }
  ];

  static FILE_NAME = 'data.json';

  async run() {
    const { args, flags } = this.parse(Dhm);

    const fileString = await this.getFileString(args.file);

    if (!fileString) {
      this.error('Invalid dhm file.');
      return;
    }

    const { missions, homeLocation } = fromDroneHarmoney(JSON.parse(fileString));
    const elevation = await this.getElevation(homeLocation);

    if (flags.split) {
      if (!existsSync(flags.outFile)) { mkdirSync(flags.outFile); } // create directory for multiple outputs
      missions.forEach((mission, index) => {
        mission.features.push(homeLocation);
        this.saveMission(mission, flags.format, `${flags.outFile}/${(mission as any).id}`);
      });
    } else {
      const mission = combineMissions(missions);
      mission.features.push(homeLocation);
      this.saveMission(combineMissions(missions), flags.format, flags.outFile);
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

  async getElevation(feature: Feature<Point>): Promise<number> {
    const coords = feature.geometry!.coordinates;
    const query = { lng: coords[0], lat: coords[1] };
    return getElevation(query)
      .then(res => res.elevation);
  }

  saveMission(mission: Mission, format: string, outFile: string) {
    if (format === 'geojson') {
      writeFileSync(`${outFile}${extensions[format]}`, JSON.stringify(mission));
    }
  }

}

const extensions: { [format: string]: string } = {
  geojson: 'geojson',
  esri: 'json',
  kml: 'kml'
};
