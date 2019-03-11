import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {ListComponent} from './list/list.component';
import {SearchComponent} from './search/search.component';
import {AllListsComponent} from './all-lists/all-lists.component';
import {ListExistionGuard} from './resources/guards/list-existion.guard';

const pagesRoutes: Routes = [
  { path: '', component: AllListsComponent, pathMatch: 'full'},
  { path: 'search', component: SearchComponent},
  { path: 'list/:list', component: ListComponent, canActivate: [ListExistionGuard]},
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [
    RouterModule.forRoot(pagesRoutes, {preloadingStrategy: PreloadAllModules}),
  ],
  exports: [
    RouterModule
  ],
  providers: [
    ListExistionGuard
  ]
})
export class AppRoutingModule {}
