import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface DialogData {
  titulo: '';
}

@Component({
  selector: 'app-categoria-delete-dialog',
  templateUrl: './categoria-delete-dialog.component.html',
  styleUrls: ['./categoria-delete-dialog.component.css']
})
export class CategoriaDeleteDialogComponent {

  constructor(public dialogRef: MatDialogRef<CategoriaDeleteDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

}
