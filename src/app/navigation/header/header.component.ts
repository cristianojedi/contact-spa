import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';
import { UserService } from "../../services/user.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter<void>();

  isAuth = false;
  authSubscription: Subscription;

  public name: string = "";
  public email: string = "";

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.authSubscription = this.userService.authChange.subscribe(authStatus => {
      this.isAuth = authStatus;
    });
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  onLogout() {
    localStorage.removeItem('user.email');
    localStorage.removeItem('user.name');

    this.userService.logout();
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }
}
