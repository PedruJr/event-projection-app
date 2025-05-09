import { Injectable } from '@angular/core';
import { eventsProjection } from '../../core/mocks/mock-events-projection';
import { Cycle } from '../models/cycle.model';

export type ActivityType = 'follow' | 'qualification' | 'checkpoint' | 'exploration';

export interface ProjectedEventGroup {
  dayOfWeek: number;
  activityType: ActivityType;
  count: number;
}

@Injectable({ providedIn: 'root' })
export class ProjectionService {
  convertEventsProjectionToProjected(): ProjectedEventGroup[] {
    return eventsProjection.flatMap(dayEntry => {
      const map: Record<string, ActivityType> = {
        meetings: 'follow',
        emails: 'qualification',
        calls: 'checkpoint',
        follows: 'exploration'
      };

      return Object.entries(dayEntry.events).map(([key, value]) => ({
        dayOfWeek: dayEntry.day,
        activityType: map[key],
        count: value
      }));
    });
  }

  getProjectedEvents(cycles: Cycle[], entitiesToStart: number): ProjectedEventGroup[] {
    const today = this.getTodayAsWeekday();
    const days = this.getNextFiveWeekdays(today);
    const result: ProjectedEventGroup[] = this.convertEventsProjectionToProjected();

    const ordered = [...cycles].sort((a, b) => {
      const priority = { HIGH: 3, MEDIUM: 2, LOW: 1 };
      return priority[b.priority] - priority[a.priority];
    });

    let remaining = entitiesToStart;

    for (const cycle of ordered) {
      const canUse = Math.min(remaining, cycle.availableEntities ?? 0);
      remaining -= canUse;
      if (!canUse || !cycle.structure) continue;

      for (const day of days) {
        const baseEvents = cycle.structure[day] || {};
        for (const type in baseEvents) {
          const activityType = type as ActivityType;
          const quantity = (baseEvents as any)[type] * canUse;
          const existing = result.find(r => r.dayOfWeek === day && r.activityType === activityType);
          if (existing) {
            existing.count += quantity;
          } else {
            result.push({ dayOfWeek: day, activityType, count: quantity });
          }
        }
      }

      if (remaining <= 0) break;
    }

    return result;
  }

  private getTodayAsWeekday(): number {
    const d = new Date().getDay();
    return d === 0 ? 1 : (d > 5 ? 1 : d);
  }

  private getNextFiveWeekdays(start: number): number[] {
    const weekdays: number[] = [];
    let day = start;
    while (weekdays.length < 5) {
      if (day >= 6) day = 1;
      weekdays.push(day);
      day++;
    }
    return weekdays;
  }
}
