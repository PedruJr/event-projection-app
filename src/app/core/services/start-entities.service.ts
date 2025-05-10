import { projectedEventsSignal } from '../../core/signals/projection.signal';
import type { ProjectedEventGroup } from '../../core/services/projection.service';

export class StartEntitiesService {
  static getTodayCount(): number {
    const today = new Date().getDay() === 0 ? 1 : new Date().getDay();
    const total = projectedEventsSignal()
      .filter((e: ProjectedEventGroup) => e.dayOfWeek === today)
      .reduce((acc: number, cur: ProjectedEventGroup) => acc + cur.count, 0);
    return total;
  }
}
