import {
  MatBadgeModule,
  MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule, MatDialogModule, MatIconModule,
  MatInputModule, MatMenuModule,
  MatToolbarModule
} from '@angular/material';
import {NgModule} from '@angular/core';

@NgModule({
  imports: [
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatButtonToggleModule,
    MatDialogModule,
    MatMenuModule,
    MatBadgeModule
  ],

  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatButtonToggleModule,
    MatDialogModule,
    MatMenuModule,
    MatBadgeModule
  ],
})
export class AngularMaterialImportModule { }
