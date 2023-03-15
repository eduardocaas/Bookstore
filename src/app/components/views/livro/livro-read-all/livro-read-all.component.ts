import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Livro } from 'src/app/models/livro';
import { LivroService } from 'src/app/services/livro.service';

@Component({
  selector: 'app-livro-read-all',
  templateUrl: './livro-read-all.component.html',
  styleUrls: ['./livro-read-all.component.css']
})
export class LivroReadAllComponent implements OnInit {

  id_cat: any = '';

  livros: Livro[] = [];
  data = new MatTableDataSource<Livro>(this.livros);

  colunas: string[] = ['id', 'titulo', 'ler_livro', 'acoes'];

  constructor(private service: LivroService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.id_cat = this.route.snapshot.paramMap.get('id_cat');
    this.findAll();
  }

  findAll(): void {
    this.service.findAllCategoria(this.id_cat).subscribe(response => {
      this.livros = response;
    });
  }

}
