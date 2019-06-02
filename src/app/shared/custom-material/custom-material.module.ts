import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule, MatCardModule, MatDialogModule, MatExpansionModule, MatGridListModule, MatToolbarModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatGridListModule,
    MatExpansionModule,
    MatDialogModule
  ],
  exports: [
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatGridListModule,
    MatExpansionModule,
    MatDialogModule
  ],
  declarations: []
})
export class CustomMaterialModule {
}
