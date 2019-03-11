import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import { AppComponent } from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {AngularMaterialImportModule} from './resources/shared-modules/angular-material-import.module';
import { SearchComponent } from './search/search.component';
import {ImageDialog, ListComponent} from './list/list.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AllListsComponent } from './all-lists/all-lists.component';
import {StoreRouterConnectingModule} from '@ngrx/router-store';
import {storeReducer} from './resources/store/store.reducers';
import {StoreEffects} from './resources/store/store.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {environment} from '../environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    ListComponent,
    NavbarComponent,
    AllListsComponent,
    ImageDialog
  ],
  entryComponents: [
    ImageDialog
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    // Module to perform routing
    AppRoutingModule,
    // Module to import Angular material component modules
    AngularMaterialImportModule,
    // Import NGRX state management modules
    StoreModule.forRoot({store: storeReducer}),
    EffectsModule.forRoot([StoreEffects]),
    StoreRouterConnectingModule,
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
