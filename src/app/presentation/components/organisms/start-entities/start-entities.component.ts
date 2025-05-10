import { Component } from '@angular/core';
import { startEntitiesSignal } from '../../../../core/signals/start-entities.signal';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { StartEntitiesService } from '../../../../core/services/start-entities.service';
import { blockInvalidKeys as blockInvalidKeysUtil } from '../../../../core/utils/input-validators';
import { ErrorService } from '../../../../core/services/error.service'; // 👈 Importado

@Component({
  selector: 'app-start-entities',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule],
  templateUrl: './start-entities.component.html',
  styleUrls: ['./start-entities.component.scss']
})
export class StartEntitiesComponent {
  value = startEntitiesSignal;

  onValueChange(value: string) {
    try {
      const num = parseInt(value, 10);
      startEntitiesSignal.set(!isNaN(num) && num >= 1 ? num : 1);
    } catch (error) {
      ErrorService.logError(error, 'StartEntitiesComponent - onValueChange');
    }
  }

  get todayCount(): number {
    try {
      return StartEntitiesService.getTodayCount();
    } catch (error) {
      ErrorService.logError(error, 'StartEntitiesComponent - todayCount');
      return 0;
    }
  }

  blockInvalidKeys(event: KeyboardEvent) {
    try {
      blockInvalidKeysUtil(event);
    } catch (error) {
      ErrorService.logError(error, 'StartEntitiesComponent - blockInvalidKeys');
    }
  }
}
