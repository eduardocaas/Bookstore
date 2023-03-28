import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

export interface DialogData {
  titulo: '';
}

@Component({
  selector: 'app-livro-delete-dialog',
  templateUrl: './livro-delete-dialog.component.html',
  styleUrls: ['./livro-delete-dialog.component.css']
})
export class LivroDeleteDialogComponent {

  constructor(private dialogRef: MatDialogRef<LivroDeleteDialogComponent>, @Inject(MAT_DIALOG_DATA) private data: DialogData,
              private route: ActivatedRoute, private router: Router) {}

  delete(bool: boolean): void {
    if(bool == true){
      this.router.navigate(
        [],
        {
          relativeTo: this.route,
          queryParams: {
            param: 'teste',
          },
          queryParamsHandling: 'merge'
        }
      );
    }
    else{
      console.log('teste');
    }
  }

}
