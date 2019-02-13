import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';
import { UserService } from "../../services/user.service";

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {
  @Output() closeSidenav = new EventEmitter<void>();

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

  onClose() {
    this.closeSidenav.emit();
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
