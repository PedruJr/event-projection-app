import { Component } from '@angular/core';

@Component({
  selector: 'app-splash-screen',
  template: `
    <div class="splash-wrapper">
      <img src="/assets/meetTimeSplash.png" alt="Splash"/>
    </div>`,
  styleUrls: ['./splash-screen.component.scss'],
  standalone: true
})
export class SplashScreenComponent {}
