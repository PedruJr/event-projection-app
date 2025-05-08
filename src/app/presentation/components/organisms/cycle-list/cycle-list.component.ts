import { Component, computed } from '@angular/core';
import { NgClass, NgIf, NgFor } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { cyclesSignal, toggleCycleSelection } from '../../../../core/signals/cycles.signal';
import { Cycle } from '../../../../core/models/cycle.model';

@Component({
  standalone: true,
  selector: 'app-cycle-list',
  templateUrl: './cycle-list.component.html',
  styleUrls: ['./cycle-list.component.scss'],
  imports: [NgIf, NgFor, NgClass, MatIconModule, MatCheckboxModule]
})
export class CycleListComponent {
  cycles = computed(() => cyclesSignal());
  activeCycles = computed(() => this.cycles().filter(c => c.availableEntities > 0));
  disabledCycles = computed(() => this.cycles().filter(c => c.availableEntities === 0));

  toggle(name: string) {
    toggleCycleSelection(name);
  }

  getPriorityIcon(priority: string): string {
    switch (priority) {
      case 'HIGH': return 'arrow_upward';
      case 'MEDIUM': return 'arrow_upward';
      case 'LOW': return 'arrow_upward';
      default: return 'arrow_downward';
    }
  }

  trackByName(index: number, item: Cycle) {
    return item.name;
  }
}
