export interface Cycle {
  name: string;
  availableEntities: number;
  selected?: boolean;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  selectedEntities?: number;
  todayEvents?: number;
  structure: {
    day: number;
    meetings: number;
    emails: number;
    calls: number;
    follows: number;
  }[];
}
