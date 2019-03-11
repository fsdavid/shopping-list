import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ShoppingListItem, ShoppingListModel} from '../resources/models/shopping-list/shopping-list.model';
import {Observable} from 'rxjs/index';
import {Store} from '@ngrx/store';
import * as storeActions from '../resources/store/store.actions';
import * as storeReducer from '../resources/store/store.reducers';
import {Product} from '../resources/models/products/product.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-all-lists',
  templateUrl: './all-lists.component.html',
  styleUrls: ['./all-lists.component.scss']
})
export class AllListsComponent implements OnInit {

  mouseIsHoveringCard = null;
  // @ViewChild('ListCard') listCard: ElementRef;


  shoppingLists: ShoppingListModel[] = [];
  shoppingListsObservable: Observable<{shoppingLists: ShoppingListModel[]}>;


  constructor( private store: Store<storeReducer.StoreState>, private router: Router) { }

  ngOnInit() {
    this.shoppingListsObservable = this.store.select('store');
    this.shoppingListsObservable.subscribe(s => {
      this.shoppingLists = s.shoppingLists;

    });
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
