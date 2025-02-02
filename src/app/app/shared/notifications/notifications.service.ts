import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
durationInSeconds = 5;
  constructor(
 @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object,
private _snackBar: MatSnackBar
) { }

  showAlert(message: string='', action: string='') {
    if (isPlatformBrowser(this.platformId)) {
    this._snackBar.open(message, 'close', {
      duration: this.durationInSeconds * 1000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: 'notification-dialog'
    });
      }
      }
}
