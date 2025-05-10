import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {EventProjectionComponent} from './presentation/pages/event-projection/event-projection.component';
import {setCycles} from './core/signals/cycles.signal';
import {mockCycles} from './core/mocks/mock-cycles';
import {SplashScreenComponent} from './presentation/pages/splash-screen/splash-screen.component';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-root',

  imports: [ EventProjectionComponent, SplashScreenComponent, NgIf],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  showSplash = true;

  ngOnInit(): void {
    setCycles(mockCycles);
    setTimeout(() => {
      this.showSplash = false;
    }, 2000);
  }
  title = 'event-projection-app';
}
