import { Component, Input } from '@angular/core';
import { NgIf, NgClass } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import {Cycle} from '../../../../core/models/cycle.model';

@Component({
  standalone: true,
  selector: 'app-cycle-card',
  templateUrl: './cycle-card.component.html',
  styleUrls: ['./cycle-card.component.scss'],
  imports: [NgClass, MatIconModule]
})
export class CycleCardComponent {
  @Input() cycle!: Cycle;
  @Input() disabled = false;
}
