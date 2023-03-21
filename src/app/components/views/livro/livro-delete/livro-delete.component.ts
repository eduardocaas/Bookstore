import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Livro } from 'src/app/models/livro';
import { LivroService } from 'src/app/services/livro.service';

@Component({
  selector: 'app-livro-delete',
  templateUrl: './livro-delete.component.html',
  styleUrls: ['./livro-delete.component.css']
})
export class LivroDeleteComponent implements OnInit {
  
  id_cat: any = '';

  livro: Livro = {
    id: '',
    titulo: '',
    nome_autor: '',
    texto: ''
  }

  constructor(private route: ActivatedRoute, private service: LivroService, private router: Router, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.livro.id = this.route.snapshot.paramMap.get('id');
    this.id_cat = this.route.snapshot.paramMap.get('id_cat');
    this.findById();
  }

  findById(): void {
    this.service.findById(this.livro.id).subscribe(response => {
      this.livro.titulo = response.titulo;
      this.livro.nome_autor = response.nome_autor;
      this.livro.texto = response.texto;
    });
  }

  delete(): void {
    this.service.delete(this.livro.id).subscribe(response => {
      this.router.navigate(['categorias/' + this.id_cat + '/livros']);
      this.toastr.warning('Livro ' + (this.livro.titulo).toUpperCase() + ' removido com sucesso', 'Remoção' , {timeOut: 6000});
    }, err => {
      this.toastr.error(err.error.error, 'Erro', {timeOut: 6000});
    });
  }

}
