import { Component, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsChartComponent, ProjectedEventGroup as ChartRow } from '../../components/organisms/events-chart/events-chart.component';
import { StartEntitiesComponent } from '../../components/organisms/start-entities/start-entities.component';
import { CycleSelectorComponent } from '../../components/organisms/cycle-selector/cycle-selector.component';
import { loadingProjectionSignal, projectedEventsSignal } from '../../../core/signals/projection.signal';
import { ProjectionService } from '../../../core/services/projection.service';
import { startEntitiesSignal } from '../../../core/signals/start-entities.signal';
import { cyclesSignal } from '../../../core/signals/cycles.signal';
import { mockCycles } from '../../../core/mocks/mock-cycles';

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

  private clickedOnce = false;

  constructor(private projectionService: ProjectionService) {}

  ngOnInit(): void {
    console.log('[Init] Carregando dados iniciais convertidos...');
    const initialProjection = this.projectionService.getProjectedEvents(mockCycles, 0);
    projectedEventsSignal.set(initialProjection);
  }

  recalcularProjecao() {
    if (!this.clickedOnce) {
      this.clickedOnce = true;
      console.log('[Recalcular] Ignorando primeiro clique automático');
      return;
    }

    const entities = startEntitiesSignal();
    const cycles = cyclesSignal();

    console.log('[Recalcular] Entidades:', entities);
    console.log('[Recalcular] Ciclos selecionados:', cycles);

    if (!entities || entities <= 0 || cycles.length === 0) {
      console.warn('[Recalcular] Dados insuficientes');
      return;
    }

    loadingProjectionSignal.set(true);
    const result = this.projectionService.getProjectedEvents(cycles, entities);
    projectedEventsSignal.set(result);
    loadingProjectionSignal.set(false);

    console.log('[Recalcular] Projeção concluída com:', result);
  }

  carregarMockInicial() {
    console.log('[BOTÃO] Carregando projeção inicial convertida do mock...');
    const result = this.projectionService.getProjectedEvents(mockCycles, 0);
    projectedEventsSignal.set(result);
  }
}
