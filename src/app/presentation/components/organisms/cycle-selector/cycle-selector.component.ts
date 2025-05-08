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
export class CycleSelectorComponent {
  cycles = computed(() => cyclesSignal());
  activeCycles = computed(() => this.cycles().filter(c => c.availableEntities > 0));
  disabledCycles = computed(() => this.cycles().filter(c => c.availableEntities === 0));

  expanded = signal(true);

  toggleExpand() {
    this.expanded.update(prev => !prev);
  }

  toggleCycle(cycleName: string) {
    toggleCycleSelection(cycleName);
  }

  trackByName(index: number, item: Cycle) {
    return item.name;
  }

  getPriorityIcon(priority: string, entities: number): string {
    return entities === 0 ? 'arrow_downward' : 'arrow_upward';
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
}
