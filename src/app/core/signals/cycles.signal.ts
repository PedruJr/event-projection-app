import { signal, computed } from '@angular/core';
import { Cycle } from '../models/cycle.model';
import { mockCycles } from '../mocks/mock-cycles';

export const allCyclesSignal = signal<Cycle[]>(mockCycles);
export const cyclesSignal = signal<Cycle[]>([]);

export const orderedCyclesByPriority = computed(() => {
  const priorityMap = { HIGH: 3, MEDIUM: 2, LOW: 1 };
  return [...allCyclesSignal()].sort(
    (a, b) => priorityMap[b.priority] - priorityMap[a.priority]
  );
});

export function setCycles(cycles: Cycle[]) {
  allCyclesSignal.set(cycles);
  const preselected = cycles.filter(c => c.priority === 'HIGH');
  cyclesSignal.set(preselected);
}
