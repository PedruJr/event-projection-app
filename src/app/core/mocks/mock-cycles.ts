import { Cycle } from '../models/cycle.model';

export const mockCycles: Cycle[] = [
  {
    name: 'Prospeccao outbound',
    availableEntities: 1,
    selected: true,
    priority: 'HIGH',
    selectedEntities: 1,
    todayEvents: 4,
    structure: []
  },
  {
    name: 'Credenciamento',
    availableEntities: 1,
    selected: true,
    priority: 'HIGH',
    selectedEntities: 3,
    todayEvents: 12,
    structure: []
  },
  {
    name: 'Outbound geral',
    availableEntities: 195,
    selected: true,
    priority: 'MEDIUM',
    selectedEntities: 6,
    todayEvents: 18,
    structure: []
  },
  {
    name: 'Ciclo de teste de exclusao',
    availableEntities: 2,
    selected: false,
    priority: 'LOW',
    selectedEntities: 0,
    todayEvents: 0,
    structure: []
  }
];
