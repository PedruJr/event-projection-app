import { Component } from '@angular/core';
import { startEntitiesSignal } from '../../../../core/signals/start-entities.signal';
import { projectedEventsSignal } from '../../../../core/signals/projection.signal';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-start-entities',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule],
  templateUrl: './start-entities.component.html',
  styleUrls: ['./start-entities.component.scss']
})
export class StartEntitiesComponent {
  // Referência ao signal reativo de entidades
  value = startEntitiesSignal;

  // Acesso direto à projeção atual de eventos
  eventsToday = projectedEventsSignal;

  // Atualiza o número de entidades ao mudar input
  onValueChange(value: string) {
    const num = parseInt(value, 10);
    if (!isNaN(num) && num > 0) {
      startEntitiesSignal.set(num);
    }
  }

  // Calcula o total de eventos no dia atual
  get todayCount(): number {
    const today = new Date().getDay() === 0 ? 1 : new Date().getDay();
    return this.eventsToday()
      .filter(e => e.dayOfWeek === today)
      .reduce((acc, cur) => acc + cur.count, 0);
  }
}
