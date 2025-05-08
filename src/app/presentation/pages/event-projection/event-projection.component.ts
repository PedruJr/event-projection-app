import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsChartComponent, ProjectedEventGroup } from '../../components/organisms/events-chart/events-chart.component';
import {StartEntitiesComponent} from '../../components/organisms/start-entities/start-entities.component';
import {CycleSelectorComponent} from '../../components/organisms/cycle-selector/cycle-selector.component';

@Component({
  standalone: true,
  selector: 'app-event-projection',
  imports: [CommonModule, EventsChartComponent, StartEntitiesComponent, CycleSelectorComponent],
  templateUrl: './event-projection.component.html',
  styleUrls: ['./event-projection.component.scss']
})
export class EventProjectionComponent {
  // Mock data simulado
  readonly chartData = signal<ProjectedEventGroup[]>([
    { day: 'Hoje', encounters: 10, messages: 40, checkpoints: 50, exploration: 20 },
    { day: 'Qui', encounters: 5, messages: 20, checkpoints: 40, exploration: 15 },
    { day: 'Sex', encounters: 8, messages: 15, checkpoints: 30, exploration: 25 },
    { day: 'Seg', encounters: 0, messages: 0, checkpoints: 0, exploration: 0 },
    { day: 'Ter', encounters: 0, messages: 0, checkpoints: 0, exploration: 0 }
  ]);
}
