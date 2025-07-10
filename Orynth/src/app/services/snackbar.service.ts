import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class SnackbarService {
  private ref?: MatSnackBarRef<SimpleSnackBar>;

  constructor(private snackBar: MatSnackBar) {}

  show(message: string) {
    if (this.ref) {
      this.ref.dismiss();
    }
    this.ref = this.snackBar.open(message, 'Close', { duration: 3000 });
  }
}
