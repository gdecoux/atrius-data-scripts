export interface DroneHarmonyState {
  date: number;
  id: number;
  name: string;
  rid: string;
  sid: number;
  state: State;
  version: string;
}

export interface State {
  areaState: AreaState;
  missionState: MissionState;
  transientState: TransientState;
}

export interface TransientState {
  homeLocation: Point;
}

export interface MissionState {
  missions: Mission[];
}

export interface AreaState {
  lines: any[];
  polygonComposites: any[];
  polygons: Building[];
}

export interface Mission {
  singleDroneMission: SingleDroneMission;
}

export interface SingleDroneMission {
  dronePlan: DronePlan;
  areaGroup: AreaGroup;
  cameraProfile: string;
  catalogId: string;
  droneProfile: string;
  guid: string;
  missionId: number;
  missionName: string;
  missionTypeId: number;
  noProjections: boolean;
  nominalAltMeters: number;
  requiresCalibration: boolean;
}

export interface DronePlan {
  id: number;
  missionId: number;
  waypoints: {
    list: Waypoint[]
  };
}

export interface Waypoint {
  gimbals: Gimbals;
  id: number;
  point: Point;
  speed: number;
  type: number;
  yaw: Yaw;
  yawList: YawList;
}

export interface Yaw {
  angle: number;
}

export interface YawList {
  yaws: Yaw[];
}

export interface Orientation {
  pitchDegrees: number;
}

export interface Gimbals {
  orientations: Orientation[];
}

export interface AreaGroup {
  polygons: Building[];
}

export interface Building {
  heightMeters: number;
  isCircle: boolean;
  isRectangle: boolean;
  polygon: Polygon;
  rectLengthMeters: number;
  rectSideGoesRight: boolean;
  rectWidthMeters: number;
  startMeters: number;
  areaColorId: number;
  guid: string;
  id: number;
  name: string;
}

export interface Point {
  tp: number;
  x: number;
  y: number;
  z: number;
}

export interface Polygon {
  points: Point[];
}
