import { Component, OnInit, signal } from '@angular/core';
import { cyclesSignal, orderedCyclesByPriority } from '../../../../core/signals/cycles.signal';
import { Cycle } from '../../../../core/models/cycle.model';
import { MatIcon } from '@angular/material/icon';
import { NgClass, NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-cycle-selector',
  templateUrl: './cycle-selector.component.html',
  styleUrls: ['./cycle-selector.component.scss'],
  imports: [MatIcon, NgClass, NgIf, NgForOf]
})
export class CycleSelectorComponent implements OnInit {
  allCycles: Cycle[] = [];
  mockedDisabledCycles = [
    { name: 'Duvidas LGPD', availableEntities: 0 },
    { name: 'Ciclo Inbound', availableEntities: 0 },
    { name: 'Ciclo Salesforce', availableEntities: 0 },
    { name: 'Indústria Outbound', availableEntities: 0 },
    { name: 'Ciclo automático', availableEntities: 0 },
    { name: 'Midsize', availableEntities: 0 }
  ];

  // Controla se a lista está expandida ou não
  expanded = signal(true);
  disabledSectionExpanded = signal(false);

  ngOnInit(): void {
    // Carrega os ciclos ordenados por prioridade
    const cycles = orderedCyclesByPriority();

    // Atualiza os ciclos visíveis no seletor
    this.allCycles = cycles;

    // Envia os ciclos inicialmente selecionados para o signal global
    cyclesSignal.set(cycles.filter(c => c.selected));
  }

  // Alterna entre expandido/recolhido
  toggleExpand() {
    this.expanded.set(!this.expanded());
  }

  // Alterna a seleção de um ciclo específico
  toggleCycle(cycleName: string) {
    this.allCycles = this.allCycles.map(c => {
      if (c.name === cycleName && c.availableEntities > 0) {
        return { ...c, selected: !c.selected };
      }
      return c;
    });

    // Atualiza os ciclos selecionados no signal global
    const selected = this.allCycles.filter(c => c.selected);
    cyclesSignal.set(selected);
  }

  // Retorna ciclos com entidades disponíveis
  activeCycles(): Cycle[] {
    return this.allCycles.filter(c => c.availableEntities > 0);
  }

  // Retorna ciclos sem entidades disponíveis
  disabledCycles(): Cycle[] {
    return this.allCycles.filter(c => c.availableEntities === 0);
  }

  // Otimiza o ngFor com base no nome do ciclo
  trackByName(index: number, item: Cycle): string {
    return item.name;
  }

  // Define o ícone com base na prioridade do ciclo
  getPriorityIcon(priority: string, available: number): string {
    if (available === 0) return 'arrow_downward';
    if (priority === 'HIGH') return 'arrow_upward';
    if (priority === 'MEDIUM') return 'arrow_upward';
    return 'arrow_downward';
  }

  // Define a cor do ícone com base na prioridade e disponibilidade
  getIconColor(priority: string, available: number): string {
    if (available === 0) return 'text-muted';
    if (priority === 'HIGH') return 'priority-high';
    if (priority === 'MEDIUM') return 'priority-medium';
    return 'priority-low';
  }

  // Formata o nome do ciclo (primeira letra maiúscula)
  formatName(name: string): string {
    return name.charAt(0).toUpperCase() + name.slice(1);
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
