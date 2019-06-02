import {ChangeDetectorRef, Component} from '@angular/core';
import {LifePattern} from './types/life-pattern';
import {ErrorDialogComponent} from './error-dialog/error-dialog.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  uploadPanelExpanded = true;
  lifePatternPanelExpanded = false;

  lifePattern: LifePattern;

  afuConfig = {
    formatsAllowed: '.lif,.life',
    hideProgressBar: true,
    uploadAPI: {
      url: 'http://localhost:8080/api/upload-and-parse'
    }
  };

  constructor(private dialog: MatDialog) {
  }


  onResponse($event: {}) {
    const request = <XMLHttpRequest>$event;
    if (request.status === 200) {
      this.lifePattern = JSON.parse((request).response) as LifePattern;
      this.uploadPanelExpanded = false;
      this.lifePatternPanelExpanded = true;
    } else {
      this.dialog.open(ErrorDialogComponent, {
        width: '1250px',
        data: request.response
      });
    }
  }

  onUploadPanelOpened() {
    this.lifePatternPanelExpanded = false;
    this.lifePattern = null;
  }
}
