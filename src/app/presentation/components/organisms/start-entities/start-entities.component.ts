import { Component } from '@angular/core';
import { startEntitiesSignal } from '../../../../core/signals/start-entities.signal';
import { projectedEventsSignal } from '../../../../core/signals/projection.signal';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import type { ProjectedEventGroup } from '../../../../core/services/projection.service';

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
    if (!isNaN(num) && num >= 1) {
      startEntitiesSignal.set(num);
    } else {
      startEntitiesSignal.set(1);
    }
  }

  // Soma total de eventos do dia atual
  get todayCount(): number {
    const today = new Date().getDay() === 0 ? 1 : new Date().getDay();
    const total = this.eventsToday()
      .filter((e: ProjectedEventGroup) => e.dayOfWeek === today)
      .reduce((acc: number, cur: ProjectedEventGroup) => acc + cur.count, 0);
    return total;
  }

  // Bloqueia caracteres inválidos no input
  blockInvalidKeys(event: KeyboardEvent) {
    const invalidKeys = ['-', '+', 'e', 'E', '.', ',', '0'];
    if (invalidKeys.includes(event.key)) {
      event.preventDefault();
    }
  }
}
