import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Categoria } from 'src/app/models/categoria';
import { CategoriaService } from 'src/app/services/categoria.service';


@Component({
  selector: 'app-categoria-read',
  templateUrl: './categoria-read.component.html',
  styleUrls: ['./categoria-read.component.css']
})

export class CategoriaReadComponent implements OnInit {

  categorias: Categoria[] = [];
  data = new MatTableDataSource<Categoria>(this.categorias);

  colunas: string[] = ['id', 'nome', 'descricao', 'livros', 'acoes'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private service: CategoriaService) { }

  ngOnInit(): void {
      this.findAll();
  }

  findAll() {
    this.service.findAll().subscribe(response => {
      this.categorias = response;
      this.data = new MatTableDataSource<Categoria>(response);
      this.data.paginator = this.paginator;
    })
  }

}
