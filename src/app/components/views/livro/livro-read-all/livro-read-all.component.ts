import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
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
  colunas: string[] = ['id', 'titulo', 'ler_livro', 'acoes'];
  data = new MatTableDataSource<Livro>(this.livros);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private service: LivroService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.id_cat = this.route.snapshot.paramMap.get('id_cat');
    this.findAll();
  }

  findAll(): void {
    this.service.findAllCategoria(this.id_cat).subscribe(response => {
      this.livros = response;
      this.data = new MatTableDataSource<Livro>(response);
      this.data.paginator = this.paginator;
    });
  }

}
