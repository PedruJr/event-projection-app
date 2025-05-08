import { Component, signal } from '@angular/core';
import { NgIf } from '@angular/common';
import { CycleListComponent } from '../../organisms/cycle-list/cycle-list.component';
import {MatIcon} from '@angular/material/icon';

@Component({
  standalone: true,
  selector: 'app-cycle-selector',
  templateUrl: './cycle-selector.component.html',
  styleUrls: ['./cycle-selector.component.scss'],
  imports: [NgIf, CycleListComponent, MatIcon]
})
export class CycleSelectorComponent {
  expanded = signal(false);
  toggle = () => this.expanded.update(prev => !prev);
}
