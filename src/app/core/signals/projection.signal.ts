import { signal } from '@angular/core';
import { ProjectedEventGroup } from '../services/projection.service';

export const projectedEventsSignal = signal<ProjectedEventGroup[]>([]);
export const loadingProjectionSignal = signal(false);
