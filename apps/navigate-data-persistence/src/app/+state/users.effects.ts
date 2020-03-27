import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Actions, createEffect } from '@ngrx/effects';
import { DataPersistence, navigation } from '@nrwl/angular';
import { tap, map } from 'rxjs/operators';

import { AppComponent } from '../app.component';
import * as UsersActions from './users.actions';
import * as fromUsers from './users.reducer';
import { UsersEntity } from './users.models';

@Injectable()
export class UsersEffects {
  navigateToEmployeesGrid$ = createEffect(
    () =>
      this.actions$.pipe(
        navigation(AppComponent, {
          run: (r: ActivatedRouteSnapshot, state) => {
            console.log('ActivatedRouteSnapshot', r);
            console.log('state', state);
          }
        })
      ),
    {
      dispatch: false
    }
  );

  loadEmployees$ = createEffect(() =>
    this.dataPersistence.fetch(UsersActions.loadUsers, {
      run: (
        action: ReturnType<typeof UsersActions.loadUsers>,
        state: fromUsers.UsersPartialState
      ) =>
        this.http
          .get<UsersEntity[]>('https://jsonplaceholder.typicode.com/users')
          .pipe(
            tap(res => {
              console.log('----');
              console.log('users', res);
              console.log('action', action);
              console.log('state', state);
              console.log('----');
            }),
            map(users => UsersActions.loadUsersSuccess({ users }))
          ),

      onError: (action: ReturnType<typeof UsersActions.loadUsers>, error) => {
        return UsersActions.loadUsersFailure({
          error
        });
      }
    })
  );

  constructor(
    private actions$: Actions,
    private dataPersistence: DataPersistence<fromUsers.UsersPartialState>,
    private http: HttpClient
  ) {}
}
