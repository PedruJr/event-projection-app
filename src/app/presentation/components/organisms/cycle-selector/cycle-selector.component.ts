import { Component, OnInit, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { cyclesSignal, orderedCyclesByPriority } from '../../../../core/signals/cycles.signal';
import { projectedEventsSignal } from '../../../../core/signals/projection.signal';
import { Cycle } from '../../../../core/models/cycle.model';

interface UICycle extends Cycle {
  selected: boolean;
  selectedEntities: number;
  todayEvents: number;
}

@Component({
  selector: 'app-cycle-selector',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './cycle-selector.component.html',
  styleUrls: ['./cycle-selector.component.scss']
})
export class CycleSelectorComponent implements OnInit {
  private expandedSignal = signal(false);
  expanded = computed(() => this.expandedSignal());

  allCycles: UICycle[] = [];

  ngOnInit(): void {
    const selected = cyclesSignal();
    const projection = projectedEventsSignal();
    const today = new Date().getDay() === 0 ? 1 : new Date().getDay();

    this.allCycles = orderedCyclesByPriority().map(cycle => {
      const isSelected = selected.some(s => s.name === cycle.name);
      const todayEvents = projection
          .filter(e => e.dayOfWeek === today)
          .filter(e => e.activityType === 'follow' || e.activityType === 'qualification')
          .reduce((acc, cur) => acc + cur.count, 0);

      return {
        ...cycle,
        selected: isSelected,
        selectedEntities: isSelected ? 1 : 0,
        todayEvents: isSelected ? todayEvents : 0
      };
    });
  }

  toggleExpand() {
    this.expandedSignal.set(!this.expandedSignal());
  }

  toggleCycle(name: string) {
    const current = cyclesSignal();
    const found = current.find(c => c.name === name);
    if (found) {
      cyclesSignal.set(current.filter(c => c.name !== name));
    } else {
      const all = orderedCyclesByPriority();
      const toAdd = all.find(c => c.name === name);
      if (toAdd) cyclesSignal.set([...current, toAdd]);
    }
  }

  activeCycles(): UICycle[] {
    return this.allCycles.filter(c => c.availableEntities && c.availableEntities > 0);
  }

  disabledCycles(): UICycle[] {
    return this.allCycles.filter(c => !c.availableEntities || c.availableEntities <= 0);
  }

  formatName(name: string): string {
    return name.replace(/_/g, ' ');
  }

  getIconColor(priority: string, available: number = 0): string {
    if (available <= 0) return 'gray-icon';
    if (priority === 'HIGH') return 'green-icon';
    if (priority === 'MEDIUM') return 'orange-icon';
    return 'default-icon';
  }

  getPriorityIcon(priority: string, available: number = 0): string {
    if (available <= 0) return 'block';
    if (priority === 'HIGH') return 'flash_on';
    if (priority === 'MEDIUM') return 'bolt';
    return 'schedule';
  }

  trackByName(_: number, item: Cycle) {
    return item.name;
  }
}
