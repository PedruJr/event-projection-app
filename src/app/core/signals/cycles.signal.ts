import { computed, signal } from '@angular/core';
import { Cycle } from '../models/cycle.model';

const initialCycles: Cycle[] = [];

export const cyclesSignal = signal<Cycle[]>(initialCycles);

export const cycles = computed(() => cyclesSignal());

export const setCycles = (cycles: Cycle[]) => {
  cyclesSignal.set(cycles);
};

export const toggleCycleSelection = (name: string) => {
  const updated = cyclesSignal().map(c =>
    c.name === name ? { ...c, selected: !c.selected } : c
  );
  cyclesSignal.set(updated);
};
