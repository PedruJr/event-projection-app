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
import { Cycle } from '../../../core/models/cycle.model';

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
    const grouped: Record<number, ChartRow> = {};

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

    return Object.values(grouped);
  });

  private lastEntities = startEntitiesSignal();
  private lastCycles = JSON.stringify(cyclesSignal());

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

  carregarMockInicial() {
    const result = this.projectionService.getProjectedEvents(mockCycles, 0);
    projectedEventsSignal.set(result);
  }

  recalcularProjecao() {
    const entities = startEntitiesSignal();
    const cycles = cyclesSignal();

    if (!entities || entities <= 0 || cycles.length === 0) {
      console.warn('[Recalcular] Dados insuficientes');
      return;
    }

    loadingProjectionSignal.set(true);
    const result = this.projectionService.getProjectedEvents(cycles, entities);
    projectedEventsSignal.set(result);
    loadingProjectionSignal.set(false);
  }
}
