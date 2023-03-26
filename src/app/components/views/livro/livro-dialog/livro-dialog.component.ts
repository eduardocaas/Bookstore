import {Component, Inject} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface Livro {
  titulo: '',
  nome_autor: '',
  texto: ''
}

@Component({
  selector: 'app-livro-dialog',
  templateUrl: './livro-dialog.component.html',
  styleUrls: ['./livro-dialog.component.css']
})
export class LivroDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Livro) {}

}
