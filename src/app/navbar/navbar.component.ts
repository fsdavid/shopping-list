import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import * as storeActions from '../resources/store/store.actions';
import * as storeReducer from '../resources/store/store.reducers';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private store: Store<storeReducer.StoreState>) { }

  ngOnInit() {
  }

  clearSearchResults() {
    this.store.dispatch(new storeActions.ClearSearchResults());
  }
}
