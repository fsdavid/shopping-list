

import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Store} from '@ngrx/store';
import * as storeReducer from '../store/store.reducers';
import {ShoppingListModel} from '../models/shopping-list/shopping-list.model';
import {Observable} from 'rxjs/index';


@Injectable()
export class ListExistionGuard implements CanActivate {

  shoppingListsObservable: Observable<{shoppingLists: ShoppingListModel[]}>;
  listExists = false;

  constructor (private router: Router, private store: Store<storeReducer.StoreState>) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)  {
    this.shoppingListsObservable = this.store.select('store');
    this.shoppingListsObservable.subscribe(s => {
      s.shoppingLists.forEach(eachObj => {
        if (eachObj.listId === +route.params['list']) {
          this.listExists = true;
          return true;
        }
      });
      if (this.listExists === false) {
        this.router.navigate(['']);
      }
    });

    return true;

  }

}
