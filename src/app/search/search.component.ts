import {AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import * as storeActions from '../resources/store/store.actions';
import * as storeReducer from '../resources/store/store.reducers';
import {SearchResultsModel} from '../resources/models/search-results/search-result.model';
import {Observable} from 'rxjs/index';
import {Store} from '@ngrx/store';
import {MatDialog} from '@angular/material';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {ImageDialog} from '../list/list.component';
import {ShoppingListItem, ShoppingListModel} from '../resources/models/shopping-list/shopping-list.model';
import {IsMobileService} from '../resources/services/is-mobile.service';

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
export class SearchComponent implements OnInit, AfterViewInit {

  focused = true;
  searchResult: SearchResultsModel;
  shoppingLists: ShoppingListModel[];
  shoppingListObservable: Observable<{shoppingLists: ShoppingListModel[], searchResults: SearchResultsModel}>;

  mouseIsHoveringSearchCard = null;
  openedCardSearch: number;
  helpMenuOpenSearch: string;
  firstOpen: boolean;
  spinnerVisible = false;
  selectedSearchBy = 'relevance';
  mobile = false;

  @ViewChild('SearchField') searchInput: ElementRef;



  constructor(private store: Store<storeReducer.StoreState>, public dialog: MatDialog, private isMobile: IsMobileService) { }

  ngOnInit() {
    this.firstOpen = true;

    // Check if Device is Mobile
    if (this.isMobile.isMobile()) {
      this.mobile = true;
    }
    if (!this.mobile) {
      this.searchInput.nativeElement.focus();
    }
    this.shoppingListObservable = this.store.select('store');
    this.shoppingListObservable.subscribe(s => {
      this.searchResult = s.searchResults;
      this.shoppingLists = s.shoppingLists;

      if (this.firstOpen) {
        this.firstOpen = false;
        if (s.searchResults.products.length) {
          this.focused = true;
          this.searchInput.nativeElement.value = s.searchResults.freeTextSearch;
          this.selectedSearchBy = s.searchResults.pagination.sort;
        }
      }

    });
    this.helpMenuOpenSearch = 'out';
  }
  ngAfterViewInit() {
    if (this.mobile) {
      this.searchInput.nativeElement.focus();
    }
  }

  // Searching items
  onKey(event: any) {
    this.SearchItems(event.target.value);
  }
  SearchItems(query: string, sortBy: string = 'relevance', currentPage: string = '1', pageSize: string = '10') {
    this.showSpinner();
    this.store.dispatch(new storeActions.FetchSearchResults({query: query, sortBy: this.selectedSearchBy, currentPage: currentPage, pageSize: pageSize, isFirstFetch: true}));
  }
  SearchMoreItems() {
    const currentSort = this.searchResult.sorts.find(f => f.selected === true);
    this.store.dispatch(new storeActions.FetchSearchResults({query: this.searchResult.freeTextSearch, sortBy: currentSort.code, currentPage: (+this.searchResult.pagination.currentPage + 1).toString(), pageSize: '20', isFirstFetch: false}));
  }

  clearSearchResults() {
    this.searchInput.nativeElement.value = '';
    this.store.dispatch(new storeActions.ClearSearchResults());
  }

  addItemToList(code: string, listId: number) {
    setTimeout(() => {
      const productToAdd = this.searchResult.products.find(obj => obj.code === code);
      this.store.dispatch(new storeActions.AddItemToShoppingList({item: new ShoppingListItem(false, 1, productToAdd), listId: listId}));
    }, 300);

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

  // Other methods for html
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
      this.clearSearchResults();
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

  // Load more list items automaticall on scroll
  @HostListener("window:scroll", [])
  onScroll(): void {
    if (this.bottomReached()) {
      this.SearchMoreItems();
    }
  }

  bottomReached(): boolean {
    this.showSpinner();
    return (window.innerHeight + window.scrollY) >= document.body.offsetHeight;
  }

  sortByChanged(event) {
    this.SearchItems(this.searchResult.freeTextSearch, event);
  }

  showSpinner() {
    this.spinnerVisible = true;

    setTimeout(() => {
      this.spinnerVisible = false;
    }, 3000);
  }

}
