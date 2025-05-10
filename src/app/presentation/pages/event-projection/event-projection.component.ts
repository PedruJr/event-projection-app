import {
  Component,
  OnInit,
  computed,
  signal
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsChartComponent, ProjectedEventGroup as ChartRow } from '../../components/organisms/events-chart/events-chart.component';
import { StartEntitiesComponent } from '../../components/organisms/start-entities/start-entities.component';
import { CycleSelectorComponent } from '../../components/organisms/cycle-selector/cycle-selector.component';
import { projectedEventsSignal, loadingProjectionSignal } from '../../../core/signals/projection.signal';
import { ProjectionService } from '../../../core/services/projection.service';
import { startEntitiesSignal } from '../../../core/signals/start-entities.signal';
import { cyclesSignal } from '../../../core/signals/cycles.signal';
import { mockCycles } from '../../../core/mocks/mock-cycles';
import { inject } from '@angular/core';
import {App} from '../../../app';

@Component({
  standalone: true,
  selector: 'app-event-projection',
  imports: [CommonModule, EventsChartComponent, StartEntitiesComponent, CycleSelectorComponent],
  templateUrl: './event-projection.component.html',
  styleUrls: ['./event-projection.component.scss']
})
export class EventProjectionComponent implements OnInit {
  chartData = computed(() => {
    const raw = projectedEventsSignal();
    const cycles = cyclesSignal();
    const entities = startEntitiesSignal();

    const grouped: Record<number, ChartRow> = {};

    // Processa o fluxo padrão vindo do projectedEventsSignal()
    for (const item of raw) {
      if (!grouped[item.dayOfWeek]) {
        grouped[item.dayOfWeek] = {
          day: `Dia ${item.dayOfWeek}`,
          encounters: 0,
          messages: 0,
          checkpoints: 0,
          exploration: 0,
        };
      }

      switch (item.activityType) {
        case 'follow':
          grouped[item.dayOfWeek].encounters += item.count;
          break;
        case 'qualification':
          grouped[item.dayOfWeek].messages += item.count;
          break;
        case 'checkpoint':
          grouped[item.dayOfWeek].checkpoints += item.count;
          break;
        case 'exploration':
          grouped[item.dayOfWeek].exploration += item.count;
          break;
      }
    }

    for (const cycle of cycles) {
      const structure = cycle.structure;
      if (!structure) continue;

      for (const [dayStr, eventData] of Object.entries(structure)) {
        const day = parseInt(dayStr, 10);
        if (isNaN(day)) continue;

        if (!grouped[day]) {
          grouped[day] = {
            day: `Dia ${day}`,
            encounters: 0,
            messages: 0,
            checkpoints: 0,
            exploration: 0,
          };
        }

        grouped[day].encounters += (eventData["meetings"] ?? 0) * entities;
        grouped[day].messages += (eventData["emails"] ?? 0) * entities;
        grouped[day].checkpoints += (eventData["calls"] ?? 0) * entities;
        grouped[day].exploration += (eventData["follows"] ?? 0) * entities;
      }
    }

    return Object.values(grouped);
  });

  private lastEntities = startEntitiesSignal();
  private lastCycles = JSON.stringify(cyclesSignal());
  private appComponent = inject(App);

  constructor(private projectionService: ProjectionService) {}

  ngOnInit(): void {
    projectedEventsSignal.set(this.projectionService.getProjectedEvents(mockCycles, 0));

    setInterval(() => {
      const entities = startEntitiesSignal();
      const cycles = cyclesSignal();

      const serialized = JSON.stringify(cycles);

      if (
        entities !== this.lastEntities ||
        serialized !== this.lastCycles
      ) {
        this.lastEntities = entities;
        this.lastCycles = serialized;

        if (!entities || entities <= 0 || cycles.length === 0) return;

        loadingProjectionSignal.set(true);
        const result = this.projectionService.getProjectedEvents(cycles, entities);
        projectedEventsSignal.set(result);
        loadingProjectionSignal.set(false);

      }
    }, 300);
  }


  recalcularProjecao() {
    loadingProjectionSignal.set(true);

    const current = projectedEventsSignal();
    projectedEventsSignal.set([]); // limpa brevemente
    setTimeout(() => {
      projectedEventsSignal.set([...current]);
      loadingProjectionSignal.set(false);
    }, 500);
  }


  navigateToSplash() {
    this.appComponent.showSplash = true;
    setTimeout(() => {
      this.appComponent.showSplash = false;
    }, 3000);
  }
}
