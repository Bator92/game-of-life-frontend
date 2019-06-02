import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AngularFileUploaderModule} from 'angular-file-uploader';
import {LifePatternGridComponent} from './life-pattern-grid/life-pattern-grid.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CustomMaterialModule} from './shared/custom-material/custom-material.module';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LifePatternGridComponent,
    ErrorDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFileUploaderModule,
    CustomMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    ErrorDialogComponent
  ]
})
export class AppModule {
}
