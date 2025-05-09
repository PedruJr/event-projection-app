import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { cyclesSignal, toggleCycleSelection } from '../../../../core/signals/cycles.signal';
import { Cycle } from '../../../../core/models/cycle.model';

@Component({
  standalone: true,
  selector: 'app-cycle-selector',
  templateUrl: './cycle-selector.component.html',
  styleUrls: ['./cycle-selector.component.scss'],
  imports: [CommonModule, MatCheckboxModule, MatIconModule]
})
<<<<<<< Updated upstream
export class CycleSelectorComponent {
  cycles = computed(() => cyclesSignal());
  activeCycles = computed(() => this.cycles().filter(c => c.availableEntities > 0));
  disabledCycles = computed(() => this.cycles().filter(c => c.availableEntities === 0));
=======
export class CycleSelectorComponent implements OnInit {
  // Armazena todos os ciclos disponíveis
  allCycles: Cycle[] = [];
  mockedDisabledCycles = [
    { name: 'Duvidas LGPD', availableEntities: 0 },
    { name: 'Ciclo Inbound', availableEntities: 0 },
    { name: 'Ciclo Salesforce', availableEntities: 0 },
    { name: 'Indústria Outbound', availableEntities: 0 },
    { name: 'Ciclo automático', availableEntities: 0 },
    { name: 'Midsize', availableEntities: 0 }
  ];

>>>>>>> Stashed changes

  expanded = signal(true);
  disabledSectionExpanded = signal(true);

  toggleExpand() {
    this.expanded.update(prev => !prev);
  }

  toggleCycle(cycleName: string) {
    toggleCycleSelection(cycleName);
  }

  trackByName(index: number, item: Cycle) {
    return item.name;
  }

<<<<<<< Updated upstream
  getPriorityIcon(priority: string, entities: number): string {
    return entities === 0 ? 'arrow_downward' : 'arrow_upward';
=======
  // Define o ícone com base na prioridade do ciclo
  getPriorityIcon(priority: string, available: number): string {
    if (available === 0) return 'arrow_downward';
    if (priority === 'HIGH') return 'arrow_upward';
    if (priority === 'MEDIUM') return 'arrow_upward';
    return 'arrow_downward';
>>>>>>> Stashed changes
  }

  getIconColor(priority: string, entities: number): string {
    if (entities === 0) return 'blue-twitter';
    if (priority === 'HIGH') return 'high';
    if (priority === 'MEDIUM') return 'medium';
    return 'low';
  }

  formatName(name: string): string {
    return name
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  toggleDisabledSection() {
    this.disabledSectionExpanded.set(!this.disabledSectionExpanded());
  }


  // Define a cor da seta com base no índice
  getMockedPriorityColor(index: number): string {
    return index <= 1 ? 'priority-high' : 'priority-medium';
  }

  // Define o ícone da seta com base no índice
  getMockedPriorityIcon(index: number): string {
    return 'arrow_upward';
  }
}
