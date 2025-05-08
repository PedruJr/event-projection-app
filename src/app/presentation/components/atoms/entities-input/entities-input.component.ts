import { Component, signal, Input, Output, EventEmitter, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-entities-input',
  imports: [CommonModule, MatFormFieldModule, MatInputModule, FormsModule],
  templateUrl: './entities-input.component.html',
  styleUrls: ['./entities-input.component.scss']
})
export class EntitiesInputComponent {
  private model = signal(1);

  @Output() valueChanged = new EventEmitter<number>();

  readonly minValue = 1;

  constructor() {
    effect(() => {
      const value = this.model();
      if (value >= this.minValue) {
        this.valueChanged.emit(value);
      }
    });
  }

  updateValue(value: string) {
    const numeric = Number(value);
    if (!isNaN(numeric) && numeric >= this.minValue) {
      this.model.set(numeric);
    }
  }

  get currentValue(): number {
    return this.model();
  }

  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.updateValue(value);
  }

  protected readonly HTMLInputElement = HTMLInputElement;
}
