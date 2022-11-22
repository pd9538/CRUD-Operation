import { FilterPipe } from './showapidata/filter.pipe';
import { SharedModule } from './shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';

import * as fromApp from './store/app.reducer';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './core.module';
import { StoreModule } from '@ngrx/store';
import { AuthEffects } from './auth/store/auth.effects';
import { ShowapidataComponent } from './showapidata/showapidata.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ShowapidataComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    StoreModule.forRoot(fromApp.appReducers),
    EffectsModule.forRoot([AuthEffects]),
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    CoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
