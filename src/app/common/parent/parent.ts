import { Component, inject, NgZone } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { DrawerModule } from 'primeng/drawer';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-parent',
  imports: [DrawerModule, RouterLink, RouterLinkActive, RouterOutlet, DrawerModule],
  templateUrl: './parent.html',
  styles: ``,
})
export class Parent {
  isMobile = window.innerWidth < 768
  visible = !this.isMobile


  routes = [
    { icon: 'home', label: 'Home', route: '/' },
    { icon: 'dashboard', label: 'Dashboard', route: '/dashboard' },
    { icon: 'explore', label: 'Browse', route: '/browse' },
    { icon: 'favorite', label: 'Favourite', route: '/favourite' },
    // { icon: 'calculate', label: 'Calculator', route: '/calculator' }
  ]

}
