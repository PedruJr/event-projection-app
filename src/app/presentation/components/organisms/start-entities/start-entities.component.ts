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

  onValueChange(newValue: number) {
    if (newValue > 0) this.value.set(newValue);
  }
}
