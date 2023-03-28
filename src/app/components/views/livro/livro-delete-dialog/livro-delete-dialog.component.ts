import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface DialogData {
  titulo: '';
}

@Component({
  selector: 'app-livro-delete-dialog',
  templateUrl: './livro-delete-dialog.component.html',
  styleUrls: ['./livro-delete-dialog.component.css']
})
export class LivroDeleteDialogComponent {

  constructor(public dialogRef: MatDialogRef<LivroDeleteDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  delete(bool: boolean): void {
    if(bool == true){
      //tentar injetar parametro na url 
    }
    else{
      console.log('teste');
      
    }
  }

}
