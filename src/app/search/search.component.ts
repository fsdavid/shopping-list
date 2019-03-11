import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as storeActions from '../resources/store/store.actions';
import * as storeReducer from '../resources/store/store.reducers';
import {SearchResultsModel} from '../resources/models/search-results/search-result.model';
import {Observable} from 'rxjs/index';
import {Store} from '@ngrx/store';
import {MatDialog} from '@angular/material';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {ImageDialog} from '../list/list.component';
import {ShoppingListItem, ShoppingListModel} from '../resources/models/shopping-list/shopping-list.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  animations: [
    trigger('slideInOutSearch', [
      state('in', style({

      })),
      state('out', style({
        opacity: '0',
        overflow: 'hidden',
        height: '0px',
        width: '0px'
      })),
      transition('in <=> out', animate('400ms ease-in-out')),
    ]),
  ]
})
export class SearchComponent implements OnInit {

  focused = false;
  searchResult: SearchResultsModel;
  shoppingLists: ShoppingListModel[];
  shoppingListObservable: Observable<{shoppingLists: ShoppingListModel[], searchResults: SearchResultsModel}>;

  mouseIsHoveringSearchCard = null;
  openedCardSearch: number;
  helpMenuOpenSearch: string;
  firstOpen: boolean;

  @ViewChild('SearchField') searchInput: ElementRef;



  constructor(private store: Store<storeReducer.StoreState>, public dialog: MatDialog, ) { }

  ngOnInit() {
    this.firstOpen = true;
    this.shoppingListObservable = this.store.select('store');
    this.shoppingListObservable.subscribe(s => {
      this.searchResult = s.searchResults;
      this.shoppingLists = s.shoppingLists;

      if (this.firstOpen) {
        this.firstOpen = false;
        if (s.searchResults.products.length) {
          this.focused = true;
          this.searchInput.nativeElement.value = s.searchResults.freeTextSearch;
        }
      }

    });
    this.helpMenuOpenSearch = 'out';
  }

  // Searching items
  onKey(event: any) {
    this.SearchItems(event.target.value);
  }
  SearchItems(query: string, sortBy: string = 'relevance', currentPage: string = '1', pageSize: string = '10') {
    this.store.dispatch(new storeActions.FetchSearchResults({query: query, sortBy: sortBy, currentPage: currentPage, pageSize: pageSize}));
  }
  clearSearchResults() {
    this.store.dispatch(new storeActions.ClearSearchResults());
  }

  addItemToList(code: string, listId: number) {
    const productToAdd = this.searchResult.products.find(obj => obj.code === code);
    this.store.dispatch(new storeActions.AddItemToShoppingList({item: new ShoppingListItem(false, 1, productToAdd), listId: listId}));
  }

  // Item Already Added
  itemAdded (code: string, listId: number) {
    if (this.shoppingLists[listId].shoppingListItems.find(obj => obj.item.code === code)) {
      return true;
    }
  }
  itemAddedCount (code: string, listId: string) {
    const count = this.shoppingLists[listId].shoppingListItems.find(obj => obj.item.code === code).itemCount;
    return count;
  }

  toggleHelpMenuSearch(i: number): void {
    if (this.openedCardSearch === i) {
      this.helpMenuOpenSearch = this.helpMenuOpenSearch === 'out' ? 'in' : 'out';
    } else {
      this.openedCardSearch = i;
      this.helpMenuOpenSearch = 'in';
    }
  }
  mouseHoveringSearchCard (index) {
    this.mouseIsHoveringSearchCard = index;
  }
  mouseLeftSearchCard() {
    this.mouseIsHoveringSearchCard = null;
  }

  focusToInput(from: string) {
    if (from === 'fromInput' && !this.focused) {
      this.focused = true;
    } else if (from === 'fromIcon') {
      this.focused = false;
    }
  }
  openDialog(url: string): void {
    const dialogRef = this.dialog.open(ImageDialog, {
      width: 'auto',
      data: {imageUrl: url}
    });

    dialogRef.afterClosed().subscribe(result => {});
  }

}
