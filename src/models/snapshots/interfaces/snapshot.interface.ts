export interface Snapshot {
  user_id: string;
  plant_id: string;
  timestamp: Date;
  health_properties: HealthProperty[];
}

export interface HealthProperty {
  metric: string;
  level: number;
  unit: string;
  interpretation: Interpretation;
}

enum Interpretation {
  GOOD,
  OKAY,
  CRITICAL,
}
