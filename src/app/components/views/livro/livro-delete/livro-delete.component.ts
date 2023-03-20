import { Component } from '@angular/core';
import { Livro } from 'src/app/models/livro';

@Component({
  selector: 'app-livro-delete',
  templateUrl: './livro-delete.component.html',
  styleUrls: ['./livro-delete.component.css']
})
export class LivroDeleteComponent {

  livro: Livro = {
    id: '',
    titulo: '',
    nome_autor: '',
    texto: ''
  }
}
