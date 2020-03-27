import { Component, OnInit } from '@angular/core';

import { UsersFacade } from './+state/users.facade';

@Component({
  selector: 'navigate-data-persistence-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'navigate-data-persistence';

  constructor(private usersFacade: UsersFacade) {}

  ngOnInit() {
    this.usersFacade.getUsers();
  }
}
