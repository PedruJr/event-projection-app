import { Component } from '@angular/core';
import { startEntitiesSignal } from '../../../../core/signals/start-entities.signal';
import { projectedEventsSignal } from '../../../../core/signals/projection.signal';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import {cyclesSignal} from '../../../../core/signals/cycles.signal';

@Component({
  selector: 'app-start-entities',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule],
  templateUrl: './start-entities.component.html',
  styleUrls: ['./start-entities.component.scss']
})
export class StartEntitiesComponent {
  value = startEntitiesSignal;
  eventsToday = projectedEventsSignal;

  onValueChange(value: string) {
    const num = parseInt(value, 10);
    if (!isNaN(num) && num > 0) {
      startEntitiesSignal.set(num);
    }
  }

  get todayCount(): number {
    const today = new Date().getDay() === 0 ? 1 : new Date().getDay();
    return this.eventsToday().filter(e => e.dayOfWeek === today).reduce((acc, cur) => acc + cur.count, 0);
  }


}
