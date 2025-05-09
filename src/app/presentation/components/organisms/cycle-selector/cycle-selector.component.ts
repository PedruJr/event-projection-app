import { Component, OnInit, signal } from '@angular/core';
import { cyclesSignal, orderedCyclesByPriority } from '../../../../core/signals/cycles.signal';
import { Cycle } from '../../../../core/models/cycle.model';
import { MatIcon } from '@angular/material/icon';
import { NgClass, NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-cycle-selector',
  templateUrl: './cycle-selector.component.html',
  styleUrls: ['./cycle-selector.component.scss'],
  imports: [
    MatIcon,
    NgClass,
    NgIf,
    NgForOf
  ]
})
export class CycleSelectorComponent implements OnInit {
  allCycles: Cycle[] = [];
  expanded = signal(true);

  ngOnInit(): void {
    const cycles = orderedCyclesByPriority();
    this.allCycles = cycles;
    cyclesSignal.set(cycles.filter(c => c.selected));
    console.log('[CycleSelector] Ciclos carregados:', cycles);
  }

  toggleExpand() {
    this.expanded.set(!this.expanded());
  }

  toggleCycle(cycleName: string) {
    this.allCycles = this.allCycles.map(c => {
      if (c.name === cycleName && c.availableEntities > 0) {
        return { ...c, selected: !c.selected };
      }
      return c;
    });
    const selected = this.allCycles.filter(c => c.selected);

    cyclesSignal.set(selected);
    console.log('[CycleSelector] Ciclos atualizados:', selected);
  }

  activeCycles(): Cycle[] {
    return this.allCycles.filter(c => c.availableEntities > 0);
  }

  disabledCycles(): Cycle[] {
    return this.allCycles.filter(c => c.availableEntities === 0);
  }

  trackByName(index: number, item: Cycle): string {
    return item.name;
  }

  getPriorityIcon(priority: string, available: number): string {
    if (available === 0) return 'arrow_downward';
    if (priority === 'HIGH') return 'arrow_upward';
    if (priority === 'MEDIUM') return 'arrow_forward';
    return 'arrow_downward';
  }

  getIconColor(priority: string, available: number): string {
    if (available === 0) return 'text-muted';
    if (priority === 'HIGH') return 'priority-high';
    if (priority === 'MEDIUM') return 'priority-medium';
    return 'priority-low';
  }

  formatName(name: string): string {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }
}
