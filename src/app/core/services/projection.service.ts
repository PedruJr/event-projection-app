import { Injectable } from '@angular/core';
import { eventsProjection } from '../../core/mocks/mock-events-projection';
import { Cycle } from '../models/cycle.model';

export type ActivityType = 'follow' | 'qualification';

export interface ProjectedEventGroup {
  dayOfWeek: number;
  activityType: ActivityType;
  count: number;
}

@Injectable({ providedIn: 'root' })
export class ProjectionService {
  getProjectedEvents(cycles: Cycle[], entitiesToStart: number): ProjectedEventGroup[] {
    const days = [1, 2, 3, 4, 5];
    const result: ProjectedEventGroup[] = JSON.parse(JSON.stringify(eventsProjection));

    const ordered = [...cycles].sort((a, b) => {
      const priority = { HIGH: 3, MEDIUM: 2, LOW: 1 };
      return priority[b.priority] - priority[a.priority];
    });

    let remaining = entitiesToStart;
    for (const cycle of ordered) {
      const available = Math.min(remaining, cycle.availableEntities || 0);
      remaining -= available;

      if (available === 0 || !cycle.structure) continue;

      for (const day of days) {
        const dayEvents = this.convertStructureToEvents(cycle.structure[day], day);
        for (const event of dayEvents) {
          const existing = result.find(r => r.dayOfWeek === day && r.activityType === event.activityType);
          if (existing) {
            existing.count += event.count * available;
          } else {
            result.push({
              dayOfWeek: event.dayOfWeek,
              activityType: event.activityType,
              count: event.count * available,
            });
          }
        }
      }

      if (remaining <= 0) break;
    }

    return result;
  }

  private convertStructureToEvents(struct: any, day: number): ProjectedEventGroup[] {
    if (!struct) return [];
    return Object.keys(struct).map((key) => ({
      dayOfWeek: day,
      activityType: key as ActivityType,
      count: struct[key],
    }));
  }
}
