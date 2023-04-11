export interface Snapshot {
  user_id: string;
  plant_id: string;
  timestamp: Date;
  health_properties: Map<string, HealthProperty>; //key is the metric
}

export interface HealthProperty {
  level: number;
  unit: string;
  interpretation: Interpretation;
}

export enum Interpretation {
  GOOD = 'GOOD',
  OKAY = 'OKAY',
  CRITICAL = 'CRITICAL',
}
