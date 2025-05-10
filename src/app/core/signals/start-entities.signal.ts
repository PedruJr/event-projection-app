import { signal } from '@angular/core';

export const startEntitiesSignal = signal<number>(1);

export const startEntities = signal<number>(1);

export const setStartEntities = (value: number) => {
  const safe = Math.max(1, value);
  startEntities.set(safe);
};

export const incrementStartEntities = () => {
  setStartEntities(startEntities() + 1);
};

export const decrementStartEntities = () => {
  setStartEntities(startEntities() - 1);
};
