import {
  MatBadgeModule,
  MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule, MatDialogModule, MatIconModule,
  MatInputModule, MatMenuModule, MatSelectModule,
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
    MatBadgeModule,
    MatSelectModule,
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
    MatBadgeModule,
    MatSelectModule
  ],
})
export class AngularMaterialImportModule { }
