import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import * as storeActions from '../resources/store/store.actions';
import * as storeReducer from '../resources/store/store.reducers';
import {IsMobileService} from '../resources/services/is-mobile.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  mobile = false;

  constructor(private store: Store<storeReducer.StoreState>, private isMobile: IsMobileService) { }

  ngOnInit() {
    if (this.isMobile.isMobile()) {
      this.mobile = true;
    }
  }

  clearSearchResults() {
    this.store.dispatch(new storeActions.ClearSearchResults());
  }
}
