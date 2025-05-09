import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  selector: 'app-start-entities',
  templateUrl: './start-entities.component.html',
  styleUrls: ['./start-entities.component.scss'],
  imports: [FormsModule, MatIconModule]
})
export class StartEntitiesComponent {
  value = signal(1);

<<<<<<< Updated upstream
  onValueChange(newValue: number) {
    if (newValue > 0) this.value.set(newValue);
=======
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

  // Calcula o total de eventos no dia atual
  get todayCount(): number {
    const today = new Date().getDay() === 0 ? 1 : new Date().getDay();
    const total = this.eventsToday()
      .filter(e => e.dayOfWeek === today)
      .reduce((acc, cur) => acc + cur.count, 0);
    return total;
  }

  blockInvalidKeys(event: KeyboardEvent) {
    const invalidKeys = ['-', '+', 'e', 'E', '.', ',', '0'];
    if (invalidKeys.includes(event.key)) {
      event.preventDefault();
    }
>>>>>>> Stashed changes
  }
}
