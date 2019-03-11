import {Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {SearchResultsModel} from '../resources/models/search-results/search-result.model';
import {ShoppingListItem, ShoppingListModel} from '../resources/models/shopping-list/shopping-list.model';
import {ActivatedRoute, Router} from '@angular/router';
import * as storeActions from '../resources/store/store.actions';
import * as storeReducer from '../resources/store/store.reducers';
import {Observable, Subscription} from 'rxjs/index';
import {Store} from '@ngrx/store';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {IsMobileService} from '../resources/services/is-mobile.service';

export interface DialogData {
  url: string;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  animations: [
    trigger('rotatedState', [
      state('default', style({ transform: 'rotate(0)' })),
      state('rotated', style({ transform: 'rotate(-45deg)' })),
      transition('rotated => default', animate('400ms ease-out')),
      transition('default => rotated', animate('400ms ease-in'))
    ]),

    trigger('slideInOut', [
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
export class ListComponent implements OnInit, OnDestroy {

  private sub: Subscription;
  currentListId: number;

  shoppingList: ShoppingListModel;
  searchResult: SearchResultsModel;
  shoppingListObservable: Observable<{shoppingLists: ShoppingListModel[], searchResults: SearchResultsModel}>;

  @ViewChild('SearchInput') searchInput: ElementRef;
  @ViewChild('ListNameField') listNameInput: ElementRef;
  @ViewChild('ListDescriptionField') listDescriptionInput: ElementRef;
  @ViewChild('ItemsCard') itemsCard: ElementRef;


  searchItemOpen = false;

  iconRotationState = 'default';
  mouseIsHoveringCard = null;
  mouseIsHoveringCardImage = null;
  mouseIsHoveringSearchCard = null;
  changingListName = false;
  firstNameChange = true;
  itemsPrice = 0;

  openedCard: number;
  openedCardSearch: number;
  helpMenuOpen: string;
  helpMenuOpenSearch: string;
  mobile = false;

  constructor (private route: ActivatedRoute, private store: Store<storeReducer.StoreState>, public dialog: MatDialog, private isMobile: IsMobileService) { }

  ngOnInit() {
    this.helpMenuOpen = 'out';
    this.helpMenuOpenSearch = 'out';

    this.clearSearchResults();

    this.sub = this.route.params.subscribe(params => {
        this.currentListId = +params['list'];
        this.shoppingListObservable = this.store.select('store');
        this.shoppingListObservable.subscribe(s => {
          this.searchResult = s.searchResults;
          s.shoppingLists.forEach(eachObj => {
            if (eachObj.listId === this.currentListId) {
              this.shoppingList = eachObj;
            }
          });


          //////// focus on list name after create
            if (+this.shoppingList.listId === (+s.shoppingLists.length - 1) && this.shoppingList.shoppingListName === 'New list' && this.firstNameChange) {
              this.firstNameChange = false;
              this.changingListName = true;
              setTimeout(() => {
                if (this.listNameInput) {
                  this.listNameInput.nativeElement.select();
                  this.listNameInput.nativeElement.focus();
                }
              }, 300);
            }

          //////// Calculate Summary Price
          this.itemsPrice = 0;
          this.shoppingList.shoppingListItems.forEach(eachObj => {
            const objPrice = +eachObj.item.price.value * +eachObj.itemCount;
            this.itemsPrice = this.itemsPrice + objPrice;
          });
          this.itemsPrice = +this.itemsPrice.toFixed(2);
          ///////

        });

    });


    // Check if Device is Mobile
    if (this.isMobile.isMobile()) {
      this.mobile = true;
    }



  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }


  // Using Store
  updateProductList() {
    this.store.dispatch(new storeActions.RenameShoppingList({
      listId: this.shoppingList.listId,
      listName: this.listNameInput.nativeElement.value,
      listDescription: this.listDescriptionInput.nativeElement.value}));
    this.changingListName = false;
  }

  cancelListNameChanging() {
    this.changingListName = false;
    this.listNameInput.nativeElement.value = this.shoppingList.shoppingListName;
    this.listDescriptionInput.nativeElement.value = this.shoppingList.shoppingListDescription;
  }

  removeItemFromList (code: string) {
    this.store.dispatch(new storeActions.RemoveItemFromShoppingList({itemCode: code, listId: this.shoppingList.listId}));
  }

  // action 1 - means decrease. action = 2 means increase.
  ChangeItemCount (code: string, changeBy: number) {
    this.store.dispatch(new storeActions.ChangeItemCountInShoppingList({itemCode: code, listId: this.shoppingList.listId, changeBy: changeBy}));
  }

  CheckListItem(code: string) {
    this.store.dispatch(new storeActions.CheckItemInShoppingList({itemCode: code, listId: this.shoppingList.listId}));
  }

  SearchItems(query) {
    this.store.dispatch(new storeActions.FetchSearchResults({query: query, sortBy: 'relevance', currentPage: '1', pageSize: '10', isFirstFetch: true}));
  }

  addItemToList(code: string) {
    const productToAdd = this.searchResult.products.find(obj => obj.code === code);

    // const productToAdd = this.searchResult.products.findIndex(f => f.code = code);
    this.store.dispatch(new storeActions.AddItemToShoppingList({item: new ShoppingListItem(false, 1, productToAdd), listId: this.shoppingList.listId}));
  }


  // Item Already Added
  itemAdded (code: string) {
    if (this.shoppingList.shoppingListItems.find(obj => obj.item.code === code)) {
      return true;
    }
  }
  itemAddedCount (code: string) {
    const count = this.shoppingList.shoppingListItems.find(obj => obj.item.code === code).itemCount;
    return count;
  }



  // Methods For HTML Manipulations
  onKey(event: any) {
    this.SearchItems(event.target.value);
  }


  toggleHelpMenu(i: number): void {
    if (this.openedCard === i) {
      this.helpMenuOpen = this.helpMenuOpen === 'out' ? 'in' : 'out';
    } else {
      this.openedCard = i;
      this.helpMenuOpen = 'in'; // this.helpMenuOpen === 'out' ? 'in' : 'out';
    }
  }
  toggleHelpMenuSearch(i: number): void {
    if (this.openedCardSearch === i) {
      this.helpMenuOpenSearch = this.helpMenuOpenSearch === 'out' ? 'in' : 'out';
    } else {
      this.openedCardSearch = i;
      this.helpMenuOpenSearch = 'in';
    }
  }

  mouseHoveringCard (index) {
    this.mouseIsHoveringCard = index;
  }
  mouseLeftCard() {
    this.mouseIsHoveringCard = null;
  }
  mouseHoveringSearchCard (index) {
    this.mouseIsHoveringSearchCard = index;
  }
  mouseLeftSearchCard() {
    this.mouseIsHoveringSearchCard = null;
  }
  mouseHoveringCardImage (index) {
    this.mouseIsHoveringCardImage = index;
  }
  mouseLeftCardImage() {
    this.mouseIsHoveringCardImage = null;
  }
  openMiniSearch() {
    this.iconRotationState = (this.iconRotationState === 'default' ? 'rotated' : 'default');
    if (this.searchItemOpen) {
      this.clearSearchResults();
    }
    this.searchItemOpen = !this.searchItemOpen;
    this.searchInput.nativeElement.value = null;

      setTimeout(() => {
        this.searchInput.nativeElement.focus();
      }, 300);

  }

  clearSearchResults() {
    this.store.dispatch(new storeActions.ClearSearchResults());
  }

  turnListNameChangingOn () {
   this.changingListName = true;
   setTimeout(() => {
      this.listNameInput.nativeElement.focus();
    }, 300);

  }

  openDialog(url: string): void {
    const dialogRef = this.dialog.open(ImageDialog, {
      width: 'auto',
      data: {imageUrl: url}
    });

    dialogRef.afterClosed().subscribe(result => {});
  }

}


@Component({
  selector: 'dialog-overview-example-dialog',
  template: '<img [src] = "dataD[\'imageUrl\']"/>',
})
export class ImageDialog {

  constructor(
    public dialogRef: MatDialogRef<ImageDialog>,
    @Inject(MAT_DIALOG_DATA) public dataD: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
