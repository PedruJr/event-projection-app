import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {EventProjectionComponent} from './presentation/pages/event-projection/event-projection.component';
import {setCycles} from './core/signals/cycles.signal';
import {mockCycles} from './core/mocks/mock-cycles';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, EventProjectionComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  ngOnInit(): void {
    setCycles(mockCycles);
  }
  title = 'event-projection-app';
}
