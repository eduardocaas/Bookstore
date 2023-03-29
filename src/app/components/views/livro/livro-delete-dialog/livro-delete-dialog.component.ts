import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
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

  // delete(bool: boolean): void { Injeção de paramêtros na URL
  //   if(bool == true){
  //     this.router.navigate(
  //       [],
  //       {
  //         relativeTo: this.route,
  //         queryParams: {
  //           delete: 'true',
  //         },
  //         queryParamsHandling: 'merge'
  //       }
  //     );
  //   }
  //   else{
  //     this.router.navigate(
  //       [],
  //       {
  //         relativeTo: this.route,
  //         queryParams: {
  //           delete: 'false',
  //         },
  //         queryParamsHandling: 'merge'
  //       }
  //     );
  //   }
  // }

}
