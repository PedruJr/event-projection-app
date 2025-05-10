export interface Cycle {
  name: string;
  availableEntities: number;
  selected: boolean;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  selectedEntities: number;
  todayEvents: number;
  structure?: Record<number, Record<string, number>>;
}
