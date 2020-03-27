import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import {
  DefaultRouterStateSerializer,
  NavigationActionTiming,
  RouterState,
  StoreRouterConnectingModule
} from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NxModule } from '@nrwl/angular';

import { environment } from '../environments/environment';
import { UsersEffects } from './+state/users.effects';
import { UsersFacade } from './+state/users.facade';
import * as fromUsers from './+state/users.reducer';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { reducer } from './+state/users.reducer';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    NxModule.forRoot(),
    StoreModule.forRoot(
      { users: reducer },
      {
        metaReducers: !environment.production ? [] : [],
        runtimeChecks: {
          strictActionImmutability: false,
          strictStateImmutability: false
        }
      }
    ),
    EffectsModule.forRoot([]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreRouterConnectingModule.forRoot({
      navigationActionTiming: NavigationActionTiming.PostActivation,
      serializer: DefaultRouterStateSerializer,
      routerState: RouterState.Full
    }),
    EffectsModule.forRoot([UsersEffects])
  ],
  providers: [UsersFacade],
  bootstrap: [AppComponent]
})
export class AppModule {}
