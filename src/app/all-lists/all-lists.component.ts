import {Component, OnInit} from '@angular/core';
import {ShoppingListModel} from '../resources/models/shopping-list/shopping-list.model';
import {Observable} from 'rxjs/index';
import {Store} from '@ngrx/store';
import * as storeActions from '../resources/store/store.actions';
import * as storeReducer from '../resources/store/store.reducers';
import {Router} from '@angular/router';
import {IsMobileService} from '../resources/services/is-mobile.service';

@Component({
  selector: 'app-all-lists',
  templateUrl: './all-lists.component.html',
  styleUrls: ['./all-lists.component.scss']
})
export class AllListsComponent implements OnInit {

  mouseIsHoveringCard = null;
  shoppingLists: ShoppingListModel[] = [];
  shoppingListsObservable: Observable<{shoppingLists: ShoppingListModel[]}>;
  mobile = false;


  constructor( private store: Store<storeReducer.StoreState>, private router: Router, private isMobile: IsMobileService) { }

  ngOnInit() {
    // Get Data from Store
    this.shoppingListsObservable = this.store.select('store');
    this.shoppingListsObservable.subscribe(s => {
      this.shoppingLists = s.shoppingLists;

    });

    // Check if Device is Mobile
    if (this.isMobile.isMobile()) {
      this.mobile = true;
    }


  }

  createShoppingList() {
    this.store.dispatch(new storeActions.CreateShoppingList(new ShoppingListModel(this.shoppingLists.length, 'New list', '', [])));
    this.router.navigate(['./list/' + (+this.shoppingLists.length - 1)]);
  }

  removeShoppingList(listId: number) {
    this.store.dispatch(new storeActions.RemoveShoppingList(listId));
  }

  mouseHoveringListCard (index) {
    this.mouseIsHoveringCard = index;
  }
  mouseLeftListCard() {
    this.mouseIsHoveringCard = null;
  }
  onEvent(event) {
    event.stopPropagation();
  }



}
